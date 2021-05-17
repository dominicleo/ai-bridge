import { List, WhiteSpace, WingBlank } from 'antd-mobile';
import * as React from 'react';

interface WrapperProps {
  response?: any;
}

const Wrapper: React.FC<WrapperProps> = ({ response, children }) => {
  const [state, setState] = React.useState(response);
  return (
    <>
      <List renderHeader={() => '在应用内扫描下方二维码开始调试'}>
        <WingBlank size='lg'>
          <WhiteSpace size='lg' />
          {children}
          <WhiteSpace size='lg' />
        </WingBlank>
      </List>
      {response && (
        <List renderHeader={() => '响应数据'}>
          <pre>{JSON.stringify(state, null, 2)}</pre>
        </List>
      )}
    </>
  );
};

export default Wrapper;
