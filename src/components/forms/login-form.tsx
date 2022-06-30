import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import InputFieldForm from '../../components/forms/input-field-form';
import { useSetIsAuthenticated } from '../../providers/AuthProvider';
import { setAccessToken, setRefreshToken } from '../../utils/local-storage';
import axios from '../../utils/axios';
import { Link, useNavigate } from 'react-router-dom';
import { SnackBarContext } from '../../providers/SnackbarProvider';

export default function SignInForm() {
  const snackbarContext = useContext(SnackBarContext);
  const setIsAuthenticated = useSetIsAuthenticated();
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSignIn = handleSubmit(async (data) => {
    await axios
      .post('auth/login', {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        const { accessToken, refreshToken } = response.data;
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setIsAuthenticated(true);
        snackbarContext.onOpen?.({
          show: true,
          message: 'Login successfully',
          type: 'success',
        });
        navigate('/');
      })
      .catch((error) => {
        snackbarContext.onOpen?.({
          show: true,
          message: error?.response?.data?.message,
          type: 'error',
        });
      });
  });

  return (
    <>
      <div>
        <img
          className='h-12 w-auto'
          src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
          alt='Workflow'
        />
        <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>Login to your recruiter account</h2>
        <p className='mt-2 text-sm text-gray-600'>
          Or{' '}
          <Link to={'/register'} className='font-medium text-indigo-600 hover:text-indigo-500'>
            register here
          </Link>
        </p>
      </div>

      <div className='mt-6'>
        <form onSubmit={handleSignIn} className='space-y-6'>
          <InputFieldForm label='Email' type='email' id='login_email' register={register} reg={'email'} />
          <InputFieldForm label='Password' type='password' id='login_password' register={register} reg={'password'} />

          <div>
            <button
              type='submit'
              className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
