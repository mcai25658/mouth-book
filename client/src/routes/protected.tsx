/* eslint-disable react-hooks/exhaustive-deps */
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Spinner } from '@/components/Elements/Spinner';
import { ContentLayout, MainLayout } from '@/components/Layout';
// import { lazyImport } from '@/utils/lazyImport';

// const { DiscussionsRoutes } = lazyImport(
//   () => import('@/features/discussions'),
//   'DiscussionsRoutes',
// );

const ProtectRoute = () => {
  return (
    <MainLayout>
      <Suspense fallback={<Spinner />}>
        <ContentLayout>
          <Outlet />
        </ContentLayout>
      </Suspense>
    </MainLayout>
  );
};

export const protectedRoutes = [
  {
    path: 'home',
    element: <ProtectRoute />,
    children: [
      {
        path: '',
        element: <div>Dashboard</div>,
      },
    ],
  },
];
