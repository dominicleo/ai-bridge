import { CANCEL_TEXT, CONFIRM_TEXT } from './constants';
import {
  AccelerometerChangeResponse,
  AddPhoneCalendarOptions,
  AddPhoneRepeatCalendarOptions,
  AlertOptions,
  BridgeCallback,
  BridgeInvokeOptions,
  BridgeOptions,
  BridgeReceiveResponse,
  BrowserOptions,
  ChooseMediaOptions,
  ChooseMediaResponse,
  CompassChangeResponse,
  ConfirmOptions,
  ConfirmResponse,
  DeviceMotionChangeResponse,
  EventCallback,
  GetAccessTokenResponse,
  GetBatteryInfoResponse,
  GetClipboardDataResponse,
  GetDeviceInfoResponse,
  GetLocationResponse,
  GetNetworkTypeResponse,
  GetScreenBrightnessResponse,
  GetSystemInfoResponse,
  GyroscopeChangeResponse,
  NetworkStatusChangeResponse,
  PageResumeResponse,
  PopWindowOptions,
  PreviewMediaOptions,
  PushWindowOptions,
  RedirectToOptions,
  ResolveContentOptions,
  ResumeResponse,
  ScanOptions,
  ScanResponse,
  SetClipboardDataOptions,
  SetNavigationBarOptions,
  SetScreenBrightnessOptions,
  ShowActionSheetOptions,
  ShowActionSheetResponse,
  ShowLoadingOptions,
  ShowLoadingResponse,
  ShowToastOptions,
  ShowToastResponse,
  VibrateShortOptions,
} from './types';
import {
  canUseWindow,
  isFunction,
  isPlainObject,
  JSONParse,
  resolveContent,
  resolveOptions,
} from './utils';
class Bridge {
  /** 调用成功 */
  static readonly SUCCESS: 0;
  /** 无效的方法 */
  static readonly INVALID: 10000;
  /** 方法执行超时 */
  static readonly TIMEOUT: 10001;
  /** Bridge 未支持 */
  static readonly NOT_SUPPORT: 10002;
  /** 方法被禁用 */
  static readonly BAN: 10003;
  /** 方法执行异常 */
  static readonly ERROR: 10005;
  /** 未授权 */
  static readonly NOT_PERMISSION = 10006;
  /** 回调事件不存在 */
  static readonly CALLBACK_EVENT_DOES_NOT_EXIST = 10007;

