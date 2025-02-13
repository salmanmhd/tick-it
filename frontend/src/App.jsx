import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Landing from './pages/Landing';
import AppLayout from './pages/AppLayout';

import Completed from './pages/Completed';
import Today from './pages/Today';
import Task from './pages/Task';
import Incomplete from './pages/Incomplete';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      staleTime: 1000 * 2,
    },
  });
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: '/task',
          element: <Task />,
        },
        {
          path: '/completed',
          element: <Completed />,
        },
        {
          path: '/incomplete',
          element: <Incomplete />,
        },
        {
          path: '/today',
          element: <Today />,
        },
      ],
    },
    {
      path: '/',
      element: <Landing />,
    },
  ]);
  // return <RouterProvider router={router} />;
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
