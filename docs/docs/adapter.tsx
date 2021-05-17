import Bridge from '@ai/bridge';
import { Modal, Button } from 'antd-mobile';
import * as React from 'react';

import Wrapper from '../components/wrapper';

const bridge = new Bridge({
  adapter(options) {
    const { content } = options?.params;
    Modal.alert('自定义适配器', content);
  },
});

const Page = () => {
  const onClick = () => {
    bridge.alert('custom adapter');
  };
  return (
    <Wrapper>
      <Button type='primary' onClick={onClick}>
        自定义调用适配器
      </Button>
    </Wrapper>
  );
};

export default Page;
