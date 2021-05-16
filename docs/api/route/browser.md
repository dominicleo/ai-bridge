---
title: 打开默认浏览器
---
# 打开默认浏览器

使用默认浏览器打开地址

## browser

```tsx | pure
import React from 'react';
import { Button, Toast } from '@ai/mobile';
import Bridge, { BridgeError } from '@ai/bridge';

const bridge = new Bridge();

const Page = () => {
  const onClick = async () => {
    try {
      await bridge.browser('https://baidu.com');
    } catch(error) {
      Toast.info({ content: error.message });
    }
  }
  
  return (
    <>
      <Button type='primary' onClick={onClick}>使用默认浏览器打开百度</Button>
    </>
  )
}

export default Page;
```


## BrowserOptions

| 属性名 | 描述 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| url | 页面地址 | `string` | - |

