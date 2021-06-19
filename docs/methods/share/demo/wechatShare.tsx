import {
  Button,
  List,
  InputItem,
  Toast,
  WhiteSpace,
  WingBlank,
  TextareaItem,
  Picker,
  ImagePicker,
} from 'antd-mobile';
import Form, { Field } from 'rc-field-form';
import * as React from 'react';

import { handleFormError, first } from '../../../_internal/utils';
import bridge from '../../../_internal/bridge';

const TPYE_OPTIONS = [
  {
    value: 'url',
    label: '链接',
  },
  // {
  //   value: 'text',
  //   label: '文本',
  // },
  {
    value: 'image',
    label: '图片',
  },
  {
    value: 'video',
    label: '视频',
  },
];

const SCENE_OPTIONS = [
  {
    value: 'session',
    label: '会话',
  },
  {
    value: 'timeline',
    label: '朋友圈',
  },
];

export default () => {
  const [form] = Form.useForm();
  const [type, setType] = React.useState('url');
  const [thumbFiles, setThumbFiles] = React.useState([]);
  const [imageFiles, setImageFiles] = React.useState([]);

  const onSubmit = async () => {
    try {
      const { scene, type, ...rest } = await form.validateFields().catch(handleFormError);

      const values = {
        ...rest,
        scene: first(scene),
        type: first(type),
        thumbData: first(thumbFiles)?.url,
        imageData: first(imageFiles)?.url,
      };

      console.log(values);

      await bridge.wechatShare(values);
    } catch (error) {
      Toast.info(error.message);
    }
  };

  const onTypeCange = (values: string[]) => {
    const [type] = values;
    setType(type);
  };

  const onThumbChange = (files) => {
    setThumbFiles(files);
  };

  const onImageChange = (files) => {
    setImageFiles(files);
  };

  return (
    <Form
      form={form}
      initialValues={{
        type: ['url'],
        scene: ['session'],
        title: 'bridge',
        webpageUrl: 'https://m.zhangmen.com',
        text: '自定义分享文本',
        imageUrl: 'https://web-data.zmlearn.com/image/9LvyjL1SVbvnTd4CjisWHw/rule.png',
        thumbUrl: 'https://web-data.zmlearn.com/image/9LvyjL1SVbvnTd4CjisWHw/rule.png',
        videoUrl: 'https://web-data.zmlearn.com/media/nT2jsJm7HGWZH8Ljt57brC/lang01.mp4',
      }}
    >
      <List renderHeader={() => '分享参数'}>
        <Field name='type'>
          <Picker data={TPYE_OPTIONS} cols={1} onChange={onTypeCange}>
            <List.Item>类型</List.Item>
          </Picker>
        </Field>
        <Field name='scene'>
          <Picker data={SCENE_OPTIONS} cols={1}>
            <List.Item>场景</List.Item>
          </Picker>
        </Field>
        <Field name='title'>
          <InputItem placeholder='请输入分享标题'>标题</InputItem>
        </Field>
        <Field name='description'>
          <InputItem placeholder='请输入分享描述'>描述</InputItem>
        </Field>
        <List.Item
          extra={
            <ImagePicker
              length={1}
              files={thumbFiles}
              onChange={onThumbChange}
              selectable={thumbFiles.length < 1}
            />
          }
        >
          缩略图
        </List.Item>
      </List>
      <List renderHeader={() => '缩略图链接'}>
        <Field name='thumbUrl'>
          <TextareaItem rows={3} />
        </Field>
      </List>
      {type === 'url' && (
        <List renderHeader={() => '分享页面地址'}>
          <Field
            name='webpageUrl'
            rules={[
              {
                async validator(rule, value) {
                  if (!/^https?:\/\//i.test(value)) return Promise.reject(rule.message);
                },
                message: '请输入正确的分享地址',
              },
            ]}
          >
            <TextareaItem autoHeight />
          </Field>
        </List>
      )}
      {/* {type === 'text' && (
        <List renderHeader={() => '分享文本'}>
          <Field name='text'>
            <InputItem />
          </Field>
        </List>
      )} */}
      {type === 'image' && (
        <List renderHeader={() => '分享图片'}>
          <List.Item
            extra={
              <ImagePicker
                length={1}
                files={imageFiles}
                onChange={onImageChange}
                selectable={imageFiles.length < 1}
              />
            }
          >
            图片数据
          </List.Item>
          <Field name='imageUrl'>
            <TextareaItem rows={3} />
          </Field>
        </List>
      )}
      {type === 'video' && (
        <List renderHeader={() => '分享视频地址'}>
          <Field name='videoUrl'>
            <TextareaItem rows={3} />
          </Field>
        </List>
      )}
      <WhiteSpace size='lg' />
      <WingBlank size='lg'>
        <Button type='primary' onClick={onSubmit}>
          分享
        </Button>
      </WingBlank>
      <WhiteSpace size='lg' />
    </Form>
  );
};
