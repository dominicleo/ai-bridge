---
title: 隐藏提示
---

# 隐藏提示

## hideToast

```tsx | pure
import React from 'react';
import { Button, Toast } from '@ai/mobile';
import Bridge from '@ai/bridge';

const bridge = new Bridge();

const Page = () => {

  const onShowToast = (message: string) => {
    bridge.showToast('showToast');
    
  }

  const onHideToast = (message: string) => {
    bridge.hideToast();
    
  }
  
  return (
    <>
      <Button onPress={onShowToast}>showToast</Button>
      <Button onPress={onHideToast}>hideToast</Button>
    </>
  );
}
```
