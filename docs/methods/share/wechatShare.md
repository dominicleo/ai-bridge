---
title: wechatShare 微信分享
---

# wechatShare

微信分享

<code src="./demo/wechatShare.tsx" hidden />

```tsx | pure
import Bridge from '@ai/birdge';

const bridge = new Bridge();

bridge.wechatShare({
  type: 'url',
  webpageUrl: 'https://m.zhangmen.com',
});

bridge.wechatShare({
  type: 'image',
  imageData: 'https://data.zmlern.cn/example.png',
});

bridge.wechatShare({
  type: 'video',
  videoUrl: 'https://data.zmlern.cn/example.mp4',
});
```

`bridge.wechatShare: (options: WechatShareOptions) => Promise<void>`

## WechatShareOptions

| 属性名      | 描述                                     | 类型                       | 默认值    |
| ----------- | ---------------------------------------- | -------------------------- | --------- |
| type        | 分享类型                                 | `url` \| `image`\| `video` | `(必选)`  |
| scene       | 分享场景                                 | `session` \| `timeline`    | `session` |
| title       | 消息标题                                 | `string`                   | `-`       |
| description | 描述内容                                 | `string`                   | `-`       |
| thumbData   | 缩略图的二进制数据                       | `string`                   | `-`       |
| thumbUrl    | 缩略图的链接地址, 优先级高于 `thumbData` | `string`                   | `-`       |

#### WechatShareWebpageOptions extends WechatShareOptions

| 属性名     | 描述                            | 类型     | 默认值   |
| ---------- | ------------------------------- | -------- | -------- |
| webpageUrl | 网页链接, 限制长度不超过 `10KB` | `string` | `(必选)` |

#### WechatShareTextOptions extends WechatShareOptions

| 属性名 | 描述               | 类型     | 默认值   |
| ------ | ------------------ | -------- | -------- |
| text   | 发送消息的文本内容 | `string` | `(必选)` |

#### WechatShareImageDataOptions extends WechatShareOptions

| 属性名    | 描述                                    | 类型     | 默认值 |
| --------- | --------------------------------------- | -------- | ------ |
| imageData | 图片的二进制数据, 内容大小不超过 `10MB` | `string` | `-`    |
| imageUrl  | 图片链接地址, 优先级高于 `imageData`    | `string` | `-`    |

#### WechatShareVideoOptions extends WechatShareOptions

| 属性名   | 描述                            | 类型     | 默认值   |
| -------- | ------------------------------- | -------- | -------- |
| videoUrl | 视频链接, 限制长度不超过 `10KB` | `string` | `(必选)` |

<!--
#### WechatShareMiniProgramOptions extends WechatShareOptions

| 属性名          | 描述                                                                                               | 类型                             | 默认值    |
| --------------- | -------------------------------------------------------------------------------------------------- | -------------------------------- | --------- |
| path            | 小程序的页面路径<br />对于小游戏, 可以只传入 `query` 部分, 来实现传参效果<br />如：传入 `?foo=bar` | `string`                         | `(必选)`  |
| hdImageData     | 小程序新版本的预览图二进制数据<br />限制大小不超过 `128KB`, 自定义图片建议长宽比是 `5:4`           | `string`                         | `-`       |
| hdImageUrl      | 小程序新版本的预览图链接地址, 优先级高于 `hdImageData`                                             | `string`                         | `-`       |
| withShareTicket | 是否使用带 `shareTicket` 的分享                                                                    | `string`                         | `-`       |
| miniprogramType | 小程序环境类型                                                                                     | `release` \| `test` \| `preview` | `release` | -->
