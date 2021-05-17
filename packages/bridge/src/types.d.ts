import { BridgeError } from '.';

export type ResolveContentOptions<O, T = string> = O | T;

export interface TrackerCallback {}

export interface EventCallback<R = unknown> {
  (response?: R): void;
}

export interface BridgeCallback extends BridgeInvokeOptions {
  timestamp: number;
  __CANCEL__?: boolean;
}

export interface BridgeCallbackResponse {
  code: number;
  message: string;
  data: Record<string, unknown>;
}

export interface BridgeOptions {
  /**
   * 调试模式
   * @default false
   */
  debug: boolean;
  /**
   * 调用超时时间, 单位 ms
   * @default 0
   */
  timeout: number;
  /** 方法调用超时时间, 单位 ms */
  timeouts: Record<string, number>;
  /** 适配器 */
  adapter?: (options: BrdigeAdapterOptions) => void;
}

export interface BridgeInvokeOptions<R = any> {
  /** 调用方法名称 */
  name: string;
  /** 调用方法参数 */
  params?: any;
  /** 成功回调 */
  onSuccess?: (response: R) => void;
  /** 失败回调 */
  onError?: (error: BridgeError) => void;
}

export interface BridgeReceiveResponse {
  callbackid: string;
  response: BridgeCallbackResponse;
}

export interface BrdigeAdapterOptions {
  callbackid: string;
  method: string;
  params: T;
}

export interface AlertOptions {
  /** 提示框标题 */
  title?: string;
  /** 提示框内容 */
  content: string;
  /**
   * 按钮文字
   * @default '确定'
   */
  buttonText?: string;
}

export interface ConfirmOptions {
  /** 确认框标题 */
  title?: string;
  /** 确认框内容 */
  content: string;
  /**
   * 确定按钮文字
   * @default '确定'
   */
  confirmButtonText?: string;
  /**
   * 取消按钮文字
   * @default '取消'
   */
  cancelButtonText?: string;
}

export interface ConfirmResponse {
  /** 点击确定按钮 */
  confirm: boolean;
  /** 点击取消按钮 */
  cancel: boolean;
}

export interface ShowToastOptions {
  /**
   * 提示类型
   * @default 'none'
   */
  type?: 'none' | 'success' | 'fail';
  /** 提示内容 */
  content: string;
  /**
   * 显示时长, 单位 ms
   * @default 2000
   */
  duration?: number;
  /**
   * 是否显示蒙层
   * @default false
   */
  mask?: boolean;
}

export interface ShowLoadingOptions {
  /** 加载提示内容 */
  content?: string;
}

export interface ShowActionSheetOptions {
  /** 菜单标题 */
  title?: string;
  /** 菜单按钮的文字数组 */
  items: string[];
  /**
   * 取消按钮文案
   * @default '取消'
   */
  cancelButtonText?: string;
}

export interface ShowActionSheetResponse {
  /** 被点击的按钮的索引, 点击取消或蒙层时返回 -1 */
  index: number;
}

export interface GetAccessTokenResponse {
  /** 用户令牌 */
  token: string | null;
}

type Authorized = {
  /** 相册权限 */
  album: boolean;
  /** 相机权限 */
  camera: boolean;
  /** 定位权限 */
  location: boolean;
  /** 麦克风权限 */
  microphone: boolean;
  /** 通知权限 */
  notification: boolean;
};

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
  /** 授权信息 */
  authorized: Authorized;
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
export interface GetLocationResponse {
  /** 纬度, 范围为 `-90` ~ `90`, 负数表示南纬 */
  latitude: number;
  /** 经度, 范围为 `-180` ~ `180`, 负数表示西经 */
  longitude: number;
  /** 速度, 单位 `m/s` */
  speed: number;
  /** 位置的精确度 */
  accuracy: number;
  /** 高度, 单位 `m` */
  altitude: number;
  /** 垂直精度, 单位 `m` */
  verticalAccuracy: number;
  /** 水平精度, 单位 `m` */
  horizontalAccuracy: number;
}

export interface LocationChangeResponse {
  /** 纬度, 范围为 `-90` ~ `90`, 负数表示南纬 */
  latitude: number;
  /** 经度, 范围为 `-180` ~ `180`, 负数表示西经 */
  longitude: number;
  /** 速度, 单位 `m/s` */
  speed: number;
  /** 位置的精确度 */
  accuracy: number;
  /** 高度, 单位 `m` */
  altitude: number;
  /** 垂直精度, 单位 `m` */
  verticalAccuracy: number;
  /** 水平精度, 单位 `m` */
  horizontalAccuracy: number;
}

export interface SetScreenBrightnessOptions {
  /** 屏幕亮度值, 范围 `0` ~ `1`, `0` 最暗, `1` 最亮 */
  value: number;
}

export interface GetScreenBrightnessResponse {
  /** 屏幕亮度值, 范围 `0` ~ `1`, `0` 最暗, `1` 最亮 */
  value: number;
}

export interface GetBatteryInfoResponse {
  /** 设备电量, 范围 1 - 100 */
  level: number;
  /** 是否正在充电中 */
  isCharging: boolean;
}

export interface GetClipboardDataResponse {
  /** 剪贴板的内容 */
  content: string;
}

export interface SetClipboardDataOptions {
  /** 剪贴板的内容 */
  content: string;
}

export interface AddPhoneCalendarOptions {
  // 日历事件标题
  title: string;
  // 开始时间的 unix 时间戳
  startTime: number;
  // 结束时间的 unix 时间戳, 默认与开始时间相同
  endTime?: string;
  /**
   * 是否全天事件
   * @default false
   */
  allDay?: boolean;
  // 事件说明
  description?: string;
  // 事件位置
  location?: string;
  /**
   * 是否提醒
   * @default true
   */
  alarm?: boolean;
  // 提醒提前量, 单位 s, 默认 0 表示开始时提醒
  alarmOffset?: number;
}

