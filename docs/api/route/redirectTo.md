---
title: 替换当前页面
---
# 替换当前页面

不会产生历史记录

## redirectTo

```tsx | pure
import React from 'react';
import { Button, Toast } from '@ai/mobile';
import Bridge, { BridgeError } from '@ai/bridge';

const bridge = new Bridge();

const Page = () => {
  const onClick = async () => {
    try {
      await bridge.redirectTo('https://baidu.com');
    } catch(error) {
      Toast.info({ content: error.message });
    }
  }
  
  return (
    <>
      <Button type='primary' onClick={onClick}>打开百度</Button>
    </>
  )
}

export default Page;
```


## RedirectToOptions

| 属性名 | 描述 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| url | 页面地址 | `string` | - |

