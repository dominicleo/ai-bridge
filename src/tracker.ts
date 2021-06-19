export enum LogType {
  INITIALIZE = 'initialize',
  INVOKE = 'invoke',
  RECEIVE = 'receive',
  TIMEOUT = 'timeout',
  ERROR = 'error',
  CONFIG = 'config',
}

type BridgeTrackerCallback = (type: string, ext: any) => void;

export default class Track {
  protected trackers = new Set<BridgeTrackerCallback>();
  /** 数据追踪 */
  tracker(cb: BridgeTrackerCallback) {
    this.trackers.add(cb);
  }
  protected track(type: LogType, ext?: any) {
    this.trackers.forEach((cb) => {
      cb(type, ext);
    });
  }
}
