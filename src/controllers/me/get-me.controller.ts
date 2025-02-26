import { Request, Response } from 'express';

export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.user;

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
