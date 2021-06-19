import {
  Button,
  List,
  Toast,
  WhiteSpace,
  WingBlank,
  Checkbox,
  Stepper,
  TextareaItem,
  Switch,
  Radio,
} from 'antd-mobile';
import Form, { Field } from 'rc-field-form';
import * as React from 'react';

import { first, handleFormError } from '../../../_internal/utils';
import bridge from '../../../_internal/bridge';

const MEDIA_TYPES = [
  {
    key: 'image',
    value: 'mediaTypeImage',
    label: '照片',
  },
  {
    key: 'video',
    value: 'mediaTypeVideo',
    label: '视频',
  },
  {
    key: 'all',
    value: 'mediaTypeAll',
    label: '所有',
  },
];

export default () => {
  const [form] = Form.useForm();
  const [state, setState] = React.useState([]);

  const onSubmit = async () => {
    try {
      const {
        count,
        compressed,
        sourceTypeAlbum,
        sourceTypeCamera,
        mediaTypeImage,
        mediaTypeVideo,
        mediaTypeAll,
      } = await form.validateFields().catch(handleFormError);
      const mediaType: any[] = [
        mediaTypeImage && 'image',
        mediaTypeVideo && 'video',
        mediaTypeAll && 'all',
      ].filter(Boolean);
      const sourceType: any[] = [sourceTypeAlbum && 'album', sourceTypeCamera && 'camera'];

      if (!sourceType.length) {
        throw new Error('请选择媒体来源');
      }

      if (!mediaType.length) {
        throw new Error('请选择媒体类型');
      }

      const values = {
        count,
        compressed,
        sourceType: first(sourceType),
        mediaType: first(mediaType),
      };

      console.log(values);
      const { files } = await bridge.chooseMedia(values);
      console.log(files);

      setState(files);
    } catch (error) {
      Toast.info(error.message);
    }
  };

  const onMediaTypeChange = (name) => {
    return () => {
      form.setFieldsValue(
        Object.fromEntries(MEDIA_TYPES.map(({ key, value }) => [value, key === name])),
      );
    };
  };

  const onCourceTypeChange = (name) => {
    return (event) => {
      const { checked } = event.target;
      if (!checked) return;
      if (name === 'album') {
        form.setFieldsValue({
          sourceTypeCamera: false,
        });
        return;
      }
      if (name === 'camera') {
        form.setFieldsValue({
          sourceTypeAlbum: false,
        });
        return;
      }
    };
  };

  const onClickCamera = (name) => {
    return () => {
      if (name === 'front') {
        form.setFieldsValue({ cameraBack: false });
        return;
      }
      if (name === 'back') {
        form.setFieldsValue({ cameraFront: false });
        return;
      }
    };
  };

  return (
    <Form
      form={form}
      initialValues={{
        count: 9,
        maxDuration: 10,
        compressed: true,
        sourceTypeAlbum: true,
        mediaTypeImage: true,
        cameraBack: true,
        camera: true,
      }}
    >
      <List renderHeader={() => '基础用法'}>
        <List.Item
          extra={
            <Field name='count'>
              <Stepper min={1} max={20} showNumber />
            </Field>
          }
        >
          选择数量
        </List.Item>
        <List.Item
          extra={
            <Field name='compressed' valuePropName='checked'>
              <Switch />
            </Field>
          }
        >
          压缩文件
          <List.Item.Brief>仅对 mediaType 为 image 时有效</List.Item.Brief>
        </List.Item>
        <List.Item
          extra={
            <Field name='maxDuration'>
              <Stepper min={10} max={60} showNumber />
            </Field>
          }
        >
          拍摄视频最长拍摄时间
        </List.Item>
      </List>
      <List renderHeader={() => '媒体来源'}>
        <Field name='sourceTypeAlbum' valuePropName='checked'>
          <Checkbox.CheckboxItem onChange={onCourceTypeChange('album')}>
            相册选择
          </Checkbox.CheckboxItem>
        </Field>
        <Field name='sourceTypeCamera' valuePropName='checked'>
          <Checkbox.CheckboxItem onChange={onCourceTypeChange('camera')}>
            相机拍摄
          </Checkbox.CheckboxItem>
        </Field>
      </List>
      <List renderHeader={() => '摄像头方向'}>
        <Field name='cameraFront' valuePropName='checked'>
          <Radio.RadioItem onClick={onClickCamera('front')}>使用前置摄像头</Radio.RadioItem>
        </Field>
        <Field name='cameraBack' valuePropName='checked'>
          <Radio.RadioItem onClick={onClickCamera('back')}>使用后置摄像头</Radio.RadioItem>
        </Field>
      </List>
      <List renderHeader={() => '媒体类型'}>
        {MEDIA_TYPES.map(({ key, value, label }) => (
          <Field key={key} name={value} valuePropName='checked'>
            <Radio.RadioItem onChange={onMediaTypeChange(key)}>{label}</Radio.RadioItem>
          </Field>
        ))}
      </List>

      {state.map(({ tempFilePath }, index) => (
        <div key={index}>
          <img src={`${tempFilePath}`} style={{ maxWidth: '100%', display: 'block' }} />
        </div>
      ))}

      {/* {state.length > 0 && (
        <List renderHeader={() => '响应数据'}>
          <TextareaItem rows={10} value={JSON.stringify(state, null, 2)} />
        </List>
      )} */}
      <WhiteSpace size='lg' />
      <WingBlank size='lg'>
        <Button type='primary' onClick={onSubmit}>
          选取文件
        </Button>
      </WingBlank>
      <WhiteSpace size='lg' />
    </Form>
  );
};
