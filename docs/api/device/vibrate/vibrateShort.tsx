import { Button, Radio, Toast, WhiteSpace } from 'antd-mobile';
import { VibrateShortOptions } from 'packages/bridge/lib/types';
import * as React from 'react';

import Wrapper from '../../../components/wrapper';
import bridge from '../../utils/bridge';

const options = [
  {
    value: 'heavy',
    label: '强',
  },
  {
    value: 'medium',
    label: '中等',
  },
  {
    value: 'light',
    label: '弱',
  },
];

type T = VibrateShortOptions['type'];

const Page = () => {
  const [value, setValue] = React.useState<T>('medium');
  const onClick = async () => {
    try {
      await bridge.vibrateShort({ type: value });
    } catch (error) {
      Toast.info(error.message);
    }
  };

  return (
    <Wrapper>
      {options.map((option) => (
        <Radio.RadioItem
          key={option.value}
          checked={option.value === value}
          onChange={() => setValue(option.value as T)}
        >
          {option.label}
        </Radio.RadioItem>
      ))}
      <WhiteSpace size='lg' />
      <Button type='primary' onClick={onClick}>
        震动 (15ms)
      </Button>
    </Wrapper>
  );
};

export default Page;
