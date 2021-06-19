/// <reference path="../typings/index.d.ts" />

import adapter from './adapter';
import { CONFIRM_METHOD_NAME, UNSUPPORTED } from './contants';
import BridgeError from './error';
import Track, { LogType } from './tracker';
import {
  canUseWindow,
  isFunction,
  isNumber,
  isPlainObject,
  JSONParse,
  resolveOptions,
} from './utils';

import type {
  BrdigeAdapterOptions,
  BridgeCallbackOptions,
  BridgeInvokeOptions,
  BridgeInvokeAsyncOptions,
  BridgeOptions,
  BridgeReceiveResponse,
  BrowserOptions,
  // ChooseMediaOptions,
  // ChooseMediaResponse,
  GetAccessTokenResponse,
  GetDeviceInfoResponse,
  GetSystemInfoResponse,
  PopWindowOptions,
  PushWindowOptions,
  RedirectToOptions,
  ResolveOptions,
  WechatShareOptions,
} from './types';
const defaults: Partial<BridgeOptions> = {
  debug: true,
  timeout: 0,
  timeouts: {},
  receive: 'XiaoliJSBridgeReceive',
  adapter,
} as const;

export { BridgeError };

export default class Bridge extends Track {
  /** 调用成功 */
  static readonly SUCCESSFUL = 0;
  /** 无效的方法 */
  static readonly INVALID = 10000;
  /** 方法执行超时 */
  static readonly TIMEOUT = 10001;
  /** Bridge 未支持 */
  static readonly UNSUPPORTED = 10002;
  /** 方法被禁用 */
  static readonly FORBIDDEN = 10003;
  /** 方法执行异常 */
  static readonly ERROR = 10005;
  /** 未授权 */
  static readonly UNAUTHORIZED = 10006;
  /** 回调事件不存在 */
  static readonly CALLBACK_EVENT_NONEXISTENT = 10007;

  static version = __VERSION__;
  protected uniqueId = 0;
  protected options: BridgeOptions;
  protected static callbacks = new Map<string, BridgeCallbackOptions>();
  protected static timer = new Map<string, [NodeJS.Timeout, BridgeCallbackOptions]>();

  constructor(options?: Partial<BridgeOptions>) {
    super();
    this.options = resolveOptions(options, defaults);
    this.init();
  }
  protected init() {
    // 服务端不执行
    if (!canUseWindow) return;
    const { receive } = this.options;
    window[receive] = this.receive.bind(this);
    this.track(LogType.INITIALIZE, this.options);
  }
  protected getUniqueId(name: string) {
    const random = Math.random().toString(36).slice(-8);
    return ['bridge', name, random, Date.now(), ++this.uniqueId].join('-');
  }
  protected logger(...messages: any[]) {
    if (!this.options.debug) return;
    const [message, ...args] = messages;
    console.log(`[Bridge] ${message}`, ...args);
  }
  protected clear(callbackid) {
    const task = Bridge.timer.get(callbackid);
    if (!task) return;

    const [timer, args] = task;
    timer && clearTimeout(timer);
    Bridge.timer.delete(callbackid);
    this.logger('定时器被清除', args.name);
  }

  protected handleError(message: string, code: number, handler?: (error: any) => void) {
    const error = new BridgeError(message, code);
    this.track(LogType.ERROR, error);
    if (isFunction(handler)) {
      handler(error);
      return;
    }
    throw error;
  }
  /** 注册超时定时器 */
  protected handleTimeout(callbackid: string, options: BridgeCallbackOptions) {
    const { name, params, createdAt, onError } = options;
    const timeout = this.options.timeouts[name] || this.options.timeout;
    if (timeout <= 0) return;

    this.logger('注册定时器', name);
    Bridge.timer.set(callbackid, [
      global.setTimeout(() => {
        Bridge.callbacks.delete(callbackid);
        this.logger('方法执行超时', name);
        this.track(LogType.TIMEOUT, { name, params, timeout: Date.now() - createdAt });
        this.handleError(`'${name}' 响应超时`, Bridge.TIMEOUT, onError);
      }, timeout),
      options,
    ]);
  }
  /** 自定义适配器 */
  protected adapter(options: BrdigeAdapterOptions) {
    if (!canUseWindow) return;
    const task = Bridge.callbacks.get(options.callbackid);

    let message = UNSUPPORTED;
    let code = Bridge.UNSUPPORTED;

    try {
      if (isFunction(this.options.adapter)) {
        this.options.adapter(options);
        this.track(LogType.INVOKE, options);
        return;
      }
    } catch (error) {
      message = error.message;
      code = error.code;
    }

    this.clear(options.callbackid);
    this.handleError(message, code, task?.onError);
  }
  /** 更改配置 */
  async setConfig<T extends Partial<BridgeOptions>>(
    options: ResolveOptions<T, (defaults?: BridgeOptions) => Promise<T> | T>,
  ) {
    const config = isFunction(options) ? await options(this.options) : options;
    this.options = { ...this.options, ...config };
    this.track(LogType.CONFIG, config);
  }

