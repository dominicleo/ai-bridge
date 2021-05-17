
## 显示确认框

<code src="./confirm.tsx"></code>

## ResolveContentOptions`<ConfirmOptions>`

| 属性名 | 描述 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| title | 确认框标题 | `string` | - |
| content | 确认框内容 | `string` | `(必选)` |
| confirmButtonText | 确定按钮文字 | `string` | `确定` |
| cancelButtonText | 取消按钮文字 | `string` | `取消` |

## ConfirmResponse

| 属性名 | 描述 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| confirm | 点击确定按钮 | `boolean` | `false` |
| cancel | 点击取消按钮 | `boolean` | `false` |
