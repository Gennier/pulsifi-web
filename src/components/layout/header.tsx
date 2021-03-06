import { Link, useLocation } from 'react-router-dom';
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import { useIsAuthenticated, useLogout } from '../../providers/AuthProvider';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
const navigation = [
  { name: 'Home', to: '/', current: true, private: false },
  { name: 'Dashboard', to: '/dashboard/jobs', current: false, private: true },
];
export default function Header() {
  let location = useLocation();
  const isAuthenticated = useIsAuthenticated();
  const handleLogout = useLogout();

  return (
    <Disclosure as='nav' className='bg-white shadow'>
      {({ open }) => (
        <>
          <div className='w-full mx-auto px-2 sm:px-6 lg:px-8'>
            <div className='relative flex justify-between h-16'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                {/* Mobile menu button */}
                <Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <MenuIcon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
              <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
                <div className='flex-shrink-0 flex items-center'>
                  <img
                    className='hidden sm:block h-8 w-auto'
                    src='https://pulsifi.me/wp-content/uploads/2020/01/logo-colored.svg'
                    alt='Pulsifi'
                  />
                  {/* <img
                    className='block sm:hidden h-4 w-auto'
                    src='https://pulsifi.me/wp-content/uploads/2020/01/logo-colored.svg'
                    alt='Workflow'
                  /> */}
                </div>
                <div className='hidden sm:ml-6 sm:flex sm:space-x-8'>
                  {navigation.map((nav) => (
                    <>
                      {(!nav.private || isAuthenticated === nav.private) && (
                        <Link
                          key={nav.name}
                          to={nav.to}
                          className={classNames(
                            nav.to === location.pathname
                              ? 'border-indigo-500 text-gray-900'
                              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                            'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                          )}
                        >
                          {nav.name}
                        </Link>
                      )}
                    </>
                  ))}
                </div>
              </div>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                {!isAuthenticated && (
                  <>
                    <Link
                      to={'/login'}
                      className='whitespace-nowrap text-sm font-medium text-gray-500 hover:text-gray-900'
                    >
                      Sign in
                    </Link>
                    <Link
                      to={'/register'}
                      className='ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700'
                    >
                      Sign up
                    </Link>
                  </>
                )}
                {isAuthenticated && (
                  <>
                    {/* Profile dropdown */}
                    <Menu as='div' className='ml-3 relative'>
                      <div>
                        <Menu.Button className='bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                          <span className='sr-only'>Open user menu</span>
                          <img
                            className='h-8 w-8 rounded-full'
                            src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                            alt=''
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter='transition ease-out duration-200'
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'
                      >
                        <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to={'/'}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Your Profile
                              </Link>
                            )}
                          </Menu.Item>

                          <Menu.Item>
                            {({ active }) => (
                              <div
                                onClick={handleLogout}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Sign out
                              </div>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>{' '}
                  </>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className='sm:hidden'>
            <div className='pt-2 pb-4 space-y-1'>
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
              <Disclosure.Button
                as='a'
                href='/'
                className='bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
              >
                Home
              </Disclosure.Button>
              {isAuthenticated && (
                <Disclosure.Button
                  as='a'
                  href='/dashboard/jobs'
                  className='border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                >
                  Dashboard
                </Disclosure.Button>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
