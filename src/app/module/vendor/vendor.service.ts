import { Prisma, UserStatus } from "@prisma/client";
import prisma from "../../../lib/prisma";
import { vendorSearchableFields } from "./vendor.constance";
import { calculatePagination, IOptions } from "../../../lib/paginationHealper";

const getAllFromDB = async (params: any, options: IOptions) => {
    const { page, limit, sortBy, sortOrder, skip } = calculatePagination(options)
    const { searchTerm, ...filterData } = params

    const andConditions: Prisma.VendorWhereInput[] = []

    if (searchTerm) {
        andConditions.push({
            OR: vendorSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: "insnsitive"
                }
            }))
        })
    }

    if (Object.keys(filterData.length > 0)) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equls: (filterData as any)[key]
                }
            }))
        })
    }

    const result = await prisma.vendor.findMany({
        skip,
        take: limit,
        where: {
            AND: andConditions
        },
        orderBy: {
            [sortBy]: sortOrder
        }
    })

    const whereConditions = andConditions.length > 0 ? {
        AND: andConditions
    } : {}

    const total = await prisma.vendor.count({
        where: whereConditions
    })

    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    }
};

const deleteFromDB = async (id: string) => {
    const user = await prisma.vendor.findUniqueOrThrow({ where: { id } })

    return await prisma.$transaction(async tx => {

        await tx.vendor.delete({
            where: { email: user.email }
        })
        await tx.user.delete({
            where: { email: user.email }
        })
    })
};

const softDeleteFromDB = async (id: string) => {
    const user = await prisma.vendor.findUniqueOrThrow({ where: { id } })

    return await prisma.$transaction(async tx => {

        const deltedVendor = await tx.vendor.update({
            where: {
                email: user.email

            },
            data: {
                isDelete: true
            }
        })
        await tx.user.update({
            where: {
                email: user.email
            },
            data: {
                status: UserStatus.BLOCKED
            }
        })
        return deltedVendor
    })
};

export const VendorServices = {
    getAllFromDB,
    deleteFromDB,
    softDeleteFromDB
};
