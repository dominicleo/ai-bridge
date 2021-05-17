import { Button, Toast } from 'antd-mobile';
import * as React from 'react';

import Wrapper from '../../../components/wrapper';
import bridge from '../../utils/bridge';

const Page = () => {
  const onClick = async () => {
    try {
      await bridge.setPortrait();
      Toast.info('设置成功');
    } catch (error) {
      Toast.info(error.message);
    }
  };

  return (
    <Wrapper>
      <Button type='primary' onClick={onClick}>
        设置为竖屏
      </Button>
    </Wrapper>
  );
};

export default Page;
