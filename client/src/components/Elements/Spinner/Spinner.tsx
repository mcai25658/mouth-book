import { Spin } from 'antd';
import { useState, useEffect } from 'react';
import { useWindowSize } from 'react-use';

import styles from './Spinner.module.less';

interface SpinnerProps {
  tip?: string;
  action?: React.ReactNode;
}

const defaultProps = {
  tip: 'loading...',
  action: undefined,
};

export const Spinner = ({ tip, action }: SpinnerProps) => {
  const [showActin, setShowAction] = useState(false);
  const { height } = useWindowSize();

  useEffect(() => {
    setTimeout(() => {
      setShowAction(true);
    }, 1000 * 10);

    return () => {
      setShowAction(false);
    };
  }, []);
  return (
    <div className={`flex-col z-index-huge flex-center ${styles.container}`} style={{ height }}>
      <Spin className="mb-1" size="large" tip={tip} delay={100} />
      {showActin && action}
    </div>
  );
};

Spinner.defaultProps = defaultProps;
