declare module '*.css';
declare module '*.less';

interface Window {
  XiaoliJSBridge: {
    /** Android 默认调用方法 */
    postMessage: (data: string) => void;
  };
  XiaoliJSBridgeReceive: (data: unknown) => void;
  webkit: {
    messageHandlers: {
      XiaoliJSBridge: {
        /** IOS 默认调用方法 */
        postMessage: (data: object) => void;
      };
    };
  };
}

/** 当前版本号 */
declare const __VERSION__: string;
