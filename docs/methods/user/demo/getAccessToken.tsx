import { Button, List, Toast, WhiteSpace, WingBlank } from 'antd-mobile';
import * as React from 'react';

import bridge from '../../../_internal/bridge';

export default () => {
  const [state, setState] = React.useState('');

  const onClick = async () => {
    try {
      const { token } = await bridge.getAccessToken();
      setState(token);
    } catch (error) {
      Toast.info(error.message);
    }
  };

  return (
    <>
      <WhiteSpace size='lg' />
      <WingBlank size='lg'>
        <Button type='ghost' onClick={onClick}>
          获取用户令牌
        </Button>
      </WingBlank>
      <WhiteSpace size='lg' />
      {!!state && (
        <List renderHeader={() => 'trackers'}>
          <WhiteSpace size='lg' />
          <WingBlank size='lg'>{state}</WingBlank>
          <WhiteSpace size='lg' />
        </List>
      )}
      <WhiteSpace size='lg' />
    </>
  );
};
