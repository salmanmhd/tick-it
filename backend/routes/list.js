import express from 'express';
import { List, User } from '../db.js';
import authMiddleware from '../middleware.js';

const listRouter = express.Router();

listRouter.post('/create', authMiddleware, async (req, res) => {
  const title = req.body.title;
  if (!title) {
    return res
      .status(400)
      .json({ msg: 'Bad Inputs, Please enter correct input' });
  }

  try {
    const user = await User.findById(req.userId).populate('list');
    console.log(user);
    const existingList = user.list.find((item) => item.title === title);
    if (existingList) {
      return res.status(400).json({
        msg: 'List already available, please create list with some other name',
      });
    }

    const list = await List.create({ title, userId: req.userId });
    user.list.push(list._id);
    await user.save();
    res.status(200).json({
      msg: 'List addedd successfully',
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: 'something went wrong while creating the list',
      error: error.message,
    });
  }
});

listRouter.get('/', authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId).populate('list');
  if (user) {
    console.log(user.list);
    return res.status(200).json({
      list: user.list,
    });
  }

  res.status(400).json({
    msg: 'something went wrong while fetching the list',
  });
});

export default listRouter;
