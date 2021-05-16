---
title: 获取系统信息
---
# 获取系统信息

## getSystemInfo

```tsx | pure
import React from 'react';
import { Button, Toast } from '@ai/mobile';
import Bridge, { BridgeError } from '@ai/bridge';

const bridge = new Bridge();

const Page = () => {
  const [state, setState] = useState({});
  const onClick = async () => {
    try {
      const response = await bridge.getSystemInfo();
      setState(response);
    } catch(error) {
      Toast.info({ content: error.message });
    }
  }
  
  return (
    <>
      <Button type='primary' onClick={onClick}>getSystemInfo</Button>
      <h3>调试数据<h3>
      <pre>{JSON.stringify(state)}</pre>
    </>
  )
}

export default Page;
```


## GetSystemInfoResponse

| 属性名 | 描述 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| brand | 设备品牌 | `string` | - |
| model | 设备型号, 新机型刚推出一段时间会显示 `unknown` | `string` | - |
| language | 系统语言 | `string` | - |
| version | 应用版本号 | `string` | - |
| system | 操作系统及版本 | `string` | - |
| platform | 客户端平台 | `string` | - |
| fontSize | 用户字体大小, 单位 `px` | `number` | - |
| statusBarHeight | 状态栏的高度, 单位 `px` | `number` | - |
| authorized | 授权信息 | `Authorized` | - |
| theme | 系统当前主题 | `light` \| `dark` | `light` |
| debug | 是否为 Debug 模式 | `boolean` | false |
| orientation | 设备方向 | `portrait` \| `landscape` | `portrait` |

## Authorized

| 权限名 | 描述 | 类型 |
| ---- | ---- | ---- |
| album | 相册权限 | `boolean` | 
| camera | 相机权限 | `boolean` |
| location | 定位权限 | `boolean` |
| microphone | 麦克风权限 | `boolean` |
| notification | 通知权限 | `boolean` |