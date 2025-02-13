import express from 'express';
import authMiddleware from '../middleware.js';
import { User, Todos, List } from '../db.js';
import { z } from 'zod';
const todosRouter = express.Router();

const createTodoSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.date().optional(),
});

todosRouter.get('/', authMiddleware, async function (req, res) {
  console.log('inside get todos');
  try {
    const id = req.query.id;
    const db = req.query.db;
    let todos;
    if (db === 'user') {
      todos = await User.findById(id).populate('todos');
    } else {
      todos = await List.findById(id).populate('todos');
    }
    console.log(todos);
    res.status(200).json({
      todos: todos.todos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Internal Server Error. Please try again later.',
    });
  }
});

todosRouter.post('/', authMiddleware, async function (req, res) {
  const body = req.body;
  const { success } = createTodoSchema.safeParse(body);
  if (!success) {
    return res.status(400).json({
      msg: 'Bad Inputs, please enter correct inputs',
    });
  }

  try {
    const id = req.query.id;
    const db = req.query.db;
    const newTodo = await Todos.create({
      id,
      title: body.title,
      description: body.description || '',
      completed: false,
    });

    if (newTodo) {
      let user;
      if (db === 'user') {
        user = await User.findById(id);
      } else {
        user = await List.findById(id);
      }
      user.todos.push(newTodo._id);
      await user.save();

      res.status(201).json({
        msg: 'todo added successfully',
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: 'something went wrong while creating a todos',
      error: error.message,
    });
  }
});

todosRouter.put('/complete', authMiddleware, async function (req, res) {
  try {
    const id = req.query.id;
    const todo = await Todos.findById(id);
    if (!todo) {
      return res.status(400).json({
        msg: 'todo not found',
      });
    }

    todo.completed = !todo.completed;
    res.status(200).json({
      msg: 'Todo updated successfully',
      todo,
    });
    await todo.save();
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({
      msg: 'Something went wrong while updating the todo',
    });
  }
});

todosRouter.delete('/delete', authMiddleware, async function (req, res) {
  try {
    const id = req.query.id;
    const todo = await Todos.findByIdAndDelete(id);
    if (!todo) {
      return res.status(404).json({
        msg: 'Todo not found',
      });
    }

    res.status(200).json({
      msg: 'Todo deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({
      msg: 'Something went wrong while deleting the todo',
      error: error.message,
    });
  }
});

export default todosRouter;
