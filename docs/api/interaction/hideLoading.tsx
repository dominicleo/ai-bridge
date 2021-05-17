import { Button, Toast, WhiteSpace } from 'antd-mobile';
import * as React from 'react';

import Wrapper from '../../components/wrapper';
import bridge from '../utils/bridge';

const Page = () => {
  const hideLoading = () => {
    return new Promise((resolve) => {
      bridge.hideLoading();
      setTimeout(resolve, 3000);
    });
  };
  const onClick = async () => {
    try {
      await bridge.showLoading('loading');
      await Promise.all([bridge.showLoading('loading'), hideLoading()]);
    } catch (error) {
      Toast.info(error.message);
    }
  };

  return (
    <Wrapper>
      <Button type='primary' onClick={onClick}>
        showLoading (3s)
      </Button>
    </Wrapper>
  );
};

export default Page;
