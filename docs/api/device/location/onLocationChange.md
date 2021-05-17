## 监听实时地理位置变化

<code src="./onLocationChange.tsx"></code>

## LocationChangeResponse

| 属性名 | 描述 | 类型 |
| ---- | ---- | ---- |
| latitude | 纬度, 范围为 `-90` ~ `90`, 负数表示南纬 | `number` |
| longitude | 经度, 范围为 `-180` ~ `180`, 负数表示西经 | `number` |
| speed | 速度, 单位 `m/s` | `number` |
| accuracy | 位置的精确度 | `number` |
| altitude | 高度, 单位 `m` | `number` |
| verticalAccuracy | 垂直精度, 单位 `m` | `number` |
| horizontalAccuracy | 水平精度, 单位 `m` | `number` |
