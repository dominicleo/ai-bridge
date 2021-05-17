import { Button, Toast } from 'antd-mobile';
import * as React from 'react';

import Wrapper from '../../components/wrapper';
import bridge from '../utils/bridge';

const Page = () => {
  const [state, setState] = React.useState<any>();

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
        getSystemInfo
      </Button>
    </Wrapper>
  );
};

export default Page;
