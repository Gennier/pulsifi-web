import { ChevronLeftIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';
import SignInForm from '../components/forms/login-form';

export default function Login() {
  const navigate = useNavigate();
  return (
    <div className='h-screen bg-white flex'>
      <div className='flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
        <div className='mx-auto w-full max-w-sm lg:w-96 space-y-4'>
          <div className='flex row item-center place-items-center cursor-pointer' onClick={() => navigate('/')}>
            <ChevronLeftIcon className='h-4 w-4 mr-1' />
            <p className='text-xs font-medium'>Back to home</p>
          </div>
          <SignInForm />
        </div>
      </div>
      <div className='hidden lg:block relative w-0 flex-1'>
        <img
          className='absolute inset-0 h-full w-full object-cover'
          src='https://images.unsplash.com/photo-1542981596-17528d8ef911?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80'
          alt=''
        />
      </div>
    </div>
  );
}
