import { Button, List, Toast, WhiteSpace, WingBlank } from 'antd-mobile';
import * as React from 'react';

import bridge from '../../../_internal/bridge';

export default () => {
  const onClick = async () => {
    try {
      await bridge.logout();
    } catch (error) {
      Toast.info(error.message);
    }
  };

  return (
    <>
      <WhiteSpace size='lg' />
      <WingBlank size='lg'>
        <Button type='ghost' onClick={onClick}>
          退出登录
        </Button>
      </WingBlank>
    </>
  );
};
