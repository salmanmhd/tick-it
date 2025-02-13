import express from 'express';
import { User, Todos, List } from '../db.js';
import { z } from 'zod';
const todosRouter = express.Router();

const createTodoSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
});

todosRouter.get('/', async function (req, res) {
  try {
    let todos = await Todos.find({});

    res.status(200).json({
      todos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Internal Server Error. Please try again later.',
    });
  }
});

todosRouter.post('/', async function (req, res) {
  const body = req.body;
  const { success } = createTodoSchema.safeParse(body);
  if (!success) {
    return res.status(400).json({
      msg: 'Bad Inputs, please enter correct inputs',
    });
  }

  try {
    const newTodo = await Todos.create({
      title: body.title,
      description: body.description || '',
    });

    res.status(201).json({
      msg: 'todo added successfully',
      todo: newTodo,
    });
  } catch (error) {
    console.log('error from server: ', error);
    res.status(500).json({
      msg: 'something went wrong while creating a todos',
      error: error.message,
    });
  }
});

todosRouter.patch('/:id', async function (req, res) {
  try {
    const { id } = req.params;
    const todo = await Todos.findById(id);
    if (!todo) {
      return res.status(400).json({
        msg: 'todo not found',
      });
    }

    todo.completed = !todo.completed;
    await todo.save();
    res.status(200).json({
      msg: 'Todo updated successfully',
      todo,
    });
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({
      msg: 'Something went wrong while updating the todo',
    });
  }
});

todosRouter.delete('/:id', async function (req, res) {
  try {
    const { id } = req.params;
    const todo = await Todos.findByIdAndDelete(id);
    if (!todo) {
      return res.status(404).json({
        msg: 'Todo not found',
      });
    }
    console.log(todo);

    res.status(200).json({
      msg: 'Todo deleted successfully',
      todo,
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
