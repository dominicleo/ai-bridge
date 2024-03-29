---
title: getSystemInfo 获取系统信息
---

# getSystemInfo

获取系统信息

<code src="./demo/getSystemInfo.tsx" hidden />

```tsx | pure
import Bridge from '@ai/birdge';

const bridge = new Bridge();

bridge.getSystemInfo().then((response) => {
  console.log(response);
});
```

`bridge.getSystemInfo: () => Promise<GetSystemInfoResponse>`

## GetSystemInfoResponse

| 属性名              | 描述                                           | 类型                      | 默认值     |
| ------------------- | ---------------------------------------------- | ------------------------- | ---------- |
| brand               | 设备品牌                                       | `string`                  | `-`        |
| model               | 设备型号, 新机型刚推出一段时间会显示 `unknown` | `string`                  | `-`        |
| language            | 系统语言                                       | `string`                  | `-`        |
| version             | 应用版本号                                     | `string`                  | `-`        |
| system              | 操作系统及版本                                 | `string`                  | `-`        |
| platform            | 客户端平台                                     | `string`                  | `-`        |
| fontSize            | 用户字体大小, 单位 `px`                        | `number`                  | `-`        |
| statusBarHeight     | 状态栏的高度, 单位 `px`                        | `number`                  | `-`        |
| navigationBarHeight | 导航栏高度, 单位 `px`                          | `number`                  | `-`        |
| theme               | 系统当前主题                                   | `light` \| `dark`         | `light`    |
| debug               | 是否为 Debug 模式                              | `boolean`                 | `false`    |
| orientation         | 设备方向                                       | `portrait` \| `landscape` | `portrait` |
| systemCode          | 系统识别码                                     | `string`                  | `-`        |
| channelCode         | 渠道 CODE                                      | `string`                  | `-`        |
| channelKey          | 渠道 KEY                                       | `string`                  | `-`        |
