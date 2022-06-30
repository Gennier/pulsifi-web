import { Fragment, useContext, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { useForm } from 'react-hook-form';
import InputFieldForm from '../forms/input-field-form';
import TextareaFieldForm from '../forms/textarea-field-form';
import axios from '../../utils/axios';

type JobSlideOverProps = {
  isEdit: boolean;
  isView?: boolean;
  isCreate?: boolean;
  open: boolean;
  isButton?: boolean;
  handleCloseModel: any;
  handleUpdate?: any;
  handleCreate?: any;
  data?: any;
};

export default function JobSlideOver({
  isEdit,
  open,
  handleCloseModel,
  isButton = true,
  handleUpdate,
  handleCreate,
  isCreate = false,
  isView = false,
  data,
}: JobSlideOverProps) {
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      id: '',
      title: '',
      description: '',
      location: '',
    },
  });

  const handleCreateJob = handleSubmit(async (data: any) => {
    await axios
      .post('jobs', {
        title: data.title,
        description: data.description,
        location: data.location,
      })
      .then((response) => handleCloseModel());
  });

  const handleUpdateJob = handleSubmit(async (data: any) => {
    await axios
      .put(`jobs/${data.id}`, {
        id: data.id,
        title: data.title,
        description: data.description,
        location: data.location,
      })
      .then((response) => handleCloseModel());
  });

  useEffect(() => {
    if (!isCreate && data) {
      setValue('id', data.id);
      setValue('title', data.title);
      setValue('description', data.description);
      setValue('location', data.location);
    }
    if (isCreate) {
      reset({
        id: '',
        title: '',
        description: '',
        location: '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isCreate]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' static className='fixed inset-0 overflow-hidden z-50' open={open} onClose={handleCloseModel}>
        <div className='absolute inset-0 overflow-hidden'>
          <Dialog.Overlay className='absolute inset-0  bg-blue-900 bg-opacity-60 transition-opacity' />

          <div className='fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16'>
            <Transition.Child
              as={Fragment}
              enter='transform transition ease-in-out duration-500 sm:duration-700'
              enterFrom='translate-x-full'
              enterTo='translate-x-0'
              leave='transform transition ease-in-out duration-500 sm:duration-700'
              leaveFrom='translate-x-0'
              leaveTo='translate-x-full'
            >
              <div className='w-screen max-w-xl'>
                <div className='h-full flex flex-col bg-white shadow-xl overflow-y-scroll'>
                  <div className='flex-1'>
                    {/* Header */}
                    <div className='px-4 py-6 bg-gray-50 sm:px-6 border-b'>
                      <div className='flex items-start justify-between space-x-3'>
                        <div className='space-y-1'>
                          <Dialog.Title className='text-xl font-bold text-gray-900'>
                            {(isCreate ? 'Create' : 'Edit') + ' Author'}
                          </Dialog.Title>
                        </div>
                        <div className='h-7 flex items-center'>
                          <button
                            type='button'
                            className='bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                            onClick={handleCloseModel}
                          >
                            <span className='sr-only'>Close panel</span>
                            <XIcon className='h-6 w-6' aria-hidden='true' />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className='py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-gray-200'>
                      <form onSubmit={isCreate ? handleCreateJob : handleUpdateJob}>
                        <div className='px-4 py-5 sm:px-6 grid grid-cols-4 gap-4'>
                          <div className='col-span-2'>
                            <InputFieldForm label='Title' type='text' id='title' register={register} reg={'title'} />
                          </div>
                          <div className='col-span-2'>
                            <InputFieldForm
                              label='Location'
                              type='text'
                              id='location'
                              register={register}
                              reg={'location'}
                            />
                          </div>

                          <div className='col-span-4'>
                            <TextareaFieldForm
                              label='Description'
                              id='description'
                              register={register}
                              reg={'description'}
                              rows={15}
                            />
                          </div>
                        </div>

                        {/* Action buttons */}
                        {isButton && (
                          <div className='flex-shrink-0 px-4 border-t border-gray-200 py-5 sm:px-6'>
                            <div className='space-x-3 flex justify-end'>
                              <button
                                type='button'
                                className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                onClick={handleCloseModel}
                              >
                                Cancel
                              </button>
                              {isEdit && !isView && (
                                <button
                                  type='submit'
                                  className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                >
                                  Save
                                </button>
                              )}
                              {isCreate && !isView && (
                                <button
                                  type='submit'
                                  className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                >
                                  Create
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
