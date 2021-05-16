import { defineConfig } from 'dumi';

const navs = [
  {
    title: '文档',
    path: '/docs',
  },
  {
    title: '方法列表',
    path: '/api',
  },
];

const menus = {
  '/docs': [
    {
      title: '快速上手',
      path: '/docs/quick-start',
    },
    {
      title: 'Bridge',
      path: '/docs/bridge',
    },
    {
      title: 'BridgeError',
      path: '/docs/error',
    },
  ],
  '/api': [
    {
      title: 'bridge',
      children: [
        {
          title: 'invoke',
          path: '/api/bridge/invoke',
        },
        {
          title: 'invokeAsync',
          path: '/api/bridge/invoke-async',
        },
        {
          title: 'off',
          path: '/api/bridge/off',
        },
      ],
    },
    {
      title: '用户令牌',
      path: '/api/system/get-access-token',
    },
    {
      title: '系统',
      children: [
        {
          title: 'getSystemInfo',
          path: '/api/system/get-system-info',
        },
        {
          title: 'getDeviceInfo',
          path: '/api/system/get-device-info',
        },
      ],
    },
    {
      title: '路由',
      children: [
        {
          title: 'pushWindow',
          path: '/api/route/push-window',
        },
        {
          title: 'popWindow',
          path: '/api/route/pop-window',
        },
        {
          title: 'redirectTo',
          path: '/api/route/redirect-to',
        },
        {
          title: 'browser',
          path: '/api/route/browser',
        },
      ],
    },
    {
      title: '窗口事件',
      children: [
        {
          title: 'onResume',
          path: '/api/window/on-resume',
        },
        {
          title: 'offResume',
          path: '/api/window/off-resume',
        },
        {
          title: 'onPause',
          path: '/api/window/on-pause',
        },
        {
          title: 'offPause',
          path: '/api/window/off-pause',
        },
        {
          title: 'onPageResume',
          path: '/api/window/on-page-resume',
        },
        {
          title: 'offPageResume',
          path: '/api/window/off-page-resume',
        },
        {
          title: 'onPagePause',
          path: '/api/window/on-page-pause',
        },
        {
          title: 'offPagePause',
          path: '/api/window/off-page-pause',
        },
      ],
    },
    {
      title: '应用事件',
      children: [
        {
          title: 'onAppResume',
          path: '/api/app/on-app-resume',
        },
        {
          title: 'offAppResume',
          path: '/api/app/off-app-resume',
        },
        {
          title: 'onAppPause',
          path: '/api/app/on-app-pause',
        },
        {
          title: 'offAppPause',
          path: '/api/app/off-app-pause',
        },
      ],
    },
    {
      title: '导航栏',
      children: [
        {
          title: 'onTitleClick',
          path: '/api/navigate/on-title-click',
        },
        {
          title: 'offTitleClick',
          path: '/api/navigate/off-title-click',
        },
        {
          title: 'setNavigationBar',
          path: '/api/navigate/set-navigation-bar',
        },
      ],
    },
    {
      title: '界面',
      children: [
        {
          title: 'alert',
          path: '/api/interaction/alert',
        },
        {
          title: 'confirm',
          path: '/api/interaction/confirm',
        },
        {
          title: 'showToast',
          path: '/api/interaction/show-toast',
        },
        {
          title: 'hideToast',
          path: '/api/interaction/hide-toast',
        },
        {
          title: 'showLoading',
          path: '/api/interaction/show-loading',
        },
        {
          title: 'hideLoading',
          path: '/api/interaction/hide-loading',
        },
        {
          title: 'showActionSheet',
          path: '/api/interaction/show-action-sheet',
        },
      ],
    },
    {
      title: '媒体',
      children: [
        {
          title: 'chooseMedia',
          path: '/api/media/choose-media',
        },
        {
          title: 'previewMedia',
          path: '/api/media/preview-media',
        },
      ],
    },
    {
      title: '位置',
      children: [
        {
          title: 'getLocation',
          path: '/api/device/location/get-location',
        },
        {
          title: 'onLocationChange',
          path: '/api/device/location/on-location-change',
        },
        {
          title: 'offLocationChange',
          path: '/api/device/location/off-location-change',
        },
      ],
    },
    {
      title: '屏幕',
      children: [
        {
          title: 'getScreenBrightness',
          path: '/api/device/screen/get-screen-brightness',
        },
        {
          title: 'setScreenBrightness',
          path: '/api/device/screen/set-screen-brightness',
        },
        {
          title: 'setPortrait',
          path: '/api/device/screen/set-portrait',
        },
        {
          title: 'setLandscape',
          path: '/api/device/screen/set-landscape',
        },
        {
          title: 'onUserCaptureScreen',
          path: '/api/device/screen/on-user-capture-screen',
        },
        {
          title: 'offUserCaptureScreen',
          path: '/api/device/screen/off-user-capture-screen',
        },
      ],
    },
    {
      title: '网络',
      children: [
        {
          title: 'getNetworkType',
          path: '/api/device/network/get-network-type',
        },
        {
          title: 'onNetworkStatusChange',
          path: '/api/device/network/on-network-status-change',
        },
        {
          title: 'offNetworkStatusChange',
          path: '/api/device/network/off-network-status-change',
        },
      ],
    },
    {
      title: '罗盘',
      children: [
        {
          title: 'onCompassChange',
          path: '/api/device/accelerometer/on-compass-change',
        },
        {
          title: 'offCompassChange',
          path: '/api/device/accelerometer/off-compass-change',
        },
      ],
    },
    {
      title: '加速度',
      children: [
        {
          title: 'onAccelerometerChange',
          path: '/api/device/accelerometer/on-accelerometer-change',
        },
        {
          title: 'offAccelerometerChange',
          path: '/api/device/accelerometer/off-accelerometer-change',
        },
      ],
    },
    {
      title: '设备方向',
      children: [
        {
          title: 'onDeviceMotionChange',
          path: '/api/device/motion/on-device-motion-change',
        },
        {
          title: 'offDeviceMotionChange',
          path: '/api/device/motion/off-device-motion-change',
        },
      ],
    },
    {
      title: '陀螺仪',
      children: [
        {
          title: 'onGyroscopeChange',
          path: '/api/device/gyroscope/on-gyroscope-change',
        },
        {
          title: 'offGyroscopeChange',
          path: '/api/device/gyroscope/off-gyroscope-change',
        },
      ],
    },
    {
      title: '剪切板',
      children: [
        {
          title: 'getClipboardData',
          path: '/api/device/clipboard/get-clipboard-data',
        },
        {
          title: 'setClipboardData',
          path: '/api/device/clipboard/set-clipboard-data',
        },
      ],
    },
    {
      title: '震动',
      children: [
        {
          title: 'vibrateShort',
          path: '/api/device/vibrate/vibrate-short',
        },
        {
          title: 'vibrateLong',
          path: '/api/device/vibrate/vibrate-long',
        },
      ],
    },
    {
      title: '日历',
      children: [
        {
          title: 'addPhoneCalendar',
          path: '/api/device/calendar/add-phone-calendar',
        },
        {
          title: 'addPhoneRepeatCalendar',
          path: '/api/device/calendar/add-phone-repeat-calendar',
        },
      ],
    },
    {
      title: '电量',
      path: '/api/device/battery/get-battery-info',
    },
    {
      title: '摇一摇',
      path: '/api/device/watch-shake',
    },
    {
      title: '扫一扫',
      path: '/api/device/scan/scan',
    },
  ],
};

export default defineConfig({
  title: 'JSBridge',
  description: '丰富的原生 API 媲美原生应用的体验',
  exportStatic: {},
  hash: true,
  mode: 'site',
  locales: [['zh-CN', '中文']],
  favicon: 'https://avatars0.githubusercontent.com/u/70750872?s=100&v=4',
  logo: 'https://avatars0.githubusercontent.com/u/70750872?s=100&v=4',
  menus,
  navs: navs,
  theme: {
    '@hd': '0.02rem',
  },
  targets: {
    ios: 8,
  },
  styles: [
    `.__dumi-default-mobile-demo-layout {
      min-height: 100vh;
      background: #f5f5f5;
      padding: 0 !important;
      overflow: hidden;
      font-size: 0.26rem;
    }
    .__dumi-default-device-status {
      border-bottom: 1px solid #e3e3e3;
    }
    .__dumi-default-mobile-previewer {
      font-size: initial;
    }
    .__dumi-default-icon[title="Open demo on CodeSandbox.io"] {
      display: none;
    }
    .__dumi-default-menu-header p {
      font-size: 14px;
    }
    `,
  ],
  // 用于替换 __VERSION__ pkg.version
  extraBabelPlugins: ['version'],
});
