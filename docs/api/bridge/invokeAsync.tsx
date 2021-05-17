import { Button, Toast } from 'antd-mobile';
import * as React from 'react';

import Wrapper from '../../components/wrapper';
import bridge from '../utils/bridge';

const Page = () => {
  const onClick = async () => {
    try {
      await bridge.invokeAsync({
        name: 'alert',
        params: {
          content: 'invoke alert',
        },
      });
      Toast.info({ content: '你点击了确定按钮' });
    } catch (error) {
      Toast.info(error.message);
    }
  };

  return (
    <Wrapper>
      <Button type='primary' onClick={onClick}>
        invokeAsync alert
      </Button>
    </Wrapper>
  );
};

export default Page;
