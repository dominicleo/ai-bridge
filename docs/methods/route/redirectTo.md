---
title: redirectTo 替换当前页面
---

# redirectTo

替换当前页面

<code src="./demo/redirectTo.tsx" hidden />

```tsx | pure
import Bridge from '@ai/birdge';

const bridge = new Bridge();

bridge.redirectTo('https://m.zhangmen.com');
bridge.redirectTo({
  url: 'https://m.zhangmen.com',
  navigationStyle: 'custom',
});
```

`bridge.redirectTo: (options: ResolveOptions<RedirectToOptions>) => Promise<void>`

## RedirectToOptions

| 属性名          | 描述       | 类型                  | 默认值    |
| --------------- | ---------- | --------------------- | --------- |
| url             | 页面地址   | `string`              | -         |
| navigationStyle | 导航栏样式 | `default` \| `custom` | `default` |
