import { Button, Toast, WhiteSpace } from 'antd-mobile';
import * as React from 'react';

import Wrapper from '../../../components/wrapper';
import bridge from '../../utils/bridge';

const Page = () => {
  const onClick = async () => {
    try {
      await bridge.setLandscape();
      Toast.info('设置成功');
    } catch (error) {
      Toast.info(error.message);
    }
  };

  return (
    <Wrapper>
      <Button type='primary' onClick={onClick}>
        设置为横屏
      </Button>
    </Wrapper>
  );
};

export default Page;
