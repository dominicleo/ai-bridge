---
title: 显示提示框
---

# 显示提示框

## alert

```tsx | pure
import React from 'react';
import { Button, Toast } from '@ai/mobile';
import Bridge from '@ai/bridge';

const bridge = new Bridge();

const Page = () => {

  const onClick = () => {
    bridge.alert('hello world').then(() => {
      bridge.alert('你点击了确定按钮');
    });
  }
  
  return (
    <>
      <Button onPress={onClick}>alert</Button>
    </>
  );
}
```

## ResolveContentOptions`<AlertOptions>`

| 属性名 | 描述 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| title | 提示框标题 | `string` | - |
| content | 提示框内容 | `string` | `(必选)` |
| buttonText | 按钮文字 | `string` | `确定` |

