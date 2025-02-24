import { Request, Response } from 'express';
import { getAllUsersService } from '../../services/user_services/get-all-users.service';

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  const user = req.user;

  if (!user) {
    res.status(401).json({
      message: 'Must be logged in',
      data: null
    });
    return;
  }

  if (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN') {
    res.status(403).json({
      message: 'You do not have the required role to access this resource',
      data: null
    });
    return;
  }

  try {
    const users = await getAllUsersService();
    let filteredUsers;

    if (user.role === 'ADMIN') {
      filteredUsers = users?.filter((user) => user.role === 'USER_ACCOUNT');
    } else if (user.role === 'SUPER_ADMIN') {
      filteredUsers = users;
    }

    res.status(201).json({
      success: true,
      status: 200,
      message: 'User fetched successfully',
      data: filteredUsers
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
