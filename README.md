# 小狸启蒙 JSBridge

丰富的原生 API 媲美原生应用的体验

## 安装依赖

```bash
$ npm i @ai/bridge
# or
$ yarn add @ai/bridge
```

**注意：安装依赖前需要切换至公司镜像**

`http://npm.zmops.cc/`

使用 [nrm](https://github.com/Pana/nrm) 管理 npm 镜像地址

## 快速开始

初始化 Bridge 实例

```tsx
import Bridge, { BridgeError, BridgeAdapterOptions } from '@ai/bridge';

// 获取 Bridge 版本
console.log(Bridge.version);

const bridge = new Bridge({
  // 调试模式
  debug: true,
});

// 获取用户令牌
bridge.getAccessToken().then(({ token }) => {
  console.log(token);
});

// 数据打点
bridge.tracker((type, data) => {
  console.log(type, data);
});

// 自定义调用方法
bridge.invoke('custom', null, (data) => {
  console.log(data);
});

// 自定义调用方法 (异步)
bridge.invokeAsync('custom', null).then((data) => {
  console.log(data);
});

// 自定义适配器
function adapter(options: BridgeAdapterOptions) {
  if (typeof global?.XiaoliJSBridge?.postMessage === 'function') {
    global.XiaoliJSBridge.postMessage(JSON.stringify(options));
    return;
  }

  throw new BridgeError('Bridge 未支持', Bridge.UNSUPPORTED);
}

// 更新配置
bridge.setConfig({
  debug: false,
  timeouts: {
    custom: 1000,
  },
});
```

## 参数

### BridgeOptions

| 属性名   | 描述                    | 类型                                            | 默认值  |
| -------- | :---------------------- | :---------------------------------------------- | :-----: |
| debug    | 是否开启调试模式        | `boolean`                                       | `false` |
| timeout  | 全局超时设置, 单位 `ms` | `number`                                        |   `0`   |
| timeouts | 方法超时设置, 单位 ms   | `Record<string, number>`                        |   `-`   |
| adapter  | 适配器                  | `(options:` [BrdigeAdapterOptions]()`) => void` |   `-`   |
| receive  | 全局回调函数名称        | `XiaoliJSBridgeReceive`                         |   `-`   |

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
