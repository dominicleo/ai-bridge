import { InputItem, Button, Toast, WhiteSpace } from 'antd-mobile';
import * as React from 'react';

import Wrapper from '../../../components/wrapper';
import bridge from '../../utils/bridge';

const Page = () => {
  const [value, setValue] = React.useState('hello');
  const [state, setState] = React.useState<any>();

  const onGetClipboardData = async () => {
    try {
      const response = await bridge.getClipboardData();
      setState(response);
    } catch (error) {
      Toast.info(error.message);
    }
  };

  const onSetClipboardData = async () => {
    try {
      await bridge.setClipboardData({ content: value });
      Toast.info('剪切板设置成功');
    } catch (error) {
      Toast.info(error.message);
    }
  };

  return (
    <Wrapper response={state}>
      <InputItem
        value={value}
        placeholder='请输入剪切板内容'
        onChange={(value) => setValue(value)}
      />
      <WhiteSpace size='lg' />
      <Button type='primary' onClick={onSetClipboardData}>
        设置剪切板内容
      </Button>
      <WhiteSpace size='lg' />
      <Button type='primary' onClick={onGetClipboardData}>
        获取剪切板内容
      </Button>
    </Wrapper>
  );
};

export default Page;
