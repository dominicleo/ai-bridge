---
title: pushWindow 打开新页面
---

# pushWindow

打开新页面

<code src="./demo/pushWindow.tsx" hidden />

```tsx | pure
import Bridge from '@ai/birdge';

const bridge = new Bridge();

bridge.pushWindow('https://m.zhangmen.com');
bridge.pushWindow({
  url: 'https://m.zhangmen.com',
  navigationStyle: 'custom',
});
```

`bridge.pushWindow: (options: ResolveOptions<PushWindowOptions>) => Promise<void>`

## PushWindowOptions

| 属性名          | 描述       | 类型                  | 默认值    |
| --------------- | ---------- | --------------------- | --------- |
| url             | 页面地址   | `string`              | -         |
| navigationStyle | 导航栏样式 | `default` \| `custom` | `default` |
