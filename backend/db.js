import mongoose, { Schema } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const URI = process.env.MONGODB_URI;
mongoose.connect(URI);

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 30,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
  },
  todos: {
    type: [Schema.Types.ObjectId],
    ref: 'Todos',
    required: true,
    default: [],
  },

  list: {
    type: [Schema.Types.ObjectId],
    ref: 'List',
    required: true,
    default: [],
  },
});

const todosSchema = new Schema({
  title: {
    type: String,
    minLenght: 3,
    required: true,
  },
  description: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const listSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    minLength: 3,
    trim: true,
  },
  todos: {
    type: [Schema.Types.ObjectId],
    ref: 'Todos',
    required: true,
    default: [],
  },
});

const User = mongoose.model('User', userSchema);
const Todos = mongoose.model('Todos', todosSchema);
const List = mongoose.model('List', listSchema);

export { User, Todos, List };
