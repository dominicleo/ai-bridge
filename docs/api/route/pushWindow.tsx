import { Button, Toast } from 'antd-mobile';
import * as React from 'react';

import Wrapper from '../../components/wrapper';
import bridge from '../utils/bridge';

const Page = () => {
  const onClick = async () => {
    try {
      await bridge.pushWindow('https://m.zhangmen.com/');
    } catch (error) {
      Toast.info(error.message);
    }
  };

  return (
    <Wrapper>
      <Button type='primary' onClick={onClick}>
        打开掌门教育
      </Button>
    </Wrapper>
  );
};

export default Page;
