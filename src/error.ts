export default class BridgeError extends Error {
  name = 'BridgeError';
  code: number;
  constructor(message: string, code: number) {
    super(message);
    this.code = code;

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, new.target);
    }

    if (typeof Object.setPrototypeOf === 'function') {
      Object.setPrototypeOf(this, new.target.prototype);
    } else {
      (this as any).__proto__ = new.target.prototype;
    }
  }
}
