import { Button, Modal, Toast } from 'antd-mobile';
import * as React from 'react';

import Wrapper from '../../components/wrapper';
import bridge from '../utils/bridge';

const Page = () => {
  function callback() {
    Modal.alert('系统提示', '亲，还摇不？', [
      { text: '不摇了', onPress: () => console.log('cancel') },
      { text: '继续摇', onPress: register },
    ]);
  }

  const register = async () => {
    try {
      bridge.watchShake(callback);
    } catch (error) {
      Toast.info(error.message);
    }
  };

  return (
    <Wrapper>
      <Button type='primary' onClick={register}>
        注册摇一摇事件
      </Button>
    </Wrapper>
  );
};

export default Page;