  /** Bridge 版本号 */
  // @ts-ignore
  static readonly version = __VERSION__;
  protected uniqueId = 0;
  protected options: BridgeOptions;
  protected trackers = new Set();
  protected callbacks = new Map<string, BridgeCallback>();
  protected timer = new Map<string, NodeJS.Timeout>();
  constructor(options?: Partial<BridgeOptions>) {
    this.options = resolveOptions(options, { timeout: 0, timeouts: {} });
    this.init();
  }
  protected init() {
    if (!canUseWindow) return;
    // @ts-ignore
    global.XIAOLI_JSBRIDGE_RECEIVE = global.XiaoliJsbridgeReceive = this.receive;
  }
  protected getUniqueId(name: string) {
    const random = Math.random().toString(36).slice(-8);
    return [name, random, Date.now(), ++this.uniqueId].join('_');
  }
  protected clearTimeout(callbackid: string) {
    const timer = this.timer.get(callbackid);
    timer && clearTimeout(timer);
    this.timer.delete(callbackid);
  }
  protected logger(...messages: string[]) {
    if (!this.options.debug) return;
    const [message, ...args] = messages;
    console.log(`[Bridge] ${message}`, ...args);
  }
  /** 适配器 */
  protected adapter(options) {
    if (!canUseWindow) return;
    if (isFunction(this.options.adapter)) {
      this.options.adapter(options);
      return;
    }
    // @ts-ignore
    if (!isFunction(global?.XiaoLiJSBridge?.postMessage)) {
      // @ts-ignore
      global?.XiaoLiJSBridge?.postMessage(options);
      return;
    }
    throw new BridgeError('Bridge 未支持', Bridge.NOT_SUPPORT);
  }
  /** 调用方法 */
  invoke<R = unknown>({ name, params, onSuccess, onError }: BridgeInvokeOptions<R>) {
    if (!name) throw new BridgeError('请确认方法名称.', Bridge.INVALID);
    const callbackid = this.getUniqueId(name);

    const callback = (response) => {
      this.clearTimeout(callbackid);

      if (response.code === Bridge.SUCCESS) {
        isFunction(onSuccess) && onSuccess(response.data);
        return;
      }

      const error = new BridgeError(response.message, response.code);

      if (isFunction(onError)) {
        onError(error);
        return;
      }

      throw error;
    };

    this.callbacks.set(callbackid, {
      name,
      params,
      callback,
      timestamp: Date.now(),
    });

    const timeout = this.options.timeouts[name] || this.options.timeout;

    if (timeout > 0) {
      this.timer.set(
        callbackid,
        setTimeout(() => {
          this.callbacks.delete(callbackid);
          throw new BridgeError(`'${name}' 响应超时`, Bridge.TIMEOUT);
        }, timeout),
      );
    }

    this.adapter({ callbackid, method: name, params });
  }
  invokeAsync<R = any>(options: BridgeInvokeOptions<R>) {
    return new Promise<R>((resolve, reject) => {
      const { onSuccess, onError, ...args } = options;
      this.invoke<R>({
        ...args,
        onSuccess: (response: R) => {
          isFunction(onSuccess) && onSuccess(response);
          resolve(response);
        },
        onError: (error: BridgeError) => {
          isFunction(onError) && onError(error);
          reject(error);
        },
      });
    });
  }
  /** 接收回调 */
  receive(data: unknown) {
    const { callbackid, response } = JSONParse<BridgeReceiveResponse>(data);
    const task = this.callbacks.get(callbackid);
    if (!task)
      throw new BridgeError(`回调事件不存在 ${callbackid}`, Bridge.CALLBACK_EVENT_DOES_NOT_EXIST);

    if (task.__CANCEL__) return this.logger('事件已被取消监听', task.name);

    task.callback(response);
  }

