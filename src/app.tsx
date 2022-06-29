import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './pages';
import Jobs from './pages/dashboard/jobs';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='dashboard/jobs' element={<Jobs />} />

        {/* <Route path='expenses' element={<Expenses />} />
      <Route path='invoices' element={<Invoices />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
