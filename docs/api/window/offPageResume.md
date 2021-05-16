---
title: offPageResume
---
# offPageResume

移除 offPageResume 事件的监听

```tsx | pure
import React, { useState, useEffect } from 'react';
import { Button, Toast } from '@ai/mobile';
import Bridge, { BridgeError } from '@ai/bridge';

const bridge = new Bridge();

const Page = () => {
  const [state, setState] = useState({});

  function callback (response) {
    setState(setState);
    bridge.offPageResume(callback);
  }

  useEffect(() => {
    bridge.onPageResume(callback);
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
