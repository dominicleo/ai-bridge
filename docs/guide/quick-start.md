---
title: 快速上手
order: 0
---

# 快速上手

通过本章节你可以了解到 @ai/bridge 的安装方法和基本使用姿势

## 安装

可以通过 npm 或 yarn 进行安装

```bash
$ npm i @ai/bridge -S
# or
$ yarn add @ai/bridge -S
```

> 注意：安装依赖前需要切换至公司镜像
>
> [http://npm.zmops.cc/](http://npm.zmops.cc/)
>
> 使用 [nrm](https://github.com/Pana/nrm) 管理 npm 镜像地址

## 开始使用

```tsx | pure
import Bridge from '@ai/bridge';

const bridge = new Bridge();

// 获取用户令牌
bridge.getAccessToken().then(({ token }) => {
  console.log(token);
});
```
