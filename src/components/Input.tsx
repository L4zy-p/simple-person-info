import React from 'react'
import { Input as AntdInput, Form as AntdForm } from 'antd'
import { FieldError } from 'react-hook-form'

type Props = {
  label: string,
  error?: FieldError,
  errormessage: string,
  required?: boolean
}

const Input: React.FC<Props> = ({ label, error, errormessage, required, ...field }: Props) => {
  return (
    <AntdForm.Item label={label} validateStatus={error && 'error'} required={required}>
      <AntdInput {...field} />
      {
        error && <div className='ant-form-item-explain-error'>{error?.message || errormessage}</div>
      }
    </AntdForm.Item>
  )
}

export default Input