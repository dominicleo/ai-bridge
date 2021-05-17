import { Button, Toast, Stepper, WhiteSpace, List } from 'antd-mobile';
import * as React from 'react';

import Wrapper from '../../../components/wrapper';
import bridge from '../../utils/bridge';

const Page = () => {
  const [value, setValue] = React.useState(0.5);
  const onClick = async () => {
    try {
      await bridge.setScreenBrightness(value);
      Toast.info('设置成功');
    } catch (error) {
      Toast.info(error.message);
    }
  };

  return (
    <Wrapper>
      <List.Item extra='亮度'>
        <Stepper
          value={value}
          max={1}
          min={0.1}
          step={0.1}
          onChange={(value) => setValue(value)}
          showNumber
        />
      </List.Item>
      <WhiteSpace size='lg' />
      <Button type='primary' onClick={onClick}>
        获取屏幕亮度
      </Button>
    </Wrapper>
  );
};

export default Page;
