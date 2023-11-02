import { Navigate } from 'react-router-dom';
import styled from 'styled-components';

import { useUser } from '../features/authentication/useUser';
import Spinner from './Spinner';

const FullPage = styled.div`
  height: 100dvh;
  display: grid;
  place-content: center;
  background-color: var(--color-grey-50);
`;

function ProtectedRoute({ children }) {
  // 1. Load authenticated user
  const { isLoading, isAuthenticated } = useUser();

  // 2. While loading, show loading spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 3. No authenitcated user, redirect to login page

  if (!isAuthenticated) {
    return <Navigate replace to='login' />;
  }

  // 4. Else render the app
  return children;
}

export default ProtectedRoute;

// // Version 2
// import { Navigate, useNavigate } from 'react-router-dom';
// import styled from 'styled-components';

// import { useUser } from '../features/authentication/useUser';
// import Spinner from './Spinner';
// import { useEffect } from 'react';

// const FullPage = styled.div`
//   height: 100dvh;
//   display: grid;
//   place-content: center;
//   background-color: var(--color-grey-50);
// `;

// function ProtectedRoute({ children }) {
//   const navigate = useNavigate();
//   // 1. Load authenticated user
//   const { isLoading, isAuthenticated } = useUser();

//   // 2. No authenitcated user, redirect to login page
//   useEffect(() => {
//     if (!isAuthenticated && !isLoading) {
//       console.log(isLoading, isAuthenticated);
//       navigate('/login');
//     }
//   }, [isAuthenticated, isLoading, navigate]);

//   // 2. While loading, show loading spinner
//   if (isLoading)
//     return (
//       <FullPage>
//         <Spinner />
//       </FullPage>
//     );

//   // 4. Else render the app
//   if (isAuthenticated) return children;
// }

// export default ProtectedRoute;
