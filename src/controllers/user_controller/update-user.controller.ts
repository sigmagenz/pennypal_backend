import { Request, Response } from 'express';
import { updateUserService } from '../../services/user_services/update-user.service';
import { getUserService } from '../../services/user_services/get-user.service';
import { UploadedFile } from 'express-fileupload';
import { uploadFile } from '../../utils/upload-file';
import path from 'path';
import fs from 'fs';

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { username, fullname, email, phone, password } = req.body;
  const avatar = req.files?.profile_image as UploadedFile;
  try {
    const user = await getUserService({ id });

    if (!user) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: 'User not found'
      });
    }

    let uploadedAvatarPath: string | null = user?.avatar || null;

    if (avatar && !Array.isArray(avatar)) {
      const allowedExtensions = ['.png', '.jpg', '.jpeg'];
      const destinationPath = `./public/uploads/avatars`;

      uploadedAvatarPath = await uploadFile(
        avatar,
        destinationPath,
        allowedExtensions
      );

      const existingAvatar = path.join(__dirname, `../../${user?.avatar}`);

      if (fs.existsSync(existingAvatar)) {
        fs.unlinkSync(existingAvatar);
      }
    }

    const updatedData = {
      user_code: user.user_code,
      username,
      fullname,
      email,
      phone,
      password: user.password,
      avatar: uploadedAvatarPath
    };

    const updatedUser = await updateUserService({ id }, updatedData);

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
        message: error.message
      });
    } else {
      console.error('Unexpected error:', error);
      res.status(500).json({
        success: false,
        status: 500,
        message: 'An unexpected error occurred'
      });
    }
  }
};
