import Bridge from '.';
import { UNSUPPORTED } from './contants';
import BridgeError from './error';
import { BrdigeAdapterOptions } from './types';
import { isFunction } from './utils';

const adapter = (options: BrdigeAdapterOptions) => {
  // android 默认调用
  if (isFunction(window?.XiaoliJSBridge?.postMessage)) {
    window.XiaoliJSBridge.postMessage(JSON.stringify(options));
    return;
  }

  // ios 默认调用
  if (isFunction(window?.webkit?.messageHandlers?.XiaoliJSBridge?.postMessage)) {
    window.webkit.messageHandlers.XiaoliJSBridge.postMessage(JSON.parse(JSON.stringify(options)));
    return;
  }

  throw new BridgeError(UNSUPPORTED, Bridge.UNSUPPORTED);
};

export default adapter;
