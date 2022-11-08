import { AppProvider } from '@/providers/AppProvider';
import { AppRoutes } from '@/routes';

export const App = () => {
  // eslint-disable-next-line
  console.log(import.meta.env, 'env');

  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
};
