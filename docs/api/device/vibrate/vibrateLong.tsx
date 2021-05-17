import { Button, Toast } from 'antd-mobile';
import * as React from 'react';

import Wrapper from '../../../components/wrapper';
import bridge from '../../utils/bridge';

const Page = () => {
  const onClick = async () => {
    try {
      await bridge.vibrateLong();
    } catch (error) {
      Toast.info(error.message);
    }
  };

  return (
    <Wrapper>
      <Button type='primary' onClick={onClick}>
        震动 (400ms)
      </Button>
    </Wrapper>
  );
};

export default Page;
