---
title: Bridge 实例
order: 2
---

# Bridge 实例

## 初始化

`/path/to/src/utils/bridge.ts`

```tsx | pure
import Bridge from '@ai/bridge';

const bridge = new Bridge({
  // 开启调试模式
  debug: process.env.NODE_ENV !== 'production',
});

export default bridge;
```

## 获取当前版本

```tsx | pure
import Bridge from '@ai/bridge';

console.log(Bridge.version);
```

## 自定义调用

通常在 `@ai/bridge` 还未实现实例方法时使用

```tsx | pure
import bridge from '/path/to/src/utils/bridge.ts';
bridge.invoke('custom', null, (data) => {
  console.log(data);
});

// 异步调用（该调用过程基于 Promise , 只能返回一次结果）
bridge.invokeAsync('custom').then((data) => {
  console.log(data);
});
```

## 修改配置

```tsx | pure
import bridge from '/path/to/src/utils/bridge.ts';

bridge.setConfig({
  receive: 'CustomJSBridgeReceive'
  timeout: 10000
});
```

## 自定义适配器

```tsx | pure
import { BridgeError, BridgeAdapterOptions } from '@ai/bridge';
import bridge from '/path/to/src/utils/bridge.ts';

function adapter(options: BridgeAdapterOptions) {
  if (typeof global?.CustomJSBridge?.postMessage === 'function') {
    // 根据平台自行判断是否需要序列化对象
    global.CustomJSBridge.postMessage(JSON.stringify(options));
    return;
  }

  throw new BridgeError('Bridge 未支持', Bridge.UNSUPPORTED);
}

// 更新配置
bridge.setConfig({ adapter });
```

## 数据打点

```tsx | pure
import bridge from '/path/to/src/utils/bridge.ts';

// 数据打点
bridge.tracker((type, data) => {
  if (type === 'receive') {
    // 方法执行时间
    console.log(data.name, data.updatedAt - data.createdAt);
  }
  // 上报数据
});
```

## 重写实例方法

```tsx | pure
import { createURL } from '@/utils';
import { SCHEMA } from '@/constants';
import bridge from '/path/to/src/utils/bridge.ts';

bridge.pushWindow = function (options) {
  const params = resolveContent(options, {}, 'url');
  if (params.navigationStyle === 'custom' && /^https?/i.test(params.url)) {
    params.url = createURL(SCHEMA.WEBVIEW, {
      url: params.url,
      showNavigation: 0,
    });
  }
  return this.invokeAsync({ name: 'pushWindow', params });
};
```

## 参数

### BridgeOptions

| 属性名   | 描述                    | 类型                                                                 | 默认值  |
| -------- | :---------------------- | :------------------------------------------------------------------- | :-----: |
| debug    | 是否开启调试模式        | `boolean`                                                            | `false` |
| timeout  | 全局超时设置, 单位 `ms` | `number`                                                             |   `0`   |
| timeouts | 方法超时设置, 单位 `ms` | `Record<string, number>`                                             |   `-`   |
| adapter  | 适配器                  | `(options:` [BrdigeAdapterOptions](#brdigeadapteroptions)`) => void` |   `-`   |
| receive  | 全局回调函数名称        | `XiaoliJSBridgeReceive`                                              |   `-`   |

### BridgeInvokeOptions<T = unknown>

| 属性名    | 描述         | 类型                           | 默认值 |
| --------- | :----------- | :----------------------------- | :----: |
| name      | 调用方法名称 | `string`                       |        |
| params    | 调用方法参数 | `any`                          |  `-`   |
| onSuccess | 成功回调     | `(data: T) => void`            |  `-`   |
| onError   | 失败回调     | `(error: BridgeError) => void` |  `-`   |

### BrdigeAdapterOptions

| 属性名     | 描述         | 类型     | 默认值 |
| ---------- | :----------- | :------- | :----: |
| callbackid | 调用方法 ID  | `string` |  `-`   |
| method     | 调用方法名称 | `string` |  `-`   |
| params     | 调用方法参数 | `any`    |  `-`   |

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
