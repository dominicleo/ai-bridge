import * as React from 'react';
import { unstable_Button as Button } from '@ant-design/mobile'
import Bridge from '@ai/bridge';

const bridge = new Bridge();

// 输出 Bridge 版本号
console.log(Bridge.version);
const Page = () => {
  return <>
  <Button type='primary'>123</Button></>;
}

export default Page;
