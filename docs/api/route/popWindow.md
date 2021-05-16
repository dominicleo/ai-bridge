---
title: 关闭当前页面
---
# 关闭当前页面

## popWindow

```tsx | pure
import React from 'react';
import { Button, Toast } from '@ai/mobile';
import Bridge, { BridgeError } from '@ai/bridge';

const bridge = new Bridge();

const Page = () => {
  const onClick = async () => {
    try {
      await bridge.popWindow();
    } catch(error) {
      Toast.info({ content: error.message });
    }
  }
  
  return (
    <>
      <Button type='primary' onClick={onClick}>退出页面</Button>
    </>
  )
}

export default Page;
```


## PopWindowOptions

| 属性名 | 描述 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| delta | 返回的页面数, 如果 delta 大于现有页面数, 则返回到首页 | `number` | `1` |
| data | 对象将会被即将露出的页面通过 onResume 事件接收 | `object` | - |

