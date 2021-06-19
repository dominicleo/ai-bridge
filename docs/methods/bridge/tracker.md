---
title: tracker 数据追踪
---

# tracker

数据追踪

<code src="./demo/tracker.tsx" hidden />

```tsx | pure
import Bridge from '@ai/birdge';

const bridge = new Bridge();

bridge.tracker((type, data) => {
  if (type === 'receive') {
    // 上报数据方法执行时间
    console.log(data.name, data.updatedAt - data.createdAt);
  }
});
```

### BridgeTrackerCallback

| 属性名 | 描述       | 类型                | 默认值 |
| ------ | :--------- | :------------------ | :----: |
| type   | 数据类型   | [LogType](#logtype) |  `-`   |
| data   | 自定义参数 | `any`               |  `-`   |

#### LogType

| 属性名     | 描述     |
| ---------- | :------- |
| initialize | 初始化   |
| invoke     | 方法调用 |
| receive    | 接收回调 |
| timeout    | 方法超时 |
| error      | 执行异常 |
| config     | 修改配置 |
