import React from 'react'
import { DatePicker as AntdDatePicker, Form as AntdForm } from 'antd'
import { FieldError } from 'react-hook-form'

type Props = {
  label: string,
  error?: FieldError,
  errormessage: string,
  required?: boolean
}

const DatePicker: React.FC<Props> = ({ label, error, errormessage, required, ...field }: Props) => {
  return (
    <AntdForm.Item label={label} validateStatus={error && 'error'} required={required}>
      <AntdDatePicker format='DD/MM/YYYY' {...field} inputReadOnly/>
      {
        error && <div className='ant-form-item-explain-error'>{error?.message || errormessage}</div>
      }
    </AntdForm.Item>
  )
}

export default DatePicker