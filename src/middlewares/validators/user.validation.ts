import { NextFunction, Request, Response } from 'express';
import { userSchema } from './validation_schema/user_validation.schema';
import prisma from '../../config/prisma';
import { z } from 'zod';

export const validateUserInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isPatchMethod = req.method === 'PATCH';
  const userCode = req.params?.user_code;

  try {
    if (!isPatchMethod) {
      userSchema.required({
        fullname: true,
        username: true,
        email: true,
        password: true,
        confirm_password: true
      });
    }

    const userData = userSchema.parse(req.body);

    if (userData.password && userData.confirm_password) {
      if (userData.password !== userData.confirm_password) {
        throw new Error('Passwords do not match');
      }
    }

    let user = null;
    if (userCode) {
      user = await prisma.user.findUnique({
        where: {
          user_code: userCode
        }
      });

      if (!user) {
        res.status(404).send({
          status_code: 404,
          success: false,
          message: 'User not found'
        });
        return;
      }
    }

    if (userData.username && user?.username !== userData.username) {
      const existingUser = await prisma.user.findUnique({
        where: { username: userData.username }
      });

      if (existingUser) {
        res.status(400).send({
          status_code: 400,
          success: false,
          message: 'Username already exists'
        });
        return;
      }
    }

    if (userData.email && user?.email !== userData.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email: userData.email }
      });

      if (existingUser) {
        res.status(400).send({
          status_code: 400,
          success: false,
          message: 'Email already exists'
        });
        return;
      }
    }

    if (userData.phone && user?.phone !== userData.phone) {
      const existingUser = await prisma.user.findUnique({
        where: { phone: userData.phone }
      });

      if (existingUser) {
        res.status(400).send({
          status_code: 400,
          success: false,
          message: 'Phone number already exists'
        });
        return;
      }
    }

    next();
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).send({
        status_code: 400,
        success: false,
        message: err.errors.map((e) => e.message).join(', ')
      });
    } else {
      res.status(400).send({
        status_code: 400,
        success: false,
        message: err.message
      });
    }
  }
};
