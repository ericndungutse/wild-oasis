import { Suspense, lazy } from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Dashboard from './pages/Dashboard';
import Cabins from './pages/Cabins';
import Bookings from './pages/Bookings';
import Account from './pages/Account';
import Login from './pages/Login';
import Users from './pages/Users';
import PageNotFound from './pages/PageNotFound';
import GlobalStyles from './styles/GlobalStyles';
import AppLayout from './ui/AppLayout';
import { Toaster } from 'react-hot-toast';
import Booking from './pages/Booking';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Amount of time data in cache will stay valid to e refetched again
      staleTime: 0,
    },
  },
});

const Settings = lazy(() => import('./pages/Settings'));
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route
              index
              element={<Navigate replace to='dashboard' />}
            />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='cabins' element={<Cabins />} />
            <Route path='bookings' element={<Bookings />} />
            <Route path='bookings/:id' element={<Booking />} />
            <Route
              path='settings'
              element={
                <Suspense fallback={<h1>Wait...</h1>}>
                  <Settings />
                </Suspense>
              }
            />
            <Route path='account' element={<Account />} />
            <Route path='users' element={<Users />} />
          </Route>
          <Route path='login' element={<Login />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position='top-center'
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: { duration: 3000 },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: '16px',
            textAlign: 'center',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: 'var(--color-grey-50)',
            color: 'var(--color-grey-700)',
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
