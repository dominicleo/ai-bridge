import { Button, Toast } from 'antd-mobile';
import * as React from 'react';

import Wrapper from '../../components/wrapper';
import bridge from '../utils/bridge';

const Page = () => {
  const onClick = () => {
    bridge.invoke({
      name: 'alert',
      params: {
        content: 'invoke alert',
      },
      onSuccess() {
        Toast.info({ content: '你点击了确定按钮' });
      },
      onError(error) {
        Toast.info(error.message);
      },
    });
  };

  return (
    <Wrapper>
      <Button type='primary' onClick={onClick}>
        invoke alert
      </Button>
    </Wrapper>
  );
};

export default Page;
