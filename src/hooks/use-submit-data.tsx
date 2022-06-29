import { useEffect, useState } from 'react';
import axios from 'axios';

type usePostDataProps = {
  url: string;
  method: string;
  payload?: any;
};

export default function useSubmitData({ url, method, payload }: usePostDataProps) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.request({
          data: payload,
          method,
          url,
        });

        setData(response.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(true);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, error, loading };
}
