import Layout from '../components/layout/layout';
import useFetchData from '../hooks/use-fetch-data';
import { MailIcon, PhoneIcon, LocationMarkerIcon, EyeIcon } from '@heroicons/react/solid';
import ViewJobSlideOver from '../components/slide-overs/view-job-slide-overs';
import { useState } from 'react';
import axios from '../utils/axios';
import RegisterBanner from '../components/banner/register-banner';

export default function Index() {
  const [modalOpen, setModalOpen] = useState(false);
  const [jobData, setJobData] = useState(null);

  const { data, loading } = useFetchData({ url: 'jobs', params: { status: 'active' } });

  const handleOpenViewModel = async (id: string) => {
    await axios.get(`jobs/${id}`).then((response) => setJobData(response.data));
    setModalOpen(true);
  };

  const handleCloseModel = () => {
    setModalOpen(false);
  };

  return (
    <Layout>
      <ul className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {!loading &&
          data?.map((job: any) => (
            <li key={job.id} className='col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200'>
              <div className='w-full flex items-center justify-between p-6 space-x-6'>
                <div className='flex-1 truncate'>
                  <div className='flex items-center space-x-3'>
                    <h3 className='text-gray-900 text-sm font-medium truncate'>{job.title}</h3>
                  </div>
                  <p className='mt-1 text-gray-500 text-sm truncate'>{job.location}</p>
                </div>
              </div>
              <div>
                <div className='-mt-px flex divide-x divide-gray-200'>
                  {/* <div className='w-0 flex-1 flex'>
                    <a
                      href={`mailto:${job.email}`}
                      className='relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500'
                    >
                      <MailIcon className='w-5 h-5 text-gray-400' aria-hidden='true' />
                      <span className='ml-3'>Email</span>
                    </a>
                  </div> */}
                  <div className='-ml-px w-0 flex-1 flex'>
                    <div
                      onClick={() => handleOpenViewModel(job.id)}
                      className='cursor-pointer relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500'
                    >
                      <EyeIcon className='w-5 h-5 text-gray-400' aria-hidden='true' />
                      <span className='ml-3'>View</span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
      </ul>
      <RegisterBanner />

      <ViewJobSlideOver open={modalOpen} handleCloseModel={handleCloseModel} data={jobData} />
    </Layout>
  );
}
