---
title: logout 退出登录
---

# logout

退出登录

<code src="./demo/logout.tsx" hidden />

```tsx | pure
import Bridge from '@ai/birdge';

const bridge = new Bridge();

bridge.logout().then(() => {
  console.log('成功退出登录');
});
```
