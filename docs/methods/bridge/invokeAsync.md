---
title: invokeAsync 方法调用 (异步)
---

# invokeAsync

方法调用 (异步)

<code src="./demo/invokeAsync.tsx" hidden />

```tsx | pure
import Bridge from '@ai/birdge';

const bridge = new Bridge();

bridge.invokeAsync('custom', { name: 'invoke' });
```

## BridgeInvokeAsyncOptions<R = any>

| 属性名 | 描述         | 类型     | 默认值   |
| ------ | ------------ | -------- | -------- |
| name   | 调用方法名称 | `string` | `(必选)` |
| params | 调用方法参数 | `any`    | `-`      |
