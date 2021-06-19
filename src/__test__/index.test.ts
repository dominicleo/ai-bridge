/**
 * @jest-environment jsdom
 */

import Bridge, { BridgeError } from '@ai/bridge';

const bridge = new Bridge({ debug: false });

describe('Bridge', () => {
  it('instance', () => {
    expect(bridge).toBeInstanceOf(Bridge);
  });

  it('version', () => {
    expect(Bridge.version).toBe(__VERSION__);
  });

  it('BridgeError', () => {
    const error = new BridgeError('custom error', 0);
    expect(error).toBeInstanceOf(BridgeError);
  });

  it('unauthorized', () => {
    try {
      bridge.invoke('unauthorized');
    } catch (error) {
      expect(error.code).toBe(Bridge.UNSUPPORTED);
    }
  });

  it('invoke', async () => {
    const method = 'custom';
    const data = await new Promise((resolve) => {
      // IOS
      window.XiaoliJSBridge = {
        postMessage: resolve,
      };
      bridge.invoke(method, null);
    });

    const response = JSON.parse(data as string);

    expect(response).toMatchObject({
      callbackid: expect.stringMatching(/^bridge/),
      method,
      params: null,
    });
  });

  it('invokeAsync', async () => {
    const method = 'custom';

    const data = await new Promise((resolve) => {
      // IOS
      window.XiaoliJSBridge = {
        postMessage: resolve,
      };
      bridge.invokeAsync(method, null);
    });

    const response = JSON.parse(data as string);

    expect(response).toMatchObject({
      callbackid: expect.stringMatching(/^bridge/),
      method,
      params: null,
    });
  });

  it('receive', async () => {
    const method = 'custom';

    const mock = { code: 0, data: null };

    const response = await new Promise((resolve) => {
      // IOS
      window.XiaoliJSBridge = {
        postMessage: (data) => {
          const { callbackid } = JSON.parse(data as string);
          window.XiaoliJSBridgeReceive({ callbackid, response: mock });
        },
      };
      bridge.invoke(method, null, resolve);
    });

    expect(response).toBeNull();
  });

  it('adapter', async () => {
    const method = 'custom';

    const response = await new Promise((resolve) => {
      new Bridge({ adapter: resolve, debug: false }).invoke(method);
    });

    expect(response).toMatchObject({
      callbackid: expect.stringMatching(/^bridge/),
      method,
    });
  });

  it('timeout', async () => {
    const method = 'custom';

    const response = await new Promise<BridgeError>((resolve) => {
      // IOS
      window.XiaoliJSBridge = {
        postMessage: () => undefined,
      };
      new Bridge({ timeout: 100, debug: false }).invoke(method, null, null, resolve);
    });

    expect(response).toBeInstanceOf(BridgeError);
    expect(response.code).toBe(Bridge.TIMEOUT);
  });

  it('tracker', async () => {
    const method = 'custom';

    const trackers = [];

    await new Promise((resolve) => {
      // IOS
      window.XiaoliJSBridge = {
        postMessage: (data) => {
          const { callbackid } = JSON.parse(data as string);
          window.XiaoliJSBridgeReceive({ callbackid, response: {} });
        },
      };
      const bridge = new Bridge({ debug: false });
      bridge.tracker((type, data) => trackers.push({ type, data }));
      bridge.invoke(method, null, resolve, resolve);
    });

    expect(trackers).toHaveLength(2);
  });
});
