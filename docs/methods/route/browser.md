---
title: browser 默认浏览器打开链接
---

# browser

使用默认浏览器打开链接

<code src="./demo/browser.tsx" hidden/>

```tsx | pure
import Bridge from '@ai/birdge';

const bridge = new Bridge();

bridge.browser('https://m.zhangmen.com');
bridge.browser({
  url: 'https://m.zhangmen.com',
});
```

`bridge.browser: (options: ResolveOptions<BrowserOptions>) => Promise<void>`

## BrowserOptions

| 属性名 | 描述     | 类型     | 默认值 |
| ------ | -------- | -------- | ------ |
| url    | 页面地址 | `string` | -      |
