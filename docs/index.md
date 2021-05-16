---
title: JSBridge
hero:
  title: 小狸启蒙 JSBridge
  desc: 丰富的原生 API 媲美原生应用的体验
  actions:
    - text: 开始使用
      link: ./docs
footer: Docs by [dumi](https://d.umijs.org)
---

快速上手
```ts | pure
import Bridge from '@ai/bridge';

const birdge = new Bridge();

// 输出 Bridge 版本
console.log(Bridge.version);

bridge.alert('hello world').then(() => {
  bridge.alert('你点击了确定按钮')
});
```
