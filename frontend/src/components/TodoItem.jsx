import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';
import { completeTodo, deleteTodo } from '../service/todoApi.mjs';
import toast from 'react-hot-toast';
import { use } from 'react';

function TodoItem({ todo }) {
  const useQuery = useQueryClient();

  const { mutate: deleteTodoMutation } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      toast.success('todo deleted successfully');
      useQuery.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: completeTodoMutation } = useMutation({
    mutationFn: completeTodo,
    onSuccess: () => {
      useQuery.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (error) => {
      toast.error('Something went wrong');
      console.log(error);
    },
  });

  function handleDelete() {
    deleteTodoMutation(todo._id);
  }

  function handleComplete() {
    completeTodoMutation(todo._id);
  }

  const { title, description, completed } = todo;
  console.log('todo:', todo);
  return (
    <div className='flex justify-between items-center pl-6 mb-8 px-2'>
      <div>
        <h3 className='text-xl'>{title}</h3>
        <p className='text-gray-500'>{description}</p>
      </div>
      <div className='flex items-center'>
        <input
          type='checkbox'
          checked={completed}
          className='size-5 accent-green-600'
          onChange={handleComplete}
        />
        <Trash2
          onClick={handleDelete}
          className='ml-4 h-6 w-6 text-red-500 cursor-pointer'
        />
      </div>
    </div>
  );
}

export default TodoItem;
