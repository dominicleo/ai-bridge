import Bridge, { BridgeError } from '@ai/bridge';
import { Button, Toast } from 'antd-mobile';
import * as React from 'react';

import Wrapper from '../components/wrapper';

const Page = () => {
  const onClick = async () => {
    try {
      await Promise.all([
        Promise.reject(new BridgeError('无效的方法', Bridge.INVALID)),
        Promise.reject(new Error('custom')),
      ]);
    } catch (error) {
      Toast.info(error.message);
    }
  };

  return (
    <Wrapper>
      <Button type='primary' onClick={onClick}>
        Bridge 异常
      </Button>
    </Wrapper>
  );
};

export default Page;
