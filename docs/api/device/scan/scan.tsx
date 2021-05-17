import { Button, Toast, WhiteSpace } from 'antd-mobile';
import * as React from 'react';

import Wrapper from '../../../components/wrapper';
import bridge from '../../utils/bridge';

const Page = () => {
  const [state, setState] = React.useState<any>();
  const onClick = async (type: 'qr' | 'bar') => {
    try {
      const response = await bridge.scan({ type });
      setState(response);
    } catch (error) {
      Toast.info(error.message);
    }
  };

  return (
    <Wrapper response={state}>
      <Button type='primary' onClick={() => onClick('qr')}>
        扫描二维码
      </Button>
      <WhiteSpace size='lg' />
      <Button type='primary' onClick={() => onClick('bar')}>
        扫描一维码
      </Button>
    </Wrapper>
  );
};

export default Page;
