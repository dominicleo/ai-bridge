import * as React from 'react';
import Demo from '../../../_internal/components/demo';

export default () => {
  return <Demo handleName='invoke' method='custom' params={{ key: 'name', value: 'invoke' }} />;
};
