import { Button, Toast, WhiteSpace } from 'antd-mobile';
import * as React from 'react';

import Wrapper from '../../components/wrapper';
import bridge from '../utils/bridge';

const contents = {
  success: '操作成功',
  fail: '操作失败',
  none: '系统繁忙，请稍候',
};

const Page = () => {
  const onClick = async (message: string) => {
    try {
      await bridge.showToast(message).then(() => bridge.showToast('消失了'));
    } catch (error) {
      Toast.info(error.message);
    }
  };

  return (
    <Wrapper>
      {Object.entries(contents).map(([key, value], index) => (
        <div key={key}>
          <Button key={key} type='primary' onClick={() => onClick(value)}>
            {key}
          </Button>
          <WhiteSpace size='lg' />
        </div>
      ))}
    </Wrapper>
  );
};

export default Page;
