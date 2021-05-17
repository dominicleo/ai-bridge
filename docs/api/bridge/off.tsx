import { Button, Toast, WhiteSpace } from 'antd-mobile';
import * as React from 'react';

import Wrapper from '../../components/wrapper';
import bridge from '../utils/bridge';

const Page: React.FC = () => {
  const [state, setState] = React.useState<any>();

  function callback(response) {
    setState(response);
  }

  const onCustom = () => {
    bridge.invoke({
      name: 'onCustomEvent',
      onSuccess: callback,
      onError(error) {
        Toast.info(error.message);
      },
    });
  };

  const offCustom = () => {
    bridge.off('onCustomEvent', callback);
  };

  return (
    <Wrapper response={state}>
      <Button type='primary' onClick={onCustom}>
        监听自定义事件
      </Button>
      <WhiteSpace size='lg' />
      <Button type='primary' onClick={offCustom}>
        移除自定义事件
      </Button>
    </Wrapper>
  );
};

export default Page;
