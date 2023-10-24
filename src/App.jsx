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
    </QueryClientProvider>
  );
}

export default App;
