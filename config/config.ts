import { defineConfig } from 'dumi';

const navs = [
  {
    title: '文档',
    path: '/guide',
  },
  {
    title: '方法',
    path: '/methods',
  },
  {
    title: 'GitLab',
    path: 'https://gitlab.zmaxis.com/ai-lab/ai-bridge',
  },
];

const methods = [
  {
    title: 'Bridge',
    children: [
      'methods/bridge/invoke',
      'methods/bridge/invokeAsync',
      'methods/bridge/setConfig',
      'methods/bridge/tracker',
    ],
  },
  {
    title: '系统',
    children: ['methods/system/getSystemInfo', 'methods/system/getDeviceInfo'],
  },
  {
    title: '用户',
    children: ['methods/user/getAccessToken', 'methods/user/logout'],
  },
  {
    title: '路由',
    children: [
      'methods/route/pushWindow',
      'methods/route/popWindow',
      'methods/route/redirectTo',
      'methods/route/browser',
    ],
  },
  {
    title: '转发',
    children: ['methods/share/wechatShare'],
  },
  // {
  //   title: '媒体',
  //   children: ['methods/media/chooseMedia'],
  // },
];

export default defineConfig({
  title: 'JSBridge',
  exportStatic: {},
  hash: true,
  favicon: 'https://web-data.zmlearn.com/image/p8gfuUUFP8AyZk5u3NXjph/logo.svg',
  logo: 'https://web-data.zmlearn.com/image/p8gfuUUFP8AyZk5u3NXjph/logo.svg',
  outputPath: 'build',
  mode: 'site',
  navs,
  menus: { '/methods': methods },
  theme: {
    '@hd': '0.02rem',
    '@fill-body': '#fff',
    '@brand-primary': '#ff4a2a',
    '@brand-primary-tap': '#ff4a2a',
  },
  targets: {
    ios: 8,
  },
  styles: [
    `
    .__dumi-default-mobile-demo-layout {
      min-height: 100vh;
      padding: 0 !important;
      background-color: #f5f5f5;
      overflow: hidden;
      font-size: 0.26rem;
    }
    .__dumi-default-device-status {
      border-bottom: 1px solid #e3e3e3;
    }
    .__dumi-default-mobile-previewer {
      font-size: initial;
    }
    .__dumi-default-layout-features {
      grid-template-columns: repeat(2, 1fr) !important;
    }
    .__dumi-default-device-status span:first-child {
      display: none;
    }
    .__dumi-default-device-status::before {
      content: 'Bridge';
      display: inline-block;
      width: 60px;
    }
    .markdown.markdown blockquote {
      background-color: rgba(255, 229, 100, 0.3);
      color: #454d64;
      border-left-color: #ffe564;
      border-left-width: 9px;
      border-left-style: solid;
      padding: 20px 45px 20px 26px;
      margin-bottom: 30px;
      margin-top: 20px;
    }
    .markdown.markdown blockquote p:first-of-type {
      font-weight: 700;
      margin-top: 0;
      margin-bottom: 0;
    }
    .am-stepper {
      width: 100% !important;
    }
  `,
  ],
  extraBabelPlugins: [
    'version',
    [
      'import',
      {
        libraryName: 'antd-mobile',
        style: true,
      },
    ],
  ],
  // more config: https://d.umijs.org/config
});
