import { useEffect, useState } from 'react';
import axios from '../utils/axios';

type useFetchDataProps = {
  url: string;
};

export default function useFetchData({ url }: useFetchDataProps) {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [trigger, setTrigger] = useState(true);

  const refetch = () => {
    setTrigger(!trigger);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(url);
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
