import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/private-route';
import Index from './pages';
import Jobs from './pages/dashboard/jobs';
import Login from './pages/login';
import Register from './pages/register';
import { AuthProvider } from './providers/AuthProvider';
import SnackbarProvider from './providers/SnackbarProvider';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SnackbarProvider>
          <Routes>
            <Route path='/' element={<Index />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route
              path='/dashboard/jobs'
              element={
                <PrivateRoute>
                  <Jobs />
                </PrivateRoute>
              }
            />
          </Routes>
        </SnackbarProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
