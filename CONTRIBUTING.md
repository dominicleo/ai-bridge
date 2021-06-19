# 贡献指南

这篇指南会指导你如何为 `@ai/bridge` 贡献一份自己的力量，请在你要提 issue 或者 merge request 之前花几分钟来阅读一遍这篇指南。


## 透明的开发

我们所有的工作都会放在 Github 上。不管是核心团队的成员还是外部贡献者的 merge request 都需要经过同样流程的 review。

## 分支管理

目前我们所有的开发都在 master 分支上进行，我们会尽力保证 master 上的代码稳定。所有在 master 上提交的代码必须是向下兼容的，可以新增功能，但不允许有破坏性的修改。

## Bugs

我们使用 [Github Issues](https://github.com/dominicleo/ai-bridge/issues) 来管理 bug。 如果你想要你发现的 bug 被快速解决，最好的办法就是给我们提一个带有可重现仓库的 issue。

在你报告一个 bug 之前，请先确保已经搜索过已有的 issues。

## 开发



在开始之前推荐你先了解一下[《Bridge 实现原理》](https://juejin.cn/post/6936814903021797389)

### 构建项目
推荐用 `yarn`

```bash
$ git clone https://github.com/dominicleo/ai-bridge.git
$ cd ai-bridge
$ yarn
$ yarn dev
```

### 调试开发包
```bash
$ cd path/to/ai-bridge
$ yarn link 
$ cd path/to/examples // 调试项目
$ yarn link @ai/bridge
```

### 运行测试
```bash
$ yarn test
```
