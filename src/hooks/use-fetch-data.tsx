import { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { getAccessToken } from '../utils/local-storage';

type useFetchDataProps = {
  url: string;
  params?: any;
};

export default function useFetchData({ url, params }: useFetchDataProps) {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [trigger, setTrigger] = useState(true);

  const refetch = () => {
    setTrigger(!trigger);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(url, {
          params: { ...(params && params) },
          headers: { Authorization: `Bearer ${getAccessToken()}` },
        });
        setData(response);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return {
    data,
    loading,
    refetch,
  };
}
