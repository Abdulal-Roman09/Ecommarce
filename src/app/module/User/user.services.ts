import { Admin, Customer, UserRole } from "@prisma/client"
import config from "../../../config"
import prisma from "../../../lib/prisma"
import bcrypt from "bcryptjs"
import { IAdminCreatePayload, ICustomerCreatePayload } from "./user.interfact"
import sendToCloudinary from "../../../lib/sendToCloudinary"
import { IUploadedFile } from "../../interface/file"
import { Request } from "express"

const createAdmin = async (req: Request): Promise<Admin> => {
    const file: IUploadedFile = req.file
    console.log(file, "file")
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

        return adminData
    })

    if (result && result.user) {
        (result as any).user.password = undefined;
    }

    return result
}

const createVendor = async (payload: IAdminCreatePayload) => {

}

const createCustomer = async (payload: ICustomerCreatePayload): Promise<Customer | any> => {
    const hashedPass = await bcrypt.hash(payload.password, config.solt_round)
    const userData = {
        password: hashedPass,
        email: payload.customer.email,
        role: UserRole.CUSTOMER
    }
    const result = await prisma.$transaction(async (tx) => {
        await tx.user.create({
            data: userData
        })
        const customerData = await tx.customer.create({
            data: payload.customer,
            include: {
                user: true
            }
        })
        return customerData
    })
    return result
}

export const UserService = {
    createAdmin,
    createVendor,
    createCustomer
}