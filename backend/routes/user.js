import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { z } from 'zod';
import authMiddleware from '../middleware.js';
import { User } from '../db.js';
dotenv.config();

const SECRET = process.env.SECRET;
const userRouter = express.Router();

const signUpSchema = z.object({
  username: z.string().email(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});

const signInSchema = z.object({
  username: z.string().email(),
  password: z.string(),
});

const updateSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

userRouter.post('/signup', async (req, res) => {
  const body = req.body;
  const { success } = signUpSchema.safeParse(body);
  if (!success) {
    return res.status(400).json({
      msg: 'Incorrect inputs, Please provide correct inputs',
    });
  }

  const user = await User.findOne({
    username: body.username,
  });

  if (user) {
    return res.status(400).json({
      msg: 'user already exist, Please sign in or singup with another username',
    });
  }

  try {
    const dbUser = await User.create(body);
    const userId = dbUser._id;
    const token = jwt.sign({ userId }, SECRET);
    req.userId = userId;

    res.status(200).json({
      msg: 'User created successfully',
      token,
      user: dbUser,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      msg: 'Something went wrong while signing up',
      error: error.message,
    });
  }
});

userRouter.post('/signin', async (req, res) => {
  const body = req.body;
  const { success } = signInSchema.safeParse(body);
  if (!success) {
    return res.status(400).json({
      msg: 'Bad input, please enter correct details',
    });
  }

  const user = await User.findOne({
    username: body.username,
    password: body.password,
  });

  if (user) {
    try {
      const token = jwt.sign({ userId: user._id }, SECRET);
      req.userId = user._id;
      res.status(200).json({
        token,
        user,
      });
      return;
    } catch (error) {
      console.log(error);
    }
  }
  res.status(401).json({
    msg: 'username or password wrong, Please try again with the correct details',
  });
});

userRouter.put('/', authMiddleware, async (req, res) => {
  const body = req.body;
  const { success } = updateSchema.safeParse(body);
  if (!success) {
    return res.status(400).json({
      msg: 'Bad Inputs, Please enter correct input and try again',
    });
  }

  try {
    const user = await User.updateOne(
      { _id: req.userId },
      { firstName: body.firstName, lastName: body.lastName }
    );
    console.log(user);
    if (!user) {
      return res.status(400).json({
        msg: 'user not found',
      });
    }
    res.status(200).json({
      msg: 'user updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      msg: 'An error occurred while updating the user.',
      error: error.message,
    });
  }
});

export default userRouter;
