import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  labelWidth: '120px',
  formItems: [
    {
      field: 'dp',
      type: 'input',
      label: '用户名',
      placeholder: '请输入部门'
    },
    {
      field: 'password',
      type: 'password',
      label: '密码',
      placeholder: '请输入密码'
    },
    {
      field: 'hob',
      type: 'select',
      label: '爱好',
      placeholder: '请选择爱好',
      options: [
        {
          label: '唱',
          value: 'sing'
        },
        {
          label: '跳',
          value: 'jump'
        },
        {
          label: 'rap',
          value: 'rap'
        }
      ]
    },
    {
      field: 'time',
      type: 'datepicker',
      label: '创建时间',
      placeholder: '练习时长两年半',
      attrs: {
        type: 'daterange',
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间'
      }
    }
  ]
}
