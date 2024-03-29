---
title: getDeviceInfo 获取设备信息
---

# getDeviceInfo

获取设备信息

<code src="./demo/getDeviceInfo.tsx" hidden />

```tsx | pure
import Bridge from '@ai/birdge';

const bridge = new Bridge();

bridge.getDeviceInfo().then((response) => {
  console.log(response);
});
```

`bridge.getDeviceInfo: () => Promise<GetDeviceInfoResponse>`

## GetDeviceInfoResponse

| 属性名 | 描述                     | 类型     | 默认值 |
| ------ | ------------------------ | -------- | ------ |
| imei   | 设备的国际移动设备身份码 | `string` | -      |
| imsi   | 设备的国际移动用户识别码 | `string` | -      |
| model  | 设备的型号               | `string` | -      |
| vendor | 设备的生产厂商           | `string` | -      |
| uuid   | 设备的唯一标识           | `string` | -      |
