import { Button, List, TextareaItem, Toast, WhiteSpace, WingBlank, Switch } from 'antd-mobile';
import Form, { Field } from 'rc-field-form';
import * as React from 'react';

import { handleFormError } from '../../../_internal/utils';
import bridge from '../../../_internal/bridge';

export default () => {
  const [form] = Form.useForm();

  const onSubmit = async () => {
    try {
      const { url } = await form.validateFields().catch(handleFormError);
      await bridge.browser(url);
    } catch (error) {
      Toast.info(error.message);
    }
  };

  return (
    <Form form={form} initialValues={{ url: 'https://m.zhangmen.com' }}>
      <List renderHeader={() => '页面地址'}>
        <Field
          name='url'
          rules={[
            {
              async validator(rule, value) {
                if (!/^([a-z]|[0-9])+:\/\//i.test(value)) return Promise.reject(rule.message);
              },
              message: '请输入正确的页面地址',
            },
          ]}
        >
          <TextareaItem autoHeight />
        </Field>
      </List>
      <WhiteSpace size='lg' />
      <WingBlank size='lg'>
        <Button type='ghost' onClick={onSubmit}>
          默认浏览器打开链接
        </Button>
      </WingBlank>
      <WhiteSpace size='lg' />
    </Form>
  );
};
