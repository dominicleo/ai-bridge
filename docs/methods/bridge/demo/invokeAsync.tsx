import * as React from 'react';
import Demo from '../../../_internal/components/demo';

export default () => {
  return (
    <Demo handleName='invokeAsync' method='custom' params={{ key: 'name', value: 'invokeAsync' }} />
  );
};
