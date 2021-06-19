---
title: getAccessToken 获取用户令牌
---

# getAccessToken

获取用户令牌

<code src="./demo/getAccessToken.tsx" hidden />

```tsx | pure
import Bridge from '@ai/birdge';

const bridge = new Bridge();

bridge.getAccessToken().then(({ token }) => {
  console.log(token);
});
```

`bridge.getAccessToken: () => Promise<GetAccessTokenResponse>`

## GetAccessTokenResponse

| 属性名 | 描述     | 类型               | 默认值 |
| ------ | -------- | ------------------ | ------ |
| token  | 用户令牌 | `string` \| `null` | `null` |
