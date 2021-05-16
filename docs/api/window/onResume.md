---
title: onResume
---
# onResume

页面重新可见时, 会触发此事件, 包括下列两种情况
- 从后台被唤起和锁屏界面恢复, 触发 `onAppResume` 的同时会触发此事件
- 通过 `popWindow` 从下个页面回退, 触发 `onPageResume` 的同时会触发此事件
此外, 如果这个页面是通过 `popWindow` 到达, 且传递了 `data` 参数, 此页可以获取到 `data`

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
    bridge.onResume(callback);

    return () => {
      bridge.offResume(callback);
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


## ResumeResponse

| 属性名 | 描述 | 类型 |
| ---- | ---- | ---- |
| data | 通过 `popWindow` 传递的 `data` 参数 | `object` |

