import { Request, Response } from 'express';
import prisma from '../../config/prisma';
import { getUserService } from '../../services/user_services/get-user.service';

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const user = await getUserService({ id });

    if (!user) {
      res.status(404).json({
        success: false,
        status: 404,
        message: 'User not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      status: 200,
      message: 'User fetched successfully',
      data: user
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching user:', error.message);
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
