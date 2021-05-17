import { Button, Toast, WhiteSpace } from 'antd-mobile';
import * as React from 'react';

import Wrapper from '../../components/wrapper';
import bridge from '../utils/bridge';

const Page = () => {
  const onShowToast = async () => {
    try {
      await bridge.showToast('hello').then(() => bridge.showToast('消失了'));
    } catch (error) {
      Toast.info(error.message);
    }
  };

  const onHideToast = async () => {
    try {
      await bridge.hideToast();
    } catch (error) {
      Toast.info(error.message);
    }
  };

  return (
    <Wrapper>
      <Button type='primary' onClick={onShowToast}>
        showToast
      </Button>
      <WhiteSpace size='lg' />
      <Button type='primary' onClick={onHideToast}>
        hideToast
      </Button>
    </Wrapper>
  );
};

export default Page;
