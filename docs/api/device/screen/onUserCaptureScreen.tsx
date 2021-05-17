import { Button, Toast } from 'antd-mobile';
import * as React from 'react';

import Wrapper from '../../../components/wrapper';
import bridge from '../../utils/bridge';

const Page = () => {
  const [state, setState] = React.useState<any>();

  function callback(response) {
    setState(response);
    Toast.info('用户截屏了');
  }

  const register = () => {
    try {
      bridge.onUserCaptureScreen(callback);
    } catch (error) {
      Toast.info(error.message);
    }
  };

  const unregister = () => {
    bridge.offUserCaptureScreen(callback);
  };

  React.useEffect(() => unregister, []);

  return (
    <Wrapper response={state}>
      <Button type='primary' onClick={register}>
        注册监听事件
      </Button>
    </Wrapper>
  );
};

export default Page;
