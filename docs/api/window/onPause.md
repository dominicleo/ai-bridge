---
title: onPause
---
# onPause

当一个页面不可见时, 会触发此事件, 包括下面两种情况

被压入后台和锁屏, 触发 `onAppPause` 的同时会触发此事件

通过 `pushWindow` 打开下个页面, 当前页面触发 `onPagePause` 的同时会触发此事件

```tsx | pure
import React, { useState, useEffect } from 'react';
import { Button, Toast } from '@ai/mobile';
import Bridge, { BridgeError } from '@ai/bridge';

const bridge = new Bridge();

const Page = () => {
  const [state, setState] = useState({});

  function callback (response) {
    bridge.alert('前面那个页面 pause 了');
  }

  useEffect(() => {
    bridge.onPause(callback);

    return () => {
      bridge.offPause(callback);
    }
  }, []);

  const onClick = async () => {
    try {
      await bridge.pushWindow('https://baidu.com');
    } catch(error) {
      Toast.info({ content: error.message });
    }
  }
  
  return (
    <>
      <Button type='primary' onClick={onClick}>打开新页面</Button>
    </>
  )
}

export default Page;
```
