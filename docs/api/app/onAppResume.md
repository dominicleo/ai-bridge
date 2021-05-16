---
title: onAppResume
---
# onAppResume

监听应用从后台唤起事件

```tsx | pure
import React, { useState, useEffect } from 'react';
import { Button, Toast } from '@ai/mobile';
import Bridge, { BridgeError } from '@ai/bridge';

const bridge = new Bridge();

const Page = () => {
  const [state, setState] = useState({});

  function callback (response) {
    setState(setState);
  }

  useEffect(() => {
    bridge.onAppResume(callback);

    return () => {
      bridge.offAppResume(callback);
    }
  }, [])

  const onClick = async () => {
    try {
      await bridge.pushWindow('https://baidu.com');
    } catch(error) {
      Toast.info({ content: error.message });
    }
  }

  const onBack = async () => {
    try {
      await bridge.popWindow({
        city: '上海',
        code: '310100'
      });
    } catch(error) {
      Toast.info({ content: error.message });
    }
  }
  
  return (
    <>
      <Button type='primary' onClick={onClick}>打开新页面</Button>
      <Button type='primary' onClick={onBack}>退出页面</Button>
    </>
  )
}

export default Page;
```
