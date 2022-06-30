import { useIsAuthenticated } from '../providers/AuthProvider';
import { Navigate } from 'react-router-dom';
import axios from '../utils/axios';
import { useEffect, useState } from 'react';
import { UserRole } from '../data/enum';

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const isAuthenticated = useIsAuthenticated();
  // const [isCorrectRole, setIsCorrectRole] = useState<boolean>(true);
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   if (isAuthenticated && role) {
  //     setIsLoading(true);
  //     const fetchUser = async () => {
  //       await axios
  //         .get('auth/me')
  //         .then((response) => {
  //           setIsCorrectRole(response.data.role === role);
  //           setIsLoading(false);
  //         })
  //         .catch(() => {
  //           setIsLoading(false);
  //         });
  //     };

  //     fetchUser();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isAuthenticated]);

  return isAuthenticated ? children : <Navigate to='/login' replace={true} />;
  // return (
  //   <>
  //     {isAuthenticated && !isLoading && isCorrectRole && children}
  //     {!isAuthenticated && <Navigate to='/login' replace={true} />}
  //   </>
  // );
}
