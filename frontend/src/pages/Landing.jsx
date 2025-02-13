import { CheckCircle, BarChart2, Calendar } from 'lucide-react';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();
  function handleClick() {
    navigate('/task');
  }
  return (
    <div className='flex min-h-screen flex-col items-center bg-gray-900 text-gray-100'>
      <header className='flex h-16 w-[1024px] items-center border-b border-gray-800 px-4 lg:px-6'>
        <div className='flex items-center justify-center'>
          <CheckCircle className='mr-2 h-6 w-6 text-emerald-500' />
          <span className='font-bold text-emerald-500'>TickIt</span>
        </div>
        <nav className='ml-auto flex items-center gap-4 sm:gap-6'>
          <a
            href='#features'
            className='cursor-pointer text-sm font-medium transition-colors hover:text-emerald-500'
          >
            Features
          </a>
          <a
            href='#pricing'
            className='cursor-pointer text-sm font-medium transition-colors hover:text-emerald-500'
          >
            Pricing
          </a>
          <a
            href='#about'
            className='cursor-pointer text-sm font-medium transition-colors hover:text-emerald-500'
          >
            About
          </a>
          <Button
            type='submit'
            onClick={handleClick}
            className='my-10 bg-emerald-500 text-2xl text-white hover:bg-emerald-600'
          >
            Start for free
          </Button>
        </nav>
      </header>

      <main className='mx-auto flex max-w-screen-lg flex-1 flex-col items-center justify-center'>
        <section className='w-full py-12 md:py-24 lg:py-32 xl:py-48'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none'>
                  Tick off your tasks,{' '}
                  <span className='text-emerald-500'>effortlessly.</span>
                </h1>
                <p className='mx-auto max-w-[700px] text-gray-400 md:text-xl'>
                  Stay organized, focused, and in control with TickIt. The smart
                  task manager for the modern world.
                </p>
              </div>
              <div className='w-full max-w-sm space-y-2'>
                <Button
                  type='submit'
                  onClick={handleClick}
                  className='my-10 bg-emerald-500 text-4xl text-white hover:bg-emerald-600'
                >
                  Start for free
                </Button>
                <p className='text-xs text-gray-400'>
                  Start your free trial. No credit card required.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          id='features'
          className='w-full bg-gray-800 py-12 md:py-24 lg:py-32'
        >
          <div className='container px-4 md:px-6'>
            <h2 className='mb-12 text-center text-3xl font-bold tracking-tighter sm:text-5xl'>
              Features
            </h2>
            <div className='grid gap-10 sm:grid-cols-2 md:grid-cols-3'>
              <div className='flex flex-col items-center space-y-2 rounded-lg bg-gray-900 p-4'>
                <CheckCircle className='mb-2 h-8 w-8 text-emerald-500' />
                <h3 className='text-xl font-bold'>Task Management</h3>
                <p className='text-center text-sm text-gray-400'>
                  Easily create, organize, and prioritize your tasks
                </p>
              </div>
              <div className='flex flex-col items-center space-y-2 rounded-lg bg-gray-900 p-4'>
                <BarChart2 className='mb-2 h-8 w-8 text-emerald-500' />
                <h3 className='text-xl font-bold'>Productivity Tracking</h3>
                <p className='text-center text-sm text-gray-400'>
                  Monitor your progress and boost your productivity
                </p>
              </div>
              <div className='flex flex-col items-center space-y-2 rounded-lg bg-gray-900 p-4'>
                <Calendar className='mb-2 h-8 w-8 text-emerald-500' />
                <h3 className='text-xl font-bold'>Calendar Integration</h3>
                <p className='text-center text-sm text-gray-400'>
                  Sync your tasks with your favorite calendar apps
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id='pricing' className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container px-4 md:px-6'>
            <h2 className='mb-12 text-center text-3xl font-bold tracking-tighter sm:text-5xl'>
              Pricing Plans
            </h2>
            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8'>
              {[
                {
                  name: 'Free',
                  price: '$0',
                  features: [
                    'Basic task management',
                    '5 projects',
                    '1 GB storage',
                  ],
                },
                {
                  name: 'Pro',
                  price: '$4',
                  features: [
                    'Advanced task management',
                    'Unlimited projects',
                    '5 GB storage',
                    'Priority support',
                  ],
                },
                {
                  name: 'Business',
                  price: '$6',
                  features: [
                    'Team collaboration',
                    'Admin tools',
                    '50 GB storage',
                    '24/7 support',
                  ],
                },
              ].map((plan) => (
                <div
                  key={plan.name}
                  className='flex flex-col justify-between rounded-lg border border-gray-700 bg-gray-800 p-6 shadow-lg'
                >
                  <div>
                    <h3 className='text-center text-2xl font-bold'>
                      {plan.name}
                    </h3>
                    <div className='mt-4 text-center text-gray-400'>
                      <span className='text-4xl font-bold text-emerald-500'>
                        {plan.price}
                      </span>
                      / month
                    </div>
                    <ul className='mt-4 space-y-2'>
                      {plan.features.map((feature) => (
                        <li key={feature} className='flex items-center'>
                          <CheckCircle className='mr-2 h-4 w-4 text-emerald-500' />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button className='mt-6 bg-emerald-500 text-white hover:bg-emerald-600'>
                    Get Started
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section
          id='about'
          className='w-full bg-gray-950 py-12 text-white md:py-24 lg:py-32'
        >
          <div className='container mx-auto px-4 text-center'>
            <h2 className='text-2xl font-bold text-gray-200 md:text-4xl'>
              About Us
            </h2>
            <p className='mt-4 text-gray-100 md:text-lg'>
              We are committed to delivering innovative solutions that empower
              individuals and businesses to achieve their goals. Our team
              combines creativity, technology, and expertise to create seamless
              experiences for users worldwide. Join us on our journey to make a
              meaningful impact.
            </p>
          </div>
        </section>
      </main>
      <footer className='flex w-full shrink-0 flex-col items-center gap-2 border-t border-gray-800 px-4 py-6 sm:flex-row md:px-6'>
        <p className='text-xs text-gray-400'>
          © 2023 TickIt Inc. All rights reserved.
        </p>
        <nav className='flex gap-4 sm:ml-auto sm:gap-6'>
          <div className='text-xs transition-colors hover:text-emerald-500'>
            Terms of Service
          </div>
          <div className='text-xs transition-colors hover:text-emerald-500'>
            Privacy
          </div>
        </nav>
      </footer>
    </div>
  );
}
