import { Outlet } from 'react-router-dom';
import LinkComponent from '../components/ui/LinkComponent';
import { CheckCircle } from 'lucide-react';

function AppLayout() {
  return (
    <div className='flex flex-col h-screen items-center bg-gray-900 '>
      <header className='flex h-14 w-[1024px] items-center border-b border-gray-800 px-4 lg:px-6'>
        <div className='flex items-center justify-center'>
          <CheckCircle className='mr-2 h-6 w-6 text-emerald-500' />
          <span className='font-bold text-emerald-500'>TickIt</span>
        </div>
        <nav className='ml-auto flex items-center gap-4 sm:gap-6'>
          <LinkComponent to='/task' text='Task' />
          <LinkComponent to='/today' text='Today' />
          <LinkComponent to='/incomplete' text='Incomplete' />
          <LinkComponent to='/completed' text='completed' />
        </nav>
      </header>
      <main className='flex w-[1024px] h-full  items-center justify-center text-gray-100  '>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
