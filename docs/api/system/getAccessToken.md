---
title: 获取用户令牌
order: 0
---
# 获取用户令牌

## getAccessToken

```tsx | pure
import React from 'react';
import { Button, Toast } from '@ai/mobile';
import Bridge, { BridgeError } from '@ai/bridge';

const bridge = new Bridge();

const Page = () => {
  const [state, setState] = useState({});
  const onClick = async () => {
    try {
      const response = await bridge.getAccessToken();
      setState(response);
    } catch(error) {
      Toast.info({ content: error.message });
    }
  }
  
  return (
    <>
      <Button type='primary' onClick={onClick}>getAccessToken</Button>
      <h3>调试数据<h3>
      <pre>{JSON.stringify(state)}</pre>
    </>
  )
}

export default Page;
```


## GetAccessTokenResponse

| 属性名 | 描述 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| token | 用户令牌 | `string` \| `null` | `null` |
