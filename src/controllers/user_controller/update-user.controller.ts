import { Request, Response } from 'express';
import { updateUserService } from '../../services/user_services/update-user.service';
import { getUserService } from '../../services/user_services/get-user.service';

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { username, fullname, email, phone, password } = req.body;

  try {
    const user = await getUserService({ id });

    if (!user) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: 'User not found'
      });
    }

    const updatedData = {
      user_code: user.user_code,
      username,
      fullname,
      email,
      phone,
      password: user.password
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
