## 监听设备方向变化
<code src="./onDeviceMotionChange.tsx"></coe>

## DeviceMotionChangeResponse

| 属性名 | 描述 | 类型 |
| ---- | ---- | ---- |
| alpha | 当手机坐标 `x/y` 和地球 `x/y` 重合时, 绕着 `z` 轴转动的夹角为 `alpha`, 范围值为 `[0, 2 * PI)`, 逆时针转动为正 | `number` |
| beta | 当手机坐标 `y/z` 和地球 `y/z` 重合时, 绕着 x 轴转动的夹角为 `beta`, 范围值为 `[-1 * PI, PI) `, 顶部朝着地球表面转动为正, 也有可能朝着用户为正 | `number` |
| gamma | 当手机 `x/z` 和地球 `x/z` 重合时, 绕着 Y 轴转动的夹角为 `gamma`, 范围值为 `[-1 * PI / 2, PI / 2)`, 右边朝着地球表面转动为正 | `number` |
