---
title: Bridge
---
# Bridge

初始化
```tsx | pure
import Bridge from '@ai/bridge';

const bridge = new Bridge();

// 输出 Bridge 版本号
console.log(Bridge.version);

export default bridge;
```

## BridgeOptions

| 属性名 | 描述 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| debug | 是否开启调试模式 | `boolean` | 	`false` |
| timeout | 调用超时时间, 单位 `ms` | `number` | `0` |
| timeouts | 方法调用超时时间, 单位 `ms` | `object` | `必选` |

## 静态属性

| 属性名 | 描述 | 类型 | 返回值 |
| ---- | ---- | ---- | ---- |
| version | `Bridge` 版本号 | `string` | `当前 Bridge 版本号` |
| SUCCESS | 调用成功 | `number` | `0` |
| INVALID | 无效的方法 | `number` | `10000` |
| TIMEOUT | 方法执行超时 | `number` | `10001` |
| NOT_SUPPORT | `Bridge` 未支持 | `number` | `10002` |
| BAN | 方法被禁用 | `number` | `10003` |
| ERROR | 方法执行异常 | `number` | `10005` |
| NOT_PERMISSION | 方法未获取系统授权 | `number` | `10006` |
| CALLBACK_EVENT_DOES_NOT_EXIST | 回调事件不存在 | `number` | `10007` |

