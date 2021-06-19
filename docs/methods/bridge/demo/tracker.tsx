import { List, Toast, Badge, WingBlank, WhiteSpace, Flex } from 'antd-mobile';
import bridge from '../../../_internal/bridge';
import * as React from 'react';

export default () => {
  const [trackers, setTrackers] = React.useState([]);

  React.useEffect(() => {
    bridge.tracker((type, data) => {
      console.log(type);
      setTrackers([{ type, data }].concat(trackers));
    });
  }, [trackers]);

  const handler = (cb?: () => void) => {
    return async () => {
      try {
        await cb?.();
      } catch (error) {
        Toast.info(error.message, 1.5, null, false);
      }
    };
  };

  return (
    <>
      <List renderHeader={() => '基础用法'}>
        <List.Item onClick={handler(() => bridge.invoke('custom'))} arrow='horizontal'>
          invoke
        </List.Item>
        <List.Item onClick={handler(() => bridge.getAccessToken())} arrow='horizontal'>
          getAccessToken
        </List.Item>
        <List.Item onClick={handler(() => bridge.getSystemInfo())} arrow='horizontal'>
          getSystemInfo
        </List.Item>
        <List.Item onClick={handler(() => bridge.getDeviceInfo())} arrow='horizontal'>
          getDeviceInfo
        </List.Item>
      </List>
      {!!trackers.length && (
        <List renderHeader={() => 'trackers'}>
          {trackers.map((tracker, index) => (
            <div key={`${tracker.type}_${index}`}>
              <WhiteSpace size='lg' />
              <WingBlank size='lg'>
                <Flex>
                  <Badge text={tracker.type} style={{ borderRadius: 2 }} />
                  <div style={{ marginLeft: 20 }}>{JSON.stringify(tracker.data)}</div>
                </Flex>
              </WingBlank>
            </div>
          ))}
          <WhiteSpace size='lg' />
        </List>
      )}
      <WhiteSpace size='lg' />
    </>
  );
};
