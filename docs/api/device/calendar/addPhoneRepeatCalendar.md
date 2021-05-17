## 向系统日历添加重复事件

<code src="./addPhoneRepeatCalendar.tsx"></code>

## AddPhoneRepeatCalendarOptions

| 属性名 | 描述 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| title | 日历事件标题 | `string` | `(必填)` |
| startTime | 开始时间的 `unix` 时间戳 | `number` | `(必填)` |
| endTime | 结束时间的 `unix` 时间戳, 默认与开始时间相同 | `number` | `(必填)` |
| allDay | 是否全天事件 | `boolean` | `false` |
| description | 事件说明 | `string` | - |
| location | 事件位置 | `string` | - |
| alarm | 是否提醒 | `boolean` | `true` |
| alarmOffset | 提醒提前量, 单位 `s`, 默认 0 表示开始时提醒 | `number` | - |
| repeatInterval | 重复周期, 默认 `month` 每月重复 | `string` | `month` |
| repeatEndTime | 重复周期结束时间的 unix 时间戳, 不填表示一直重复 | `number` | `(必填)` |
