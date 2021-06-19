---
title: invoke 方法调用
---

# invoke

方法调用

<code src="./demo/invoke.tsx" hidden />

```tsx | pure
import Bridge from '@ai/birdge';

const bridge = new Bridge();

bridge.invoke('custom', { name: 'invoke' });
```

## BridgeInvokeOptions<R = any>

| 属性名    | 描述         | 类型                           | 默认值   |
| --------- | ------------ | ------------------------------ | -------- |
| name      | 调用方法名称 | `string`                       | `(必选)` |
| params    | 调用方法参数 | `any`                          | `-`      |
| onSuccess | 成功回调     | `(response: R) => void`        | `-`      |
| onError   | 失败回调     | `(error: BridgeError) => void` | `-`      |

[BridgeError](/guide/error)
