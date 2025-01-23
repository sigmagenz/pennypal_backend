import path from "path";
import fs from 'fs'
import { Request, Response } from "express";
import { getUserService } from "../../services/user_services/get_user.service";
import { deleteUserService } from "../../services/user_services/delete_user.service";

export const deleteUser = async (req: Request, res: Response) => {
    const { user_code } = req.params

    try {
        const user = await getUserService({ user_code })

        if (!user) {
            res.status(404).json({
                success: false,
                status: 404,
                message: 'User not found.',
            });
            return
        }

        if (user?.avatar) {
            const avatar_path = path.join(__dirname, `../../${user.avatar}`)

            try {
                fs.unlinkSync(avatar_path);
            } catch (error) {
                res.status(500).json({
                    success: false,
                    status: 500,
                    message: 'Error deleting avatar.',
                    error: error
                });
                return
            }
        }

        await deleteUserService(user_code)

        res.status(200).json({
            success: true,
            status: 200,
            message: `User with user code ${user_code} deleted successfully.`,
        });

    } catch (error) {
        if (error instanceof Error) {
            console.error('Error updating user:', error.message);

            res.status(500).json({
                success: false,
                status: 500,
                message: error.message,
            });
        } else {
            console.error('Unexpected error:', error);

            res.status(500).json({
                success: false,
                status: 500,
                message: 'An unexpected error occurred',
            });
        }
    }
}