  off(name: string, callback: EventCallback) {
    if (!callback) throw new BridgeError('', 10008);
    this.callbacks.forEach((value, key) => {
      if (value.name === name && value.params?.callback === callback) {
        this.callbacks.set(key, { ...value, __CANCEL__: true });
      }
    });
  }
  tracker(callback) {
    this.trackers.add(callback);
  }
  /** 显示提示框 */
  alert(options: ResolveContentOptions<AlertOptions>) {
    return this.invokeAsync({
      name: 'alert',
      params: resolveContent(options, { buttonText: CONFIRM_TEXT }),
    });
  }
  /** 显示确认框 */
  confirm(options: ResolveContentOptions<ConfirmOptions>) {
    return this.invokeAsync<ConfirmResponse>({
      name: 'confirm',
      params: resolveContent(options, {
        confirmButtonText: CONFIRM_TEXT,
        cancelButtonText: CANCEL_TEXT,
      }),
    });
  }
  /** 显示提示 */
  showToast(options: ResolveContentOptions<ShowToastOptions>) {
    const { onClose, ...params } = resolveContent(options, { type: 'none', duration: 2000 });
    return this.invokeAsync<ShowToastResponse>({
      name: 'showToast',
      params,
      onSuccess(response) {
        if (response.close) {
          isFunction(onClose) && onClose();
        }
      },
    });
  }
  /** 隐藏提示 */
  hideToast() {
    return this.invokeAsync({ name: 'hideToast' });
  }
  /** 显示加载提示 */
  showLoading(options: ResolveContentOptions<ShowLoadingOptions>) {
    const { onClose, ...params } = resolveContent(options);
    return this.invokeAsync<ShowLoadingResponse>({
      name: 'showLoading',
      params,
      onSuccess(response) {
        if (response.close) {
          isFunction(onClose) && onClose();
        }
      },
    });
  }
  /** 隐藏加载提示 */
  hideLoading() {
    return this.invokeAsync({ name: 'hideLoading' });
  }
  /** 显示操作菜单 */
  showActionSheet(options: ShowActionSheetOptions) {
    return this.invokeAsync<ShowActionSheetResponse>({
      name: 'showActionSheet',
      params: resolveOptions(options, {
        cancelButtonText: CANCEL_TEXT,
      }),
    });
  }
  /** 获取用户令牌 */
  getAccessToken() {
    return this.invokeAsync<GetAccessTokenResponse>({ name: 'getAccessToken' });
  }
  /** 获取系统信息 */
  getSystemInfo() {
    return this.invokeAsync<GetSystemInfoResponse>({ name: 'getSystemInfo' });
  }
  /** 获取设备信息 */
  getDeviceInfo() {
    return this.invokeAsync<GetDeviceInfoResponse>({ name: 'getDeviceInfo' });
  }
  /** 获取地理位置信息 */
  getLocation() {
    return this.invokeAsync<GetLocationResponse>({ name: 'getLocation' });
  }
  /** 获取当前网络状态 */
  getNetworkType() {
    return this.invokeAsync<GetNetworkTypeResponse>({ name: 'getNetworkType' });
  }
  /** 获取屏幕亮度 */
  getScreenBrightness() {
    return this.invokeAsync<GetScreenBrightnessResponse>({ name: 'getScreenBrightness' });
  }
  /** 设置屏幕亮度 */
  setScreenBrightness(options: ResolveContentOptions<SetScreenBrightnessOptions, number>) {
    const params = resolveContent(options, {}, 'value');
    return this.invokeAsync<SetScreenBrightnessOptions>({ name: 'setScreenBrightness', params });
  }
  /** 获取设备电量 */
  getBatteryInfo() {
    return this.invokeAsync<GetBatteryInfoResponse>({ name: 'getBatteryInfo' });
  }
  /** 获取剪切板内容 */
  getClipboardData() {
    return this.invokeAsync<GetClipboardDataResponse>({ name: 'getClipboardData' });
  }
  /** 设置剪切板内容 */
  setClipboardData(options: ResolveContentOptions<SetClipboardDataOptions>) {
    const params = resolveContent(options);
    return this.invokeAsync({ name: 'getClipboardData', params });
  }
  /** 设置竖屏 */
  setPortrait() {
    return this.invokeAsync({ name: 'setPortrait' });
  }
  /** 设置横屏 */
  setLandscape() {
    return this.invokeAsync({ name: 'setLandscape' });
  }
  /** 向系统日历添加事件 */
  addPhoneCalendar(options: AddPhoneCalendarOptions) {
    const params = resolveOptions(options, { allDay: false, alarm: true });
    return this.invokeAsync({ name: 'addPhoneCalendar', params });
  }
  /** 向系统日历添加重复事件 */
  addPhoneRepeatCalendar(options: AddPhoneRepeatCalendarOptions) {
    const params = resolveOptions(options, { allDay: false, alarm: true, repeatInterval: 'month' });
    return this.invokeAsync({ name: 'addPhoneCalendar', params });
  }
  /** 拍摄或从手机相册中选择图片或视频 */
  chooseMedia(options: ChooseMediaOptions) {
    return this.invokeAsync<ChooseMediaResponse>({
      name: 'chooseMedia',
      params: resolveOptions(options, {
        mediaType: ['image', 'video'],
        sourceType: ['album', 'camera'],
        maxDuration: 10,
        camera: 'back',
      }),
    });
  }
  /** 预览图片和视频 */
  previewMedia(options: PreviewMediaOptions) {
    return this.invokeAsync({
      name: 'previewMedia',
      params: resolveOptions(options, { current: 0 }),
    });
  }
  /** 扫一扫 */
  scan(options: ScanOptions) {
    return this.invokeAsync<ScanResponse>({
      name: 'scan',
      params: resolveOptions(options, { type: 'qr' }),
    });
  }
  /** 设置权限 (跳转到应用权限设置页面) */
  setPermission() {
    return this.invokeAsync({ name: 'setPermission' });
  }
  /** 摇一摇功能, 在摇一摇手机后触发回调后需再次调用 */
  watchShake() {
    return this.invokeAsync({ name: 'watchShake' });
  }
  /** 使手机发生较短时间的振动 15ms */
  vibrateShort(options: VibrateShortOptions) {
    return this.invokeAsync({ name: 'vibrateShort', params: options });
  }
  /** 使手机发生较短时间的振动 400ms */
  vibrateLong() {
    return this.invokeAsync({ name: 'vibrateLong' });
  }
  /** 设置导航栏标题及样式 */
  setNavigationBar(options: SetNavigationBarOptions) {
    return this.invokeAsync({ name: 'setNavigationBar', params: options });
  }
  /** 打开一个新的页面 */
  pushWindow(options: ResolveContentOptions<PushWindowOptions>) {
    const params = resolveContent(options, {}, 'url');
    return this.invokeAsync({ name: 'pushWindow', params });
  }
  /** 关闭当前页面 */
  popWindow(options: ResolveContentOptions<PopWindowOptions, object>) {
    const params = resolveContent(options, { delta: 1 }, 'data', isPlainObject);
    return this.invokeAsync({ name: 'popWindow', params });
  }
  /** 替换当前页面, 不会产生历史记录 */
  redirectTo(options: ResolveContentOptions<RedirectToOptions>) {
    const params = resolveContent(options, {}, 'url');
    return this.invokeAsync({ name: 'redirectTo', params });
  }
  /** 使用默认浏览器打开地址 */
  browser(options: ResolveContentOptions<BrowserOptions>) {
    const params = resolveContent(options, {}, 'url');
    return this.invokeAsync({ name: 'browser', params });
  }
  /** 监听导航栏标题点击事件 */
  onTitleClick(callback: EventCallback) {
    return this.invoke({
      name: 'onTitleClick',
      onSuccess: callback,
    });
  }
  /** 移除导航栏标题点击事件的监听 */
  offTitleClick(callback: EventCallback) {
    this.off('onTitleClick', callback);
  }
  /** 监听罗盘数据变化的事件 */
  onCompassChange<R = CompassChangeResponse>(callback: EventCallback<R>) {
    return this.invoke<R>({
      name: 'onCompassChange',
      onSuccess: callback,
    });
  }
  /** 移除罗盘数据变化事件的监听 */
  offCompassChange<R = CompassChangeResponse>(callback: EventCallback<R>) {
    this.off('onCompassChange', callback);
  }

