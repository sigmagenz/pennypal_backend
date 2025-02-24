import { Request, Response } from 'express';
import { createUserService } from '../../services/user_services/create-user.service';
import { UploadedFile } from 'express-fileupload';
import { uploadFile } from '../../utils/upload-file';

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { fullname, username, email, phone, password } = req.body;
  const avatar = req.files?.avatar as UploadedFile;

  try {
    let uploadedAvatar: string | null = null;

    if (avatar && !Array.isArray(avatar)) {
      const allowedExtensions = ['.png', '.jpg', '.jpeg'];
      const destinationPath = `./public/uploads/avatars`;

      uploadedAvatar = await uploadFile(
        avatar,
        destinationPath,
        allowedExtensions
      );
    }

    const newUser = await createUserService({
      fullname,
      username,
      email,
      phone,
      avatar: uploadedAvatar,
      password
    });

    res.status(201).json({
      success: true,
      status: 201,
      message: 'User created successfully',
      data: newUser
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error creating user:', error.message);
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
