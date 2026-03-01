import bcrypt from "bcryptjs"
import { Request } from "express"
import config from "../../../config"
import prisma from "../../../lib/prisma"
import { IUploadedFile } from "../../interface/file"
import { userSearchableFields } from "./user.constance"
import sendToCloudinary from "../../../lib/sendToCloudinary"
import { calculatePagination } from "../../../lib/paginationHealper"
import { Admin, Customer, Prisma, UserRole, UserStatus, Vendor } from "@prisma/client"
import { IAuthUser } from "../../interface/auth"

const createAdmin = async (req: Request): Promise<Admin> => {

    const file: IUploadedFile = req.file as IUploadedFile

    if (file) {
        const uploadToCloudinary = await sendToCloudinary(file)
        req.body.admin.profilePhoto = uploadToCloudinary?.secure_url
    }

    const hashedPass = await bcrypt.hash(req.body.password, config.solt_round)

    const userData = {
        email: req.body.admin.email,
        password: hashedPass,
        role: UserRole.ADMIN
    }
    const result = await prisma.$transaction(async (tx) => {

        await tx.user.create({
            data: userData
        })

        const adminData = await tx.admin.create({
            data: req.body.admin,
            include: {
                user: true,
            }
        })
        const { password, ...userWithoutPassword } = adminData.user;

        return {
            ...adminData,
            user: userWithoutPassword
        };
    })

    return result
}

const createVendor = async (req: Request): Promise<Vendor> => {

    const file: IUploadedFile = req.file as IUploadedFile

    if (file) {
        const uploadToCloudinary = await sendToCloudinary(file)
        req.body.vendor.profilePhoto = uploadToCloudinary?.secure_url
    }

    const hashedPass = await bcrypt.hash(req.body.password, config.solt_round)

    const userData = {
        password: hashedPass,
        email: req.body.vendor.email,
        role: UserRole.VENDOR
    }

    const result = await prisma.$transaction(async (tx) => {

        await tx.user.create({
            data: userData
        })

        const vendorPayload: any = { ...req.body.vendor }
        const categoryIds = vendorPayload.categoryIds
        if (categoryIds) delete vendorPayload.categoryIds

        const createData: any = { ...vendorPayload }
        if (categoryIds) {
            const connect = Array.isArray(categoryIds)
                ? categoryIds.map((id: string) => ({ id }))
                : [{ id: categoryIds }]
            createData.categories = { connect }
        }

        const vendorData = await tx.vendor.create({
            data: createData,
            include: {
                user: true,
                categories: true
            }
        })
        const { password, ...userWithoutPassword } = vendorData.user;
        return {
            ...vendorData,
            user: userWithoutPassword
        };
    })

    return result
}

const createCustomer = async (req: Request): Promise<Customer> => {
    const file: IUploadedFile = req.file as IUploadedFile

    if (file) {
        const uploadToCloudinary = await sendToCloudinary(file)
        req.body.customer.profilePhoto = uploadToCloudinary?.secure_url
    }

    const hashedPass = await bcrypt.hash(req.body.password, config.solt_round)

    const userData = {
        password: hashedPass,
        email: req.body.customer.email,
        role: UserRole.CUSTOMER
    }
    const result = await prisma.$transaction(async (tx) => {

        await tx.user.create({
            data: userData
        })

        const customerData = await tx.customer.create({
            data: req.body.customer,
            include: {
                user: true
            }
        })
        const { password, ...userWithoutPassword } = customerData.user;
        return {
            ...customerData,
            user: userWithoutPassword
        };
    })

    return result
}

const getAllFromDB = async (params: any, options: any) => {
    const { skip, limit, page, sortBy, sortOrder } = calculatePagination(options)
    const { searchTerm, ...filterData } = params

    const andConditions: Prisma.UserWhereInput[] = []

    if (searchTerm) {
        andConditions.push({
            OR: userSearchableFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive",
                },
            })),
        });
    }

    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: (filterData as any)[key]
                }
            }))
        })
    }

    const whereConditions: Prisma.UserWhereInput = andConditions.length > 0 ?
        { AND: andConditions } : {}


    const result = await prisma.user.findMany({
        skip,
        take: limit,
        where: whereConditions,
        select: {
            id: true,
            email: true,
            role: true,
            status: true,
            createdAt: true,
            updatedAt: true,
            vendor: true,
            admin: true,
            customer: true
        },
        orderBy: sortBy
            ? { [sortBy]: sortOrder }
            : { createdAt: "desc" },
    })

    const total = await prisma.user.count({ where: whereConditions })

    return {
        meta: {
            page,
            total,
            limit,
        },
        result
    }
}

const getSingleFromDB = async (id: string) => {
    const result = await prisma.user.findUniqueOrThrow({
        where: { id },
        select: {
            id: true,
            email: true,
            role: true,
            status: true,
            isDeleted: true,
            deletedAt: true,
            createdAt: true,
            updatedAt: true,
            vendor: true,
            customer: true,
            admin: true,
        },
    });

    return result;
};

const changeProfileStatus = async (id: string, payload: { status: UserStatus }) => {


    await prisma.user.findUniqueOrThrow({
        where: {
            id
        }
    })

    const updateUserstatus = await prisma.user.update({
        where: {
            id
        },
        data: {
            status: payload.status
        }
    })
    return updateUserstatus
}

const updateMyProfile = async (user: IAuthUser, req: Request & { file: IUploadedFile }) => {

    const userData = await prisma.user.findUniqueOrThrow({
        where: { email: user?.email, status: UserStatus.ACTIVE }
    });

    const file = req.file as IUploadedFile;
    if (file) {
        const upload = await sendToCloudinary(file);
        req.body.profilePhoto = upload?.secure_url;
    }

    let profileInfo;

    if (userData.role === UserRole.SUPER_ADMIN) {
        profileInfo = await prisma.admin.update({
            where: {
                email: userData.email
            },
            data: req.body
        });
    }

    else if (userData.role === UserRole.ADMIN) {
        profileInfo = await prisma.admin.update({
            where: {
                email: userData.email
            },
            data: req.body
        });
    }

    else if (userData.role === UserRole.VENDOR) {
        profileInfo = await prisma.vendor.update({
            where: {
                email: userData.email
            },
            data: req.body
        });
    }

    else if (userData.role === UserRole.CUSTOMER) {
        profileInfo = await prisma.customer.update({
            where: {
                email: userData.email
            },
            data: req.body
        });
    }

    return { ...profileInfo }
}

export const UserService = {
    createAdmin,
    createVendor,
    createCustomer,
    getAllFromDB,
    getSingleFromDB,
    changeProfileStatus,
    updateMyProfile
}