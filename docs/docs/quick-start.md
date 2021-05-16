
## 安装

```bash
$ npm install @ai/bridge --save
# 或
$ yarn add @ai/bridge -S
```

## 使用
```tsx | pure
import React from 'react';
import { Button, Toast } from '@ai/mobile';
import Bridge from '@ai/bridge';

const bridge = new Bridge();

const Page = () => {
  const [state, setState] = useState({});

  const onClick = async () => {
    try {
      Toast.loading({ duration: 0 });
      const response = await bridge.getSystemInfo();
      setState(response);
      Toast.hide();
    } catch (error) {
      Toast.info({ content: error.message })
    }
  }
  
  return (
    <>
      <Button onPress={onClick}>获取系统信息</Button>
      <h3>响应数据<h3>
      <pre>{JSON.stringify(state)}</pre>
    </>
  );
}
```
