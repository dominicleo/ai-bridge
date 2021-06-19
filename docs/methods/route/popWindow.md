---
title: popWindow 关闭当前页面
---

# popWindow

关闭当前页面

<code src="./demo/popWindow.tsx" hidden />

```tsx | pure
import Bridge from '@ai/birdge';

const bridge = new Bridge();

bridge.popWindow();
bridge.popWindow(1);
```

`bridge.popWindow: (options: ResolveOptions<PopWindowOptions, number>) => Promise<void>`

## PopWindowOptions

| 属性名 | 描述                                                        | 类型     | 默认值 |
| ------ | ----------------------------------------------------------- | -------- | ------ |
| delta  | 返回的页面数<br />如果 `delta` 大于现有页面数, 则返回到首页 | `number` | `1`    |
