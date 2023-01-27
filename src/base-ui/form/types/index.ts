type IFormItemType = 'input' | 'select' | 'password' | 'datepicker'

export interface IFormItem {
  type: IFormItemType
  label: string
  rules?: any[]
  placeholder?: any
  options?: any
  attrs?: any
}

export interface IForm {
  labelWidth?: string
  formItems: IFormItem[]
  colLayout?: any
  formItemLayout?: any
}
