import { useLocation } from 'react-router-dom';

import styles from './ContentLayout.module.less';

type ContentLayoutProps = {
  children: React.ReactNode;
};

export const ContentLayout = ({ children }: ContentLayoutProps) => {
  const { pathname } = useLocation();
  if (pathname.includes('record')) {
    return <div className={styles.container2}>{children}</div>;
  }
  return <div className={styles.container}>{children}</div>;
};
