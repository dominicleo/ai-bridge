import { Button, List, Stepper, Toast, WhiteSpace, WingBlank } from 'antd-mobile';
import Form, { Field } from 'rc-field-form';
import * as React from 'react';

import bridge from '../../../_internal/bridge';
import { handleFormError } from '../../../_internal/utils';

export default () => {
  const [form] = Form.useForm();

  const onSubmit = async () => {
    try {
      const { delta } = await form.validateFields().catch(handleFormError);
      await bridge.popWindow(delta);
    } catch (error) {
      Toast.info(error.message);
    }
  };

  return (
    <Form form={form} initialValues={{ delta: 1 }}>
      <List renderHeader={() => '基础用法'}>
        <List.Item
          extra={
            <Field name='delta'>
              <Stepper max={10} min={1} showNumber />
            </Field>
          }
        >
          返回页面数
        </List.Item>
      </List>
      <WhiteSpace size='lg' />
      <WingBlank size='lg'>
        <Button type='ghost' onClick={onSubmit}>
          退出当前页面
        </Button>
      </WingBlank>
      <WhiteSpace size='lg' />
    </Form>
  );
};
