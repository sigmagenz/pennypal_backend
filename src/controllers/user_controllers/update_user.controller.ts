import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { uploadFile } from "../../utils/upload";
import path from "path";
import fs from 'fs'
import { getUserService } from "../../services/user_services/get_user.service";
import { updateUserService } from "../../services/user_services/update_user.service";

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const { user_code } = req.params;
    const { fullname, username, email, phone, role, password } = req.body;

    const avatar = req.files?.avatar as UploadedFile

    try {
        const existingUser = await getUserService({ user_code });

        let uploadedAvatarPath: string | null = existingUser?.avatar || null;

        if (avatar && !Array.isArray(avatar)) {
            const allowedExtensions = [".png", ".jpg", ".jpeg"];
            const destinationPath = `./public/uploads/avatars`;

            uploadedAvatarPath = await uploadFile(
                avatar,
                destinationPath,
                allowedExtensions
            );

            const existingAvatar = path.join(
                __dirname,
                `../../${existingUser?.avatar}`
            )

            if (fs.existsSync(existingAvatar)) {
                fs.unlinkSync(existingAvatar)
            }
        }

        const payload = {
            fullname,
            username,
            email,
            phone,
            role,
            password,
            avatar: uploadedAvatarPath
        };

        const updatedUser = await updateUserService(user_code, payload);

        res.status(200).json({
            success: true,
            status: 200,
            message: 'User updated successfully',
            data: updatedUser
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