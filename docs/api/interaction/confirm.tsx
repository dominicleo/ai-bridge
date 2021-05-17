import { Button, Toast } from 'antd-mobile';
import * as React from 'react';

import Wrapper from '../../components/wrapper';
import bridge from '../utils/bridge';

const Page = () => {
  const onClick = async () => {
    try {
      await bridge.confirm('hello world').then(({ confirm, cancel }) => {
        confirm && bridge.alert('你点击了确定按钮');
        cancel && bridge.alert('你点击了取消按钮');
      });
    } catch (error) {
      Toast.info(error.message);
    }
  };

  return (
    <Wrapper>
      <Button type='primary' onClick={onClick}>
        显示确认框
      </Button>
    </Wrapper>
  );
};

export default Page;
