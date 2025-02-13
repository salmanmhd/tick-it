import { addTodo, getTodo } from '../service/todoApi.mjs';

import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import TodoItem from '../components/TodoItem';
import { useMutation, useQuery } from '@tanstack/react-query';
import Spinner from '../components/Spinner';
import { useForm } from 'react-hook-form';

function Task() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodo,
  });

  const { mutate, isLoading: isAdding } = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      alert('todo addedd successfully');
      reset();
    },
    onError: (error) => {
      alert("todo can't be added", error.response || error.message);
    },
  });

  const { register, handleSubmit, getValues, formState, reset } = useForm();
  const { errors } = formState;

  function onSubmit(data) {
    const { title, description } = data;
    console.log('title: ', title, 'description: ', description);
    mutate({ title, description });
  }

  function onError(errors) {
    console.log(errors);
    console.log(getValues());
  }

  if (isLoading || isAdding) return <Spinner />;
  return (
    <div className=' w-full h-full pt-6 px-6 grid grid-cols-1 md:grid-cols-2 gap-4'>
      <div>
        <h1 className='text-3xl font-medium mb-14'>Add Todo</h1>
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className='flex flex-col gap-6'
        >
          <div className='flex justify-between'>
            <label className='text-xl' htmlFor='title'>
              Todo:
            </label>
            <input
              id='title'
              {...register('title', { required: 'Title field is required' })}
              className={`rounded-md border w-72 border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50`}
            />
          </div>
          <div className='flex justify-between'>
            <label className='text-xl' htmlFor='desc'>
              Description:
            </label>
            <input
              id='desc'
              {...register('description', {
                required: 'Description field is required',
              })}
              className={`rounded-md border w-72 border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50`}
            />
          </div>
          <Button className='mt-4'>Submit</Button>
        </form>
      </div>

      <div className='todolist pl-6'>
        <h1 className='text-3xl font-medium mb-14'>Todo List</h1>
        {data.todos.map((todo, i) => (
          <TodoItem key={i} todo={todo} />
        ))}
      </div>
    </div>
  );
}

export default Task;
