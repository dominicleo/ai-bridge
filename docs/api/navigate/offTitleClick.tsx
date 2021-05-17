import { Button, Toast, WhiteSpace } from 'antd-mobile';
import * as React from 'react';

import Wrapper from '../../components/wrapper';
import bridge from '../utils/bridge';

const Page = () => {
  const [state, setState] = React.useState<any>();

  function callback(response) {
    setState(response);
    Toast.info('导航栏标题被点击了');
  }

  const register = () => {
    try {
      bridge.onAppResume(callback);
    } catch (error) {
      Toast.info(error.message);
    }
  };

  const unregister = () => {
    bridge.offAppResume(callback);
  };

  React.useEffect(() => unregister, []);

  return (
    <Wrapper response={state}>
      <Button type='primary' onClick={register}>
        注册监听事件
      </Button>
      <WhiteSpace size='lg' />
      <Button type='primary' onClick={unregister}>
        移除监听
      </Button>
    </Wrapper>
  );
};

export default Page;
