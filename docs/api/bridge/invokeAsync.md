---
title: 调用方法
---


# 调用方法（异步）

## invokeAsync

```tsx | pure
import React from 'react';
import { Button, Toast } from '@ai/mobile';
import Bridge from '@ai/bridge';

const bridge = new Bridge();

const Page = () => {

  const onClick = async () => {
    await bridge.invokeAsync({ name: 'alert', params: { content: 'invoke alert' } });
    Toast.info({ content: '你点击了确定按钮' }
  }
  
  return (
    <>
      <Button onPress={onClick}>invoke</Button>
    </>
  );
}
```

## BridgeInvokeOptions<R = any>

| 属性名 | 描述 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| name | 调用方法名称 | `string` | `(必选)`|
| params | 调用方法参数 | `any` | - |
| onSuccess | 成功回调 | `(response: R) => void` | `-` |
| onError | 失败回调 | `(error: BridgeError) => void` | `-` |

[BridgeError](/docs/error)
