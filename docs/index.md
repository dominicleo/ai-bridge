---
title: JSBridge
hero:
  title: 小狸启蒙 JSBridge
  desc: 丰富的原生 API 媲美原生应用的体验
  actions:
    - text: 开始使用
      link: ./guide
footer: Docs by [dumi](https://d.umijs.org)
---

## 快速上手

```ts | pure
import Bridge from '@ai/bridge';

const bridge = new Bridge({
  // 调试模式
  debug: true,
});

// 获取用户令牌
bridge.getAccessToken().then(({ token }) => {
  console.log(token);
});
```
