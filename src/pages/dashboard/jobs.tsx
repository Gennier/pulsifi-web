import { useEffect, useState } from 'react';
import Layout from '../../components/layout/layout';
import Table from '../../components/table/table';
import useFetchData from '../../hooks/use-fetch-data';
import { format } from 'date-fns';
import JobSlideOver from '../../components/slide-overs/job-slide-overs';
import axios from '../../utils/axios';
import SwitchFieldForm from '../../components/forms/switch-field-form';
import { JobStatus } from '../../data/enum';

export default function Jobs() {
  const [isEdit, setIsEdit] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [jobData, setJobData] = useState(null);

  const { data, loading, refetch } = useFetchData({ url: 'jobs/me' });

  const handleOpenCreateModel = () => {
    setIsEdit(false);
    setIsCreate(true);
    setModalOpen(true);
  };

  const handleOpenEditModel = async (id: string) => {
    setIsEdit(true);
    setIsCreate(false);
    await axios.get(`jobs/${id}`).then((response) => setJobData(response.data));
    setModalOpen(true);
  };

  const handleCloseModel = () => {
    refetch();
    setModalOpen(false);
    setIsEdit(false);
    setIsCreate(false);
  };

  return (
    <Layout>
      <div className='pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between'>
        <h3 className='text-2xl leading-6 font-medium text-gray-900'>Jobs</h3>
        <div className='mt-4 flex md:mt-0'>
          <button
            onClick={() => handleOpenCreateModel()}
            type='button'
            className='inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            Create
          </button>
        </div>
      </div>

      <Table header={['Title', 'Location', 'Status', 'Create Date']}>
        <>
          {!loading &&
            data &&
            data.length > 0 &&
            data.map((job: any) => (
              <tr key={job.id}>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='flex items-center'>
                    <div className='text-sm font-medium text-primary-color'>{`${job.title}`}</div>
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='flex items-center'>
                    <div className='text-sm font-medium text-gray-900'>{job.location}</div>
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='flex items-center'>
                    <SwitchFieldForm
                      label=''
                      description=''
                      validation={{ required: false }}
                      isToggle={job.status === JobStatus.active ? true : false}
                      handleSetIsToggle={async (data: boolean) => {
                        await axios
                          .put(`jobs/${job.id}`, {
                            status: data ? JobStatus.active : JobStatus.inactive,
                          })
                          .then((response) => refetch());
                      }}
                    />
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm text-gray-400'>
                    Created on <time dateTime={job.createdAt}>{format(new Date(job.createdAt), 'd MMM uuuu')}</time>
                  </div>
                </td>

                <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                  <span
                    onClick={() => handleOpenEditModel(job.id)}
                    className='text-secondary-color hover:text-primary-color cursor-pointer'
                  >
                    Edit
                  </span>
                </td>
              </tr>
            ))}
        </>
      </Table>

      <JobSlideOver
        isEdit={isEdit}
        isCreate={isCreate}
        open={modalOpen}
        handleCloseModel={handleCloseModel}
        data={jobData}
      />
    </Layout>
  );
}
