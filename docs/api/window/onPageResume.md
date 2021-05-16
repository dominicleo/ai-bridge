---
title: onPageResume
---
# onPageResume

当一个页面重新可见时(仅指从下个页面回退), 会触发此事件

如果这个页面通过 `popWindow` 到达时传递了 `data` 参数, 此页可以获取到 `data`

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
    bridge.onPageResume(callback);

    return () => {
      bridge.offPageResume(callback);
    };
  }, [])

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


## PageResumeResponse

| 属性名 | 描述 | 类型 |
| ---- | ---- | ---- |
| data | 通过 `popWindow` 传递的 `data` 参数 | `object` |

