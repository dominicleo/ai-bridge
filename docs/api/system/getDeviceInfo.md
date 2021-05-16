---
title: 获取设备信息
---
# 获取设备信息

## getDeviceInfo

```tsx | pure
import React from 'react';
import { Button, Toast } from '@ai/mobile';
import Bridge, { BridgeError } from '@ai/bridge';

const bridge = new Bridge();

const Page = () => {
  const [state, setState] = useState({});
  const onClick = async () => {
    try {
      const response = await bridge.getDeviceInfo();
      setState(response);
    } catch(error) {
      Toast.info({ content: error.message });
    }
  }
  
  return (
    <>
      <Button type='primary' onClick={onClick}>getDeviceInfo</Button>
      <h3>调试数据<h3>
      <pre>{JSON.stringify(state)}</pre>
    </>
  )
}

export default Page;
```


## GetDeviceInfoResponse

| 属性名 | 描述 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| imei | 设备的国际移动设备身份码 | `string` | - |
| imsi | 设备的国际移动用户识别码 | `string` | - |
| model | 设备的型号 | `string` | - |
| vendor | 设备的生产厂商 | `string` | - |
| uuid | 设备的唯一标识 | `string` | - |

