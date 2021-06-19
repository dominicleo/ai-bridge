import { Button, List, Toast, WhiteSpace, WingBlank } from 'antd-mobile';
import * as React from 'react';

import bridge from '../../../_internal/bridge';

export default () => {
  const [state, setState] = React.useState([]);

  const onClick = async () => {
    try {
      const response = await bridge.getSystemInfo();
      setState(Object.entries(response).map(([key, value]) => ({ key, value })));
    } catch (error) {
      Toast.info(error.message);
    }
  };

  return (
    <>
      <WhiteSpace size='lg' />
      <WingBlank size='lg'>
        <Button type='ghost' onClick={onClick}>
          获取系统信息
        </Button>
      </WingBlank>
      <WhiteSpace size='lg' />
      {!!state.length && (
        <List renderHeader={() => 'trackers'}>
          {state.map(({ key, value }, index) => (
            <List.Item key={`${key}_${index}`} extra={JSON.stringify(value)}>
              {key}
            </List.Item>
          ))}
        </List>
      )}
      <WhiteSpace size='lg' />
    </>
  );
};
