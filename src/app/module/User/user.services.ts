
import { UserRole } from "@prisma/client"
import config from "../../../config"
import prisma from "../../../lib/prisma"
import bcrypt from "bcryptjs"
import { $ZodCheckLengthEquals } from "zod/v4/core"

const createAdmin = async (payload: any) => {

    const hashedPass = await bcrypt.hash(payload.password, config.solt_round)
    const userData = {
        email: payload.admin.email,
        password: hashedPass,
        role: UserRole.ADMIN
    }
    const result = await prisma.$transaction(async (tx) => {
        await tx.user.create({
            data: userData
        })

        const adminData = await tx.admin.create({
            data: payload.admin,
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

export const UserService = {
    createAdmin,
}