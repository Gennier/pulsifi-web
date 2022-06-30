/* This example requires Tailwind CSS v2.0+ */
import { SpeakerphoneIcon, XIcon } from '@heroicons/react/outline';

export default function RegisterBanner() {
  return (
    <>
      {/*
        Make sure you add some bottom padding to pages that include a sticky banner like this to prevent
        your content from being obscured when the user scrolls to the bottom of the page.
      */}
      <div className='fixed inset-x-0 bottom-0'>
        <div className='bg-indigo-600'>
          <div className='max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8'>
            <div className='flex items-center justify-between flex-wrap'>
              <div className='w-0 flex-1 flex items-center'>
                <span className='flex p-2 rounded-lg bg-indigo-800'>
                  <SpeakerphoneIcon className='h-6 w-6 text-white' aria-hidden='true' />
                </span>
                <p className='ml-3 font-medium text-white truncate'>
                  <span>Register to post jobs now!</span>
                </p>
              </div>
              <div className='order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto'></div>
              <div className='order-2 flex-shrink-0 sm:order-3 sm:ml-3'>
                <button
                  type='button'
                  className='-mr-1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2'
                >
                  <span className='sr-only'>Dismiss</span>
                  <XIcon className='h-6 w-6 text-white' aria-hidden='true' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
