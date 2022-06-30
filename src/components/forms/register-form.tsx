import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import InputFieldForm from '../../components/forms/input-field-form';
import { useSetIsAuthenticated } from '../../providers/AuthProvider';
import { setAccessToken, setRefreshToken } from '../../utils/local-storage';
import axios from '../../utils/axios';
import { Link, useNavigate } from 'react-router-dom';
import { SnackBarContext } from '../../providers/SnackbarProvider';
import { UserRole } from '../../data/enum';

export default function SignUpForm() {
  const snackbarContext = useContext(SnackBarContext);
  const setIsAuthenticated = useSetIsAuthenticated();
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      repeatPassword: '',
    },
  });

  const handleRegister = handleSubmit(async (data) => {
    if (data.password !== data.repeatPassword) {
      snackbarContext.onOpen?.({
        show: true,
        message: 'Password does not match',
        type: 'error',
      });
      return;
    }

    await axios
      .post('auth/register', {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        role: UserRole.recruiter,
      })
      .then((response) => {
        const { accessToken, refreshToken } = response.data;
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setIsAuthenticated(true);
        snackbarContext.onOpen?.({
          show: true,
          message: 'Register successfully',
          type: 'success',
        });
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
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
        <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>Register a recruiter account</h2>
        <p className='mt-2 text-sm text-gray-600'>
          Or{' '}
          <Link to={'/login'} className='font-medium text-indigo-600 hover:text-indigo-500'>
            login here
          </Link>
        </p>
      </div>

      <div className='mt-6'>
        <form onSubmit={handleRegister} className='space-y-6'>
          <InputFieldForm label='Full name' type='text' id='register_fullName' register={register} reg={'fullName'} />
          <InputFieldForm label='Email' type='email' id='register_email' register={register} reg={'email'} />
          <InputFieldForm
            label='Password'
            type='password'
            id='register_password'
            register={register}
            reg={'password'}
          />
          <InputFieldForm
            label='Repeat password'
            type='password'
            id='register_repeatPassword'
            register={register}
            reg={'repeatPassword'}
          />

          <div>
            <button
              type='submit'
              className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
