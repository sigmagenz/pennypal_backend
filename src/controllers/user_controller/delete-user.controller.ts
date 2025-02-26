import { Request, Response } from 'express';
import { deleteUserService } from '../../services/user_services/delete-user.service';
import { getUserService } from '../../services/user_services/get-user.service';

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
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

    await deleteUserService({ id });

    res.status(200).json({
      success: true,
      status: 200,
      message: 'User deleted successfully'
    });
    return;
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
