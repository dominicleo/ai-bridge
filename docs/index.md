---
hero:
  title: ai-bridge
  desc: ai-bridge site example
  actions:
    - text: Getting Started
      link: /components
# features:
#   - icon: https://gw.alipayobjects.com/zos/bmw-prod/881dc458-f20b-407b-947a-95104b5ec82b/k79dm8ih_w144_h144.png
#     title: Feature 1
#     desc: Balabala
#   - icon: https://gw.alipayobjects.com/zos/bmw-prod/d60657df-0822-4631-9d7c-e7a869c2f21c/k79dmz3q_w126_h126.png
#     title: Feature 2
#     desc: Balabala
#   - icon: https://gw.alipayobjects.com/zos/bmw-prod/d1ee0c6f-5aed-4a45-a507-339a4bfe076c/k7bjsocq_w144_h144.png
#     title: Feature 3
#     desc: Balabala
footer: Open-source MIT Licensed | Copyright © 2020<br />Powered by [dumi](https://d.umijs.org)
---

## 轻松上手

```tsx | pure
import Brdige from '@ai/bridge'

const bridge = new Bridge();

bridge.alert({
	title: '提示',
	content: '您有新的支付订单',
	buttonText: '我知道了',
}).then(() => {
	bridge.alert('用户点击了「我知道了」');
});
```

