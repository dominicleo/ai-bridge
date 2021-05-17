---
title: BridgeError
---
# BridgeError

可以通过 `BridgeError` 判断是否为 Bridge 异常

<code src="./error.tsx"></code>

## 参数

| 属性名 | 描述 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| message | 错误信息 | `boolean` | `必选` |
| code | 错误码 | `number` | `必选` |

## 错误码
| 属性名 | 属性值 | 描述 |
| ---- | ---- | ---- |
| INVALID | `10000` |无效的方法 |
| TIMEOUT | `10001` |方法执行超时 |
| NOT_SUPPORT | Bridge `10002` |未支持 |
| BAN | `10003` |方法被禁用 |
| ERROR | `10005` |方法执行异常 |
| NOT_PERMISSION | `10006` |方法未获取系统授权 |
| CALLBACK_EVENT_DOES_NOT_EXIST | `10007` |回调事件不存在 |