  /** 监听加速度数据变化 */
  onAccelerometerChange<R = AccelerometerChangeResponse>(callback: EventCallback<R>) {
    return this.invoke<R>({
      name: 'onAccelerometerChange',
      onSuccess: callback,
    });
  }
  /** 移除加速度数据变化事件的监听 */
  offAccelerometerChange<R = AccelerometerChangeResponse>(callback: EventCallback<R>) {
    this.off('onAccelerometerChange', callback);
  }
  /** 监听设备方向变化 */
  onDeviceMotionChange<R = DeviceMotionChangeResponse>(callback: EventCallback<R>) {
    return this.invoke<R>({
      name: 'onDeviceMotionChange',
      onSuccess: callback,
    });
  }
  /** 移除设备方向变化的事件的监听 */
  offDeviceMotionChange<R = DeviceMotionChangeResponse>(callback: EventCallback<R>) {
    this.off('onDeviceMotionChange', callback);
  }
  /** 监听陀螺仪数据变化事件 */
  onGyroscopeChange<R = GyroscopeChangeResponse>(callback: EventCallback<R>) {
    return this.invoke<R>({
      name: 'onGyroscopeChange',
      onSuccess: callback,
    });
  }
  /** 移除陀螺仪数据变化事件的监听 */
  offGyroscopeChange<R = GyroscopeChangeResponse>(callback: EventCallback<R>) {
    this.off('onGyroscopeChange', callback);
  }
  /**
   * 页面重新可见时, 会触发此事件, 包括下列两种情况
   * - 从后台被唤起和锁屏界面恢复, 触发 `onAppResume` 的同时会触发此事件
   * - 通过 `popWindow` 从下个页面回退, 触发 `onPageResume` 的同时会触发此事件
   * 此外, 如果这个页面是通过 `popWindow` 到达, 且传递了 `data` 参数, 此页可以获取到 `data`
   */
  onResume<R = ResumeResponse>(callback: EventCallback<R>) {
    return this.invoke<R>({
      name: 'onResume',
      onSuccess: callback,
    });
  }
  /** 移除 resume 事件的监听 */
  offResume<R = ResumeResponse>(callback: EventCallback<R>) {
    this.off('onResume', callback);
  }
  /**
   * 当一个页面不可见时, 会触发此事件, 包括下面两种情况
   * 被压入后台和锁屏, 触发 `onAppPause` 的同时会触发此事件
   * 通过 `pushWindow` 打开下个页面, 当前页面触发 `onPagePause` 的同时会触发此事件
   */
  onPause(callback: EventCallback) {
    return this.invoke({
      name: 'onPause',
      onSuccess: callback,
    });
  }
  /** 移除 onPause 事件的监听 */
  offPause(callback: EventCallback) {
    this.off('onPause', callback);
  }
  /** 监听应用从后台唤起事件 */
  onAppResume(callback: EventCallback) {
    return this.invoke({
      name: 'onAppResume',
      onSuccess: callback,
    });
  }
  /** 移除应用从后台唤起事件的监听 */
  offAppResume(callback: EventCallback) {
    this.off('onAppResume', callback);
  }
  /** 监听应用压后台事件 */
  onAppPause(callback: EventCallback) {
    return this.invoke({
      name: 'onAppPause',
      onSuccess: callback,
    });
  }
  /** 移除应用压后台事件的监听 */
  offAppPause(callback: EventCallback) {
    this.off('onAppPause', callback);
  }
  /**
   * 当一个页面重新可见时(仅指从下个页面回退), 会触发此事件
   * 如果这个页面通过 `popWindow` 到达时传递了 `data` 参数, 此页可以获取到 `data`
   */
  onPageResume<R = PageResumeResponse>(callback: EventCallback<R>) {
    return this.invoke<R>({
      name: 'onPageResume',
      onSuccess: callback,
    });
  }
  /** 移除 onPageResume 事件的监听 */
  offPageResume<R = PageResumeResponse>(callback: EventCallback<R>) {
    this.off('onPageResume', callback);
  }
  /** 当一个页面不可见时(仅指 pushWindow 到下个页面), 会触发此事件 */
  onPagePause(callback: EventCallback) {
    return this.invoke({
      name: 'onPagePause',
      onSuccess: callback,
    });
  }
  /** 移除 onPagePause 事件的监听 */
  offPagePause(callback: EventCallback) {
    this.off('offPagePause', callback);
  }
  /** 监听网络环境发生变化的事件 */
  onNetworkStatusChange<R = NetworkStatusChangeResponse>(callback: EventCallback<R>) {
    return this.invoke<R>({
      name: 'onNetworkStatusChange',
      onSuccess: callback,
    });
  }
  /** 移除网络环境发生变化事件的监听 */
  offNetworkStatusChange<R = NetworkStatusChangeResponse>(callback: EventCallback<R>) {
    this.off('onNetworkStatusChange', callback);
  }
  /** 监听用户主动截屏事件 */
  onUserCaptureScreen(callback: EventCallback) {
    return this.invoke({
      name: 'onUserCaptureScreen',
      onSuccess: callback,
    });
  }
  /** 移除用户主动截屏事件的监听 */
  offUserCaptureScreen(callback: EventCallback) {
    this.off('onUserCaptureScreen', callback);
  }
  /** 监听实时地理位置变化事件 */
  onLocationChange<R = GetLocationResponse>(callback: EventCallback<R>) {
    return this.invoke<R>({
      name: 'onLocationChange',
      onSuccess: callback,
    });
  }
  /** 移除实时地理位置变化事件的监听 */
  offLocationChange<R = GetLocationResponse>(callback: EventCallback<R>) {
    return this.invoke<R>({
      name: 'onLocationChange',
      onSuccess: callback,
    });
  }
}

export class BridgeError extends Error {
  name = 'BridgeError';
  code: number;
  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }
}

export default Bridge;
