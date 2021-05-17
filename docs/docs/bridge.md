---
title: Bridge
---
# Bridge

初始化
```tsx | pure
// utils/birdge.ts
import Bridge from '@ai/bridge';

const bridge = new Bridge();

// 输出 Bridge 版本号
console.log(Bridge.version);

export default bridge;
```

adapter
<code src="./adapter.tsx"></code>

## BridgeOptions

| 属性名 | 描述 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| debug | 是否开启调试模式 | `boolean` | 	`false` |
| timeout | 调用超时时间, 单位 `ms` | `number` | `0` |
| timeouts | 方法调用超时时间, 单位 `ms` | `object` | `(必选)` |
| adapter | 适配器 | `(options: BrdigeAdapterOptions) => void` | - |


#### BrdigeAdapterOptions
| 属性名 | 描述 | 类型 |
| ---- | ---- | ---- |
| callbackid | 方法调用 ID | `string` |
| response | 方法响应数据 | `BridgeCallbackResponse` |

#### BridgeCallbackResponse
| 属性名 | 描述 | 类型 |
| ---- | ---- | ---- |
| code | 状态码 | `number` |
| message | 调用返回信息 | `string` |
| data | 调用返回数据 | `object` |


## 静态属性

| 属性名 | 描述 | 类型 | 返回值 |
| ---- | ---- | ---- | ---- |
| version | `Bridge` 版本号 | `string` | `当前 Bridge 版本号` |

### 状态码
| 属性名 | 描述 | 返回值 |
| ---- | ---- | ---- |
| SUCCESS | 调用成功 | `0` |
| INVALID | 无效的方法 | `10000` |
| TIMEOUT | 方法执行超时 | `10001` |
| NOT_SUPPORT | `Bridge` 未支持 | `10002` |
| BAN | 方法被禁用 | `10003` |
| ERROR | 方法执行异常 | `10005` |
| NOT_PERMISSION | 方法未获取系统授权 | `10006` |
| CALLBACK_EVENT_DOES_NOT_EXIST | 回调事件不存在 | `10007` |

