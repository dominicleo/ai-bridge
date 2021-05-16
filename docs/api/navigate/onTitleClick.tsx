import * as  React from 'react';
import { unstable_Toast as Toast } from '@ant-design/mobile';
import Bridge from '@ai/bridge';

const bridge = new Bridge();

const Page = () => {
  function callback () {
    bridge.alert('导航栏文字被点击了');
  }

  const init =  () => {
    try {
      bridge.onTitleClick(callback);
    } catch (error) {
      Toast.info({ content: error.message });
    }
  }

  React.useEffect(() => {
    init();
    return () => {
      bridge.offTitleClick(callback);
    }
  }, []);



  return <></>;
}

export default Page;
