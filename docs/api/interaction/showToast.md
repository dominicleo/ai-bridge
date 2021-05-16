---
title: 显示提示
---

# 显示提示

## showToast

```tsx | pure
import React from 'react';
import { Button, Toast } from '@ai/mobile';
import Bridge from '@ai/bridge';

const bridge = new Bridge();

const contents = {
  success: '操作成功',
  fail: '操作失败',
  none: '系统繁忙，请稍候'
};

const Page = () => {

  const onClick = (message: string) => {
    bridge.showToast(message, () => {
      bridge.showToast('消失了');
    });
  }
  
  return (
    <>
      {Object.entries(contents).map(([key, value]) => (
        <Button key={key} onPress={() => onClick(value)}>{key}</Button>
      ))}
    </>
  );
}
```

## ResolveContentOptions`<ShowToastOptions>`

| 属性名 | 描述 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| type | 提示类型 `none` | `success` | `fail` | `string` | `none` |
| content | 提示内容 | `string` | `(必选)` |
| duration | 显示时长, 单位 `ms` | `number` | `2000` |
