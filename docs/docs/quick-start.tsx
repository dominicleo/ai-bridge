import { Button, Toast } from 'antd-mobile';
import * as React from 'react';

import bridge from '../api/utils/bridge';
import Wrapper from '../components/wrapper';

const Page = () => {
  const [state, setState] = React.useState();

  const onClick = async () => {
    try {
      const response = await bridge.getSystemInfo();
      setState(response);
    } catch (error) {
      Toast.info(error.message);
    }
  };

  return (
    <Wrapper response={state}>
      <Button type='primary' onClick={onClick}>
        获取系统信息
      </Button>
    </Wrapper>
  );
};

export default Page;
