import prisma from "../../../lib/prisma"

const createUser = async (user: any) => {
    const result = await prisma.user.create({
        data: user
    })
    return result
}

const getAllUser = async (user: any) => {
    const result = await prisma.user.findMany({
        where: {
            email: user.email
        }
    })
    return result
}

export const UserService = {
    createUser,
    getAllUser
}