export interface AddPhoneRepeatCalendarOptions extends AddPhoneCalendarOptions {
  /** 重复周期, 默认 month 每月重复 */
  repeatInterval?: string;
  /** 重复周期结束时间的 unix 时间戳, 不填表示一直重复 */
  repeatEndTime: number;
}

type NetworkType = 'wifi' | '2g' | '3g' | '4g' | '5g' | 'unknown' | 'none';

export interface GetNetworkTypeResponse {
  /** 网络类型 */
  networkType: NetworkType;
  /** 信号强弱, 单位 dbm */
  signalStrength: number;
}

export interface NetworkStatusChangeResponse {
  /** 网络类型 */
  networkType: NetworkType;
  /** 当前是否有网络连接 */
  isConnected: boolean;
}

type ChooseMediaType = 'image' | 'video';
type ChooseMediaSource = 'album' | 'camera';

interface ChooseMediaBaseFile {
  /** 本地临时文件路径 */
  tempFilePath: string;
  /** 本地临时文件大小, 单位 b */
  size: number;
}

interface ChooseMediaImageFile extends ChooseMediaBaseFile {
  /** 文件类型 */
  type: 'image';
  /** 图片的宽度 */
  width: number;
  /** 图片的高度 */
  height: number;
}

interface ChooseMediaVideoFile extends ChooseMediaBaseFile {
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

type ChooseMediaFile = ChooseMediaImageFile | ChooseMediaVideoFile;

export interface ChooseMediaOptions {
  /**
   * 最多可以选择的文件个数
   * @default 9
   */
  count?: number;
  /**
   * 文件类型
   * - `image` 图片
   * - `video` 视频
   * @default ['image', 'video']
   */
  mediaType?: ChooseMediaType[];
  /**
   * 照片和视频选择的来源
   * @default ['album', 'camera']
   */
  sourceType?: ChooseMediaSource[];
  /**
   * 拍摄视频最长拍摄时间, 单位秒
   * @default 10
   */
  maxDuration?: number;
  /**
   * 使用前置或后置摄像头
   *
   * 仅在 sourceType 为 camera 时生效
   *
   * @default 'back'
   */
  camera?: 'back' | 'front';
}

export interface ChooseMediaResponse {
  /** 本地临时文件列表 */
  files: ChooseMediaFile[];
}

type PreviewMediaSourceImage = {
  /** 图片的地址 */
  url: string;
  /**
   * 资源的类型
   * @default 'image'
   */
  type?: 'image';
};

type PreviewMediaSourceVideo = {
  /** 视频的地址 */
  url: string;
  /** 资源的类型 */
  type?: 'video';
  /** 视频的封面图片地址 */
  poster?: string;
};

type PreviewMediaSource = PreviewMediaSourceImage | PreviewMediaSourceVideo;

export interface PreviewMediaOptions {
  /** 需要预览的资源列表 */
  sources: PreviewMediaSource[];
  /**
   * 当前显示的资源序号
   * @default 0
   */
  current?: 0;
}

export interface ScanOptions {
  /**
   * 扫描目标类型, 支持 qr / bar
   * @default 'qr'
   */
  type: 'qr' | 'bar';
}

export interface ScanResponse {
  /** 扫码所得数据 */
  code: string;
}

export interface VibrateShortOptions {
  /** 震动强度类型 */
  type: 'heavy' | 'medium' | 'light';
}

export interface SetNavigationBarOptions {
  /** 导航栏标题 */
  title?: string;
  /** 导航栏背景色 */
  backgroundColor?: string;
  /** 图片链接地址, 450 * 90 */
  backgroundImage?: string;
  /**
   * 是否重置导航栏
   * @default false
   */
  reset?: boolean;
}

export interface PushWindowOptions {
  /** 页面地址 */
  url: string;
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
}

export interface BrowserOptions {
  /** 页面地址 */
  url: string;
}

export interface CompassChangeResponse {
  /** 方向度数 */
  direction: number;
}

export interface AccelerometerChangeResponse {
  /** x 轴 */
  x: number;
  /** y 轴 */
  y: number;
  /** z 轴 */
  z: number;
}

export interface DeviceMotionChangeResponse {
  /** 当手机坐标 `x/y` 和地球 `x/y` 重合时, 绕着 `z` 轴转动的夹角为 `alpha`, 范围值为 `[0, 2 * PI)`, 逆时针转动为正 */
  alpha: number;
  /** 当手机坐标 `y/z` 和地球 `y/z` 重合时, 绕着 x 轴转动的夹角为 `beta`, 范围值为 `[-1 * PI, PI) `, 顶部朝着地球表面转动为正, 也有可能朝着用户为正 */
  beta: number;
  /** 当手机 `x/z` 和地球 `x/z` 重合时, 绕着 Y 轴转动的夹角为 `gamma`, 范围值为 `[-1 * PI / 2, PI / 2)`, 右边朝着地球表面转动为正 */
  gamma: number;
}

export interface GyroscopeChangeResponse {
  /** x 轴的角速度 */
  x: number;
  /** y 轴的角速度 */
  y: number;
  /** z 轴的角速度 */
  z: number;
}

export interface ResumeResponse<T = Record<string, unknown>> {
  /** 通过 `popWindow` 传递的 `data` 参数 */
  data: T;
}

export interface PageResumeResponse<T = Record<string, unknown>> {
  /** 通过 `popWindow` 传递的 `data` 参数 */
  data: T;
}
