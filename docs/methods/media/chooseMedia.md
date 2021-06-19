---
title: chooseMedia 选取视频或照片
---

# chooseMedia

拍摄或从相册选取视频或照片

<code src="./demo/chooseMedia.tsx" hidden />

```tsx | pure
import Bridge from '@ai/birdge';

const bridge = new Bridge();

// 选择图片和视频
bridge.chooseMedia().then(({ files }) => {
  files.forEach((file) => {
    console.log(file.type);
    console.log(file.tempFilePath);
  });
});

// 选择图片
bridge.chooseMedia({
  mediaType: ['image'],
});

// 选择视频
bridge.chooseMedia({
  mediaType: ['video'],
});
```

`bridge.chooseMedia: (options: ChooseMediaOptions) => Promise<ChooseMediaResponse>`

## ChooseMediaOptions

| 属性名      | 描述                                                                       | 类型                       | 默认值  |
| ----------- | -------------------------------------------------------------------------- | -------------------------- | ------- |
| count       | 最多可以选择的数量                                                         | `number`                   | `9`     |
| mediaType   | 文件类型                                                                   | `image` \|`video` \| `all` |
| compressed  | 是否压缩所选文件, 所选的图片的尺寸<br />仅对 `mediaType` 为 `image` 时有效 | `boolean`                  | `false` |
| sourceType  | 选择来源                                                                   | `album` \| `camera`        | `album` |
| camera      | 使用前置或后置摄像头<br /> 仅在 `sourceType` 为 camera 时生效              | `front` \| `back`          | `back`  |
| maxDuration | 拍摄视频最长拍摄时间, 时间范围为 `3s` 至 `60s` 之间, 单位秒                | `number`                   | `10`    |

## ChooseMediaResponse

| 属性名 | 描述             | 类型                                                                                                                                                     |
| ------ | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| files  | 本地临时文件列表 | [ChooseMediaImageFile](#choosemediaimagefile-extends-choosemediabasefile) \| [ChooseMediaVideoFile](#choosemediavideofile-extends-choosemediabasefile)[] |

#### ChooseMediaBaseFile

| 属性名       | 描述                       | 类型               |
| ------------ | -------------------------- | ------------------ |
| type         | 文件类型                   | `image` \| `video` |
| tempFilePath | 本地临时文件路径           | `string`           |
| size         | 本地临时文件大小, 单位 `b` | `number`           |

#### ChooseMediaImageFile extends ChooseMediaBaseFile

| 属性名 | 描述       | 类型     |
| ------ | ---------- | -------- |
| width  | 图片的宽度 | `number` |
| height | 图片的高度 | `number` |

#### ChooseMediaVideoFile extends ChooseMediaBaseFile

| 属性名            | 描述                       | 类型     |
| ----------------- | -------------------------- | -------- |
| width             | 视频的宽度                 | `number` |
| height            | 视频的高度                 | `number` |
| duration          | 视频的时间长度             | `number` |
| thumbTempFilePath | 视频的封面图片临时文件路径 | `string` |
