import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { getUserService } from '../../services/user_services/get-user.service';

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      res.status(400).json({
        success: false,
        message: 'Username and password are required.'
      });
      return;
    }

    const existingUser = await getUserService({ username });

    if (!existingUser) {
      res.status(404).json({
        success: false,
        status: 404,
        message: "You can't login with a nonexistent account."
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        status: 401,
        message: 'Invalid password'
      });
      return;
    }

    const token = jwt.sign(
      {
        user_code: existingUser.user_code,
        fullname: existingUser.fullname,
        username: existingUser.username,
        email: existingUser.email,
        phone: existingUser.phone,
        avatar: existingUser.avatar,
        role: existingUser.role
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      success: true,
      status: 200,
      message: 'Login successful',
      token
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({
      success: false,
      status: 500,
      message: 'An error occurred during login.'
    });
  }
};
