import { Layout } from 'antd';
import { useWindowSize } from 'react-use';

import styles from './MainLayout.module.less';

const { Header, Content } = Layout;

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  const { height } = useWindowSize();

  return (
    <Layout style={{}}>
      <Header style={{ height: '64px', padding: '0px' }} className={styles.header}>
        <div>nav</div>
      </Header>

      <Content className={styles.content} style={{ height: `${height - 64}px` }}>
        <main id="main-layout">{children}</main>
      </Content>
    </Layout>
  );
};
