export type ResolveOptions<O, T = string> = O | T;

export interface BridgeOptions {
  /** 开启调试模式 */
  debug?: boolean;
  /**
   * 全局超时设置, 单位 ms
   * @default 0
   */
  timeout: number;
  /** 方法超时设置, 单位 ms */
  timeouts: Record<string, number>;
  /** 适配器 */
  adapter: (options: BrdigeAdapterOptions) => void;
  /**
   * 全局回调函数名称
   * @default XiaoliJSBridgeReceive
   */
  receive: string;
}

export interface BridgeInvokeOptions<R = unknown> {
  /** 调用方法名称 */
  name: string;
  /** 调用方法参数 */
  params?: any;
  /** 成功回调 */
  onSuccess?: (data: R) => void;
  /** 失败回调 */
  onError?: (error: BridgeError) => void;
}

export type BridgeInvokeAsyncOptions = Omit<BridgeInvokeOptions<R>, 'onSccuess' | 'onError'>;

export interface BridgeCallbackOptions extends BridgeInvokeOptions {
  createdAt: number;
  updatedAt: number;
  __CANCEL__?: boolean;
}

export interface BridgeReceiveResponse {
  callbackid: string;
  response: BridgeCallbackResponse;
}

export interface BrdigeAdapterOptions {
  callbackid: string;
  method: string;
  params: object;
}

export interface GetAccessTokenResponse {
  /** 用户令牌 */
  token: string | null;
}

export interface GetSystemInfoResponse {
  /** 设备品牌 */
  brand: string;
  /** 设备型号, 新机型刚推出一段时间会显示 'unknown' */
  model: string;
  /** 系统语言 */
  language: string;
  /** 应用版本号 */
  version: string;
  /** 操作系统及版本 */
  system: string;
  /** 客户端平台 */
  platform: string;
  /** 用户字体大小, 单位 `px` */
  fontSize: number;
  /** 状态栏的高度, 单位 `px` */
  statusBarHeight: number;
  /** 导航栏高度, 单位 `px` */
  navigationBarHeight: number;
  /** 系统当前主题 */
  theme: 'light' | 'dark';
  /** 是否为 Debug 模式 */
  debug: boolean;
  /**
   * 设备方向
   * - `portrait` 竖屏
   * - `landscape` 横屏
   */
  orientation: 'portrait' | 'landscape';
  /** 系统识别码 */
  systemCode: string;
  /** 渠道 CODE */
  channelCode: string;
  /** 渠道 KEY */
  channelKey: string;
}

export interface GetDeviceInfoResponse {
  /** 设备的国际移动设备身份码 */
  imei: string;
  /** 设备的国际移动用户识别码 */
  imsi: string;
  /** 设备的型号 */
  model: string;
  /** 设备的生产厂商 */
  vendor: string;
  /** 设备的唯一标识 */
  uuid: string;
}

export interface PushWindowOptions {
  /** 页面地址 */
  url: string;
  /** 导航栏样式 */
  navigationStyle: 'custom';
}

export interface PopWindowOptions {
  /**
   * 返回的页面数, 如果 delta 大于现有页面数, 则返回到首页
   * @default 1
   */
  delta?: number;
  /** 对象将会被即将露出的页面通过 onResume 事件接收 */
  data?: object;
}

export interface RedirectToOptions {
  /** 页面地址 */
  url: string;
  /** 导航栏样式 */
  navigationStyle?: 'custom';
}

export interface BrowserOptions {
  /** 页面地址 */
  url: string;
}

export interface WechatShareBaseOptions {
  /**
   * 分享场景
   * @default session
   */
  scene?: 'session' | 'timeline';
  /** 消息标题 */
  title?: string;
  /** 描述内容 */
  description?: string;
  /** 缩略图的二进制数据 */
  thumbData?: string;
}

export interface WechatShareWebpageOptions extends WechatShareBaseOptions {
  /** 分享链接 */
  type: 'url';
  /** 网页链接, 限制长度不超过 `10KB` */
  webpageUrl: string;
}

// export interface WechatShareTextOptions extends WechatShareBaseOptions {
//   /** 分享文本 */
//   type: 'text';
//   /** 发送消息的文本内容 */
//   text: string;
// }

