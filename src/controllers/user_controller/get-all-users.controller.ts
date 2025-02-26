import { Request, Response } from 'express';
import { getAllUsersService } from '../../services/user_services/get-all-users.service';
import { Role } from '@prisma/client';

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  const user = req.user;
  const { role } = req.query;

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

  if (role && !(role === 'USER_ACCOUNT' || role === 'ADMIN')) {
    res.status(400).json({
      success: false,
      status: 400,
      message: 'Invalid user role.'
    });
    return;
  }

  try {
    const userRole = role as Role;
    const users = await getAllUsersService({ role: userRole });

    if (!users) {
      res.status(400).json({
        success: false,
        status: 400,
        message: 'User not found.',
        data: users
      });
      return;
    }

    res.status(201).json({
      success: true,
      status: 200,
      message: 'User fetched successfully',
      data: users
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
