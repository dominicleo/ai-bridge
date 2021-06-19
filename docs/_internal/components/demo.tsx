import './demo.less';

import Bridge from '@ai/bridge';
import { Button, Flex, Icon, InputItem, List, Toast, WhiteSpace, WingBlank } from 'antd-mobile';
import Form, { Field } from 'rc-field-form';
import * as React from 'react';

import bridge from '../bridge';
import { handleFormError } from '../utils';

interface DemoProps {
  handleName: keyof Bridge;
  method?: string;
  params?: Record<string, unknown>;
}

const Demo: React.FC<DemoProps> = (props) => {
  const { handleName, method, ...rest } = props;

  const [form] = Form.useForm();
  const [params, setParams] = React.useState<Record<string, unknown>[]>([
    rest.params ? rest.params : { key: 'key', value: 'value' },
  ]);

  const onSubmit = async () => {
    try {
      const { method, params } = await form.validateFields().catch(handleFormError);
      const args = {};
      params.forEach(({ key, value }) => {
        args[key] = value;
      });
      // @ts-ignore
      await bridge[handleName](method, args);
    } catch (error) {
      Toast.info(error.message);
    }
  };

  const onAdd = () => {
    const next = params.concat({});
    setParams(next);
    form.setFieldsValue({
      params: next,
    });
  };

  const onRemove = (index: number) => {
    params.splice(index, 1);
    const next = [...params];
    setParams(next);
    form.setFieldsValue({
      params: next,
    });
  };

  return (
    <Form className='demo-block' form={form} initialValues={{ method, params }}>
      <List renderHeader={() => '方法名称'}>
        <Field name='method' rules={[{ required: true, message: '方法名称不能为空' }]}>
          <InputItem placeholder='请输入方法名称' />
        </Field>
      </List>
      <List renderHeader={() => '参数'}>
        {params.map(({ key }, index) => (
          <Field key={`${key}_${index}`} name={['params', index, 'value']}>
            <InputItem
              placeholder='参数值'
              extra={params.length > 1 && <Icon type='cross' onClick={() => onRemove(index)} />}
            >
              <Field name={['params', index, 'key']}>
                <InputItem placeholder='参数名称' />
              </Field>
            </InputItem>
          </Field>
        ))}
      </List>
      <WhiteSpace size='lg' />
      <WingBlank size='lg'>
        <Flex justify='end'>
          <Button type='ghost' onClick={onAdd} size='small'>
            增加参数
          </Button>
        </Flex>
        <WhiteSpace size='lg' />
        <Button type='primary' onClick={onSubmit}>
          调用
        </Button>
      </WingBlank>
      <WhiteSpace size='lg' />
    </Form>
  );
};

export default Demo;
