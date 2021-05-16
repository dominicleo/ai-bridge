---
title: 取消事件监听
---
# 取消事件监听
## off

```tsx | pure
import React, { useState } from 'react';
import { Button, Toast } from '@ai/mobile';
import Bridge from '@ai/bridge';

const bridge = new Bridge();

const Page = () => {
  const [state, setState] = useState({});

  function callback (response) {
    setState(response);
  }

  const onCustom = async () => {
    bridge.invoke({ name: 'onCustomEvent', onSuccess: callback });
  }

  const offCustom = async () => {
    bridge.off({ name: 'onCustomEvent', callback });
  }
  
  return (
    <>
      <Button onPress={onCustom}>onCustom</Button>
      <Button onPress={offCustom}>offCustom</Button>
      <h3>监听数据<h3>
      <pre>{JSON.stringify(state)}</pre>
    </>
  );
}
```

## Args<R = any>

| 属性名 | 描述 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| name | 取消监听事件名称 | `string` | `(必选)`|
| callback | 调用方法参数 | `EventCallback<R>` | `(必选)` |


## EventCallback<R = any>
