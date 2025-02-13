import { Trash2 } from 'lucide-react';

function TodoItem({ todo }) {
  const { title, description, completed, id } = todo;
  return (
    <div className='flex justify-between items-center pl-6 mb-8'>
      <div>
        <h3 className='text-xl'>{title}</h3>
        <p className='text-gray-500'>{description}</p>
      </div>
      <div className='flex items-center'>
        <input
          type='checkbox'
          checked={completed}
          className='size-5 accent-green-600'
        />
        <Trash2 className='ml-4 h-6 w-6 text-red-500 cursor-pointer' />
      </div>
    </div>
  );
}

export default TodoItem;
