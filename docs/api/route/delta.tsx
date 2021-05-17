import { Button, Toast } from 'antd-mobile';
import * as React from 'react';

import Wrapper from '../../components/wrapper';
import bridge from '../utils/bridge';

const Page = () => {
  const onClick = async () => {
    try {
      await bridge.popWindow({
        title: '掌门教育',
      });
    } catch (error) {
      Toast.info(error.message);
    }
  };

  return (
    <Wrapper>
      <Button type='primary' onClick={onClick}>
        传递参数并退出页面
      </Button>
    </Wrapper>
  );
};

export default Page;
