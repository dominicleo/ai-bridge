import { Button, Toast, WhiteSpace } from 'antd-mobile';
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

  const onCustom = async () => {
    try {
      await bridge.pushWindow({ url: 'https://m.zhangmen.com/', navigationStyle: 'custom' });
    } catch (error) {
      Toast.info(error.message);
    }
  };

  return (
    <Wrapper>
      <Button type='primary' onClick={onClick}>
        打开掌门教育
      </Button>
      <WhiteSpace />
      <Button type='primary' onClick={onCustom}>
        自定义导航栏
      </Button>
    </Wrapper>
  );
};

export default Page;