export interface WechatShareImageDataOptions extends WechatShareBaseOptions {
  /** 分享图片 */
  type: 'image';
  /** 图片的二进制数据, 内容大小不超过 `10MB` */
  imageData: string;
}

export interface WechatShareImageURLOptions extends WechatShareBaseOptions {
  /** 分享图片 */
  type: 'image';
  /** 图片链接, 优先级高于 `imageData` */
  imageUrl: string;
}

export interface WechatShareVideoOptions extends WechatShareBaseOptions {
  /** 分享视频 */
  type: 'video';
  /** 视频链接, 限制长度不超过 `10KB` */
  videoUrl: string;
}

// export interface WechatShareMiniProgramBaseOptions extends WechatShareBaseOptions {
//   /** 分享小程序 */
//   type: 'miniprogram';
//   /** 小程序的页面路径 (对于小游戏, 可以只传入 `query` 部分, 来实现传参效果, 如：传入 "?foo=bar") */
//   path: string;
//   /** 是否使用带 `shareTicket` 的分享 */
//   withShareTicket?: boolean;
//   /**
//    * 小程序环境类型
//    * @default release
//    */
//   miniprogramType?: 'release' | 'test' | 'preview';
// }

export interface WechatShareMiniProgramImageDataOptions extends WechatShareMiniProgramBaseOptions {
  /** 小程序新版本的预览图二进制数据, 限制大小不超过 `128KB`, 自定义图片建议长宽比是 `5:4` */
  hdImageData?: string;
}
export interface WechatShareMiniProgramImageURLOptions extends WechatShareMiniProgramBaseOptions {
  /** 小程序新版本的预览图链接地址, 优先级高于 `hdImageData` */
  hdImageUrl?: string;
}

export type WechatShareOptions =
  // | WechatShareTextOptions
  | WechatShareWebpageOptions
  | WechatShareImageDataOptions
  | WechatShareImageURLOptions
  | WechatShareVideoOptions;
// | WechatShareMiniProgramImageDataOptions
// | WechatShareMiniProgramImageURLOptions;

export type ChooseMediaMediaType = 'image' | 'video' | 'all';
export type ChooseMediaSourceType = 'album' | 'camera';
export type ChooseMediaCamera = 'front' | 'back';

export interface ChooseMediaOptions {
  /**
   * 最多可以选择的数量
   * @default 9
   */
  count?: number;
  /**
   * 文件类型
   * - `image` 只能拍摄图片或从相册选择图片
   * - `video` 只能拍摄视频或从相册选择视频
   * - `all` 照片或视频
   */
  mediaType: ChooseMediaMediaType;
  /**
   * 所选的图片的尺寸, 仅对 `mediaType` 为 `image` 时有效, 是否压缩所选文件
   * @default false
   */
  compressed?: boolean;
  /**
   * 选择来源
   * - `album` 从相册选择
   * - `camera` 使用相机拍摄
   * @default album
   */
  sourceType?: ChooseMediaSourceType;
  /**
   * 拍摄视频最长拍摄时间, 时间范围为 `3s` 至 `60s` 之间, 单位秒
   * @default 10
   */
  maxDuration?: number;
  /**
   * 使用前置或后置摄像头, 仅在 `sourceType` 为 camera 时生效
   * @default back
   */
  camera?: ChooseMediaCamera;
}

export interface ChooseMediaBaseFile {
  /** 本地临时文件路径 */
  tempFilePath: string;
  /** 本地临时文件大小, 单位 b */
  size: number;
}

export interface ChooseMediaImageFile extends ChooseMediaBaseFile {
  /** 文件类型 */
  type: 'image';
  /** 图片的宽度 */
  width: number;
  /** 图片的高度 */
  height: number;
}

export interface ChooseMediaVideoFile extends ChooseMediaBaseFile {
  /** 文件类型 */
  type: 'video';
  /** 视频的宽度 */
  width: number;
  /** 视频的高度 */
  height: number;
  /** 视频的时间长度 */
  duration: number;
  /** 视频的封面图片临时文件路径 */
  thumbTempFilePath: string;
}

export type ChooseMediaFile = ChooseMediaImageFile | ChooseMediaVideoFile;

export interface ChooseMediaResponse {
  /** 本地临时文件列表 */
  files: ChooseMediaFile[];
}
