import { useBreakpoints } from '@hooks/useBreakpoints';
import React, { PropsWithChildren } from 'react';
import styles from './index.module.scss';

const ControlsRow = ({ children }: PropsWithChildren) => {
  const { isDesktop } = useBreakpoints();
  return isDesktop ? (
    children
  ) : (
    <div className={styles.controls_row}>{children}</div>
  );
};

export default ControlsRow;
