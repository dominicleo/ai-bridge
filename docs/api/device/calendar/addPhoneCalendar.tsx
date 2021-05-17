import { Button, Toast } from 'antd-mobile';
import * as React from 'react';

import Wrapper from '../../../components/wrapper';
import bridge from '../../utils/bridge';

const Page = () => {
  const onClick = async () => {
    try {
      await bridge.addPhoneCalendar({
        title: 'Bridge',
        startTime: Date.now() + 60,
        description: 'hello world',
      });
      Toast.info('添加成功');
    } catch (error) {
      Toast.info(error.message);
    }
  };

  return (
    <Wrapper>
      <Button type='primary' onClick={onClick}>
        添加日历事件
      </Button>
    </Wrapper>
  );
};

export default Page;
