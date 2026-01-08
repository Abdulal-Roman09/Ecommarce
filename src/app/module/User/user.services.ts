import bcrypt from "bcryptjs"
import { Request } from "express"
import config from "../../../config"
import prisma from "../../../lib/prisma"
import { IUploadedFile } from "../../interface/file"
import sendToCloudinary from "../../../lib/sendToCloudinary"
import { Admin, Customer, UserRole, Vendor } from "@prisma/client"

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

        const vendorData = await tx.vendor.create({
            data: req.body.vendor,
            include: {
                user: true
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
        return customerData
    })

    return result
}

export const UserService = {
    createAdmin,
    createVendor,
    createCustomer
}