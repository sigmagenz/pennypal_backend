import prisma from "../../config/prisma"
import IUserType from "../../types/user.types"

export const createUserRepository = async (payload: IUserType): Promise<IUserType> => {
    const createdUser = await prisma.user.create({
        data: {
            ...payload
        }
    })

    return {
        ...createdUser,
        phone: createdUser.phone || null,
        avatar: createdUser.avatar || null
    }
}