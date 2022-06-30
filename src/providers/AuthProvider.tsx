import { createEventBus } from '../utils/create-event-bus';
import { clearTokens, getAccessToken } from '../utils/local-storage';
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useRef, useState, useContext } from 'react';

const authChangeEventBus = createEventBus();

function getIsAuthenticated() {
  return getAccessToken() !== null;
}

const AuthContext = createContext<boolean>(false);
AuthContext.displayName = 'AuthContext';

const AuthDispatchContext = createContext<Dispatch<SetStateAction<boolean>>>(() => {});
AuthDispatchContext.displayName = 'AuthDispatchContext';

export const AuthProvider = (props: { children: ReactNode }): JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = useState(getIsAuthenticated);
  const latestIsAuthenticatedRef = useRef(isAuthenticated);
  latestIsAuthenticatedRef.current = isAuthenticated;

  useEffect(() => {
    const syncStorage = () => {
      const newIsAuthenticated = getIsAuthenticated();
      if (newIsAuthenticated !== latestIsAuthenticatedRef.current) {
        setIsAuthenticated(newIsAuthenticated);
      }
    };

    const unsub = authChangeEventBus.listen(syncStorage);

    window.addEventListener('storage', syncStorage);

    return () => {
      unsub();
      window.removeEventListener('storage', syncStorage);
    };
  }, []);

  return (
    <AuthContext.Provider value={isAuthenticated}>
      <AuthDispatchContext.Provider value={setIsAuthenticated}>{props.children}</AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
};

export const useIsAuthenticated = () => useContext(AuthContext);

export const useSetIsAuthenticated = () => useContext(AuthDispatchContext);

export const notifyAuthChange = () => authChangeEventBus.emit();

export const useLogout = () => {
  const setIsAuthenticated = useSetIsAuthenticated();

  return function logout() {
    setIsAuthenticated(false);
    clearTokens();
  };
};