  /** 接收回调 */
  protected receive(data: unknown) {
    const original = JSONParse<BridgeReceiveResponse>(data);
    const { callbackid, response = {} } = original;
    const task = Bridge.callbacks.get(callbackid);
    if (!task) {
      this.track(LogType.ERROR, original);
      throw new BridgeError(`回调事件不存在 ${data}`, Bridge.CALLBACK_EVENT_NONEXISTENT);
    }
    if (task.__CANCEL__) return this.logger('事件已被取消监听', task.name);
    if (response.code === Bridge.SUCCESSFUL) {
      this.logger('回调事件调用成功', task.name);
      this.track(LogType.RECEIVE, { ...task, response, duration: task.updatedAt - task.createdAt });
      isFunction(task.onSuccess) && task.onSuccess(response.data);
      return;
    }

    this.handleError(response.message, response.code, task.onError);
  }

  invoke<R = unknown>(
    name: string,
    params?: object,
    onSuccess?: (data: R) => void,
    onError?: (error: any) => void,
  ): void;
  invoke<R = unknown>(options: ResolveOptions<BridgeInvokeOptions<R>>): void;
  invoke<R = unknown>(
    options: ResolveOptions<BridgeInvokeOptions<R>>,
    params?: object,
    onSuccess?: (data: R) => void,
    onError?: (error: any) => void,
  ) {
    const { name, ...rest } = resolveOptions(options, { params, onSuccess, onError });
    if (!name) {
      this.handleError(CONFIRM_METHOD_NAME, Bridge.INVALID, onError);
      return;
    }
    const callbackid = this.getUniqueId(name);
    const createdAt = Date.now();
    const args = { ...rest, name, createdAt, updatedAt: createdAt };

    Bridge.callbacks.set(callbackid, args);
    this.handleTimeout(callbackid, args);
    this.adapter({ callbackid, method: name, params: rest.params });
  }
  invokeAsync<R = unknown>(
    name: string,
    params?: object,
    onSuccess?: (data: R) => void,
    onError?: (error: any) => void,
  ): Promise<R>;
  invokeAsync<R = unknown>(options: ResolveOptions<BridgeInvokeAsyncOptions>): Promise<R>;
  invokeAsync<R = unknown>(options: ResolveOptions<BridgeInvokeAsyncOptions>, params?: object) {
    const args = resolveOptions(options, { params });
    return new Promise<R>((resolve, reject) => {
      this.invoke<R>({
        ...args,
        onSuccess: resolve,
        onError: reject,
      });
    });
  }

  /** 获取用户令牌 */
  getAccessToken() {
    return this.invokeAsync<GetAccessTokenResponse>('getAccessToken');
  }
  /** 获取设备信息 */
  getDeviceInfo() {
    return this.invokeAsync<GetDeviceInfoResponse>('getDeviceInfo');
  }
  /** 获取系统信息 */
  getSystemInfo() {
    return this.invokeAsync<GetSystemInfoResponse>('getSystemInfo');
  }
  /** 退出登录 */
  logout() {
    return this.invokeAsync('logout');
  }
  /** 打开新窗口 */
  pushWindow(options: ResolveOptions<PushWindowOptions>) {
    const params = resolveOptions(options, null, 'url');
    return this.invokeAsync('popWindow', params);
  }
  /** 关闭当前页面 */
  popWindow(options: ResolveOptions<PopWindowOptions, number | Record<string, unknown>>) {
    const isDelta = isNumber(options);
    const key = isDelta ? 'delta' : 'data';
    const handler = isDelta ? isNumber : isPlainObject;
    const params = resolveOptions(options, null, key, handler);
    return this.invokeAsync('popWindow', params);
  }
  /** 替换当前页面 */
  redirectTo(options: ResolveOptions<RedirectToOptions>) {
    const params = resolveOptions(options, null, 'url');
    return this.invokeAsync('redirectTo', params);
  }
  /** 使用默认浏览器打开地址 */
  browser(options: ResolveOptions<BrowserOptions>) {
    const params = resolveOptions(options, null, 'url');
    return this.invokeAsync('browser', params);
  }
  /**
   * 微信分享
   * @version 1.0.6
   */
  wechatShare(options: WechatShareOptions) {
    const params = resolveOptions(options, { scene: 'session' });
    return this.invokeAsync('wechatShare', params);
  }
  // /**
  //  * 拍摄或从相册选取视频或照片
  //  * @version 1.0.6
  //  */
  // chooseMedia(options?: ChooseMediaOptions) {
  //   const params = resolveOptions(options, {
  //     sourceType: 'album',
  //     compressed: false,
  //     maxDuration: 10,
  //     camera: 'back',
  //   });
  //   return this.invokeAsync<ChooseMediaResponse>('chooseMedia', params);
  // }
}
