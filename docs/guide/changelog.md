---
title: 更新日志
order: 1
---

# 更新日志

@ai/bridge 遵循 [Semantic Versioning 2.0.0](http://semver.org/lang/zh-CN/) 语义化版本规范。

## 发布节奏

- 修订版本号：每周末会进行日常 bugfix 更新。（如果有紧急的 bugfix，则任何时候都可发布）

- 次版本号：每月发布一个带有新特性的向下兼容的版本。

- 主版本号：含有破坏性更新和新特性，不在发布周期内。

## 更新内容

### 1.0.6 <Badge>2021-06-23</Badge>

- 新增方法 [wechatShare 微信分享](/methods/share/wechat-share)
<!-- - 新增方法 [chooseMedia 拍摄或从相册选取视频或照片](/methods/media/choose-media) -->
- 新增实例方法 [setConfig 设置配置](/methods/bridge/set-config)
- 新增实例方法 [tracker 数据打点](/methods/bridge/tracker)

### 1.0.5 <Badge>2021-05-28</Badge>

- 新增方法 [logout 退出登录](/methods/logout)
- 新增 [pushWindow 打开新页面](/methods/route/push-window) 属性
  - `navigationStyle` 导航栏样式
- 新增 [popWindow 关闭当前页面](/methods/route/pop-window) 属性
  - `navigationStyle` 导航栏样式

### 1.0.4 <Badge>2021-05-26</Badge>

- 新增方法 [logout 退出登录](/methods/user/logout)
- 新增 [getSystemInfo 获取系统信息](/methods/get-system-info) 字段
  - `systemCode` 系统识别码
  - `channelCode` 渠道 CODE
  - `channelKey` 渠道 KEY

### 1.0.3 <Badge>2021-05-25</Badge>

- 新增方法 [pushWindow 打开新页面](/methods/route/push-window)
- 新增方法 [popWindow 关闭当前页面](/methods/route/pop-window)
- 新增方法 [redirectTo 替换当前页面](/methods/route/redirect-to)
- 新增方法 [browser 使用默认浏览器打开链接](/methods/route/browser)

### 1.0.0 <Badge>2021-05-16</Badge>

- 新增对象 [BridgeError](/guide/error)
- 新增方法 [getAccessToken 获取令牌](/methods/user/get-access-token)
- 新增方法 [getDeviceInfo 获取设备信息](/methods/system/get-device-info)
- 新增方法 [getSystemInfo 获取系统信息](/methods/system/get-system-info)
- 新增对象 [Bridge](/guide/instance) 实例
