import { createContext, ReactNode, useState } from 'react';
import SnackBar from '../components/snackbar/snackbar';

type SeverityType = 'success' | 'info' | 'warning' | 'error' | undefined;

export interface AlertInterface {
  show: boolean;
  type: SeverityType;
  message: string;
}

interface SnackBarContextInterface {
  onOpen: (args: AlertInterface) => void;
  onClose: () => void;
}

export const SnackBarContext = createContext<Partial<SnackBarContextInterface>>({});

export default function SnackBarProvider({ children }: { children: ReactNode }): JSX.Element {
  const [alert, setAlert] = useState<AlertInterface>({
    type: undefined,
    show: false,
    message: '',
  });

  const onOpen = (args: AlertInterface) => {
    setAlert(args);
    setTimeout(onClose, 4000);
  };

  const onClose = () => {
    setAlert({ type: undefined, show: false, message: '' });
  };

  return (
    <SnackBarContext.Provider value={{ onOpen, onClose }}>
      {children}
      <SnackBar open={alert.show} type={alert.type} message={alert.message} close={onClose}></SnackBar>
    </SnackBarContext.Provider>
  );
}
