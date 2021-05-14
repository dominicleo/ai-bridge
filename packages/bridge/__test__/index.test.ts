import Bridge from '@ai/bridge';

describe('brdige', () => {
  const bridge = new Bridge();
  it('init', () => {
    // @ts-ignore
    expect(Bridge.version).toBe(__VERSION__);
  });
});
