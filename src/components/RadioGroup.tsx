import React from 'react'
import { Radio as AntdRadio, Form as AntdForm } from 'antd'
import { FieldError } from 'react-hook-form'

type Props = {
  label: string,
  options: string[],
  error?: FieldError,
  errormessage: string,
  required?: boolean
}

const RadioGroup: React.FC<Props> = ({ label, error, options, errormessage, required, ...field }: Props) => {
  return (
    <AntdForm.Item label={label} validateStatus={error && 'error'} required={required}>
      <AntdRadio.Group {...field}>
        {
          options?.map((op, i) => (
            <AntdRadio value={op}>{op}</AntdRadio>
          ))
        }
      </AntdRadio.Group>
      {
        error && <div className='ant-form-item-explain-error'>{errormessage}</div>
      }
    </AntdForm.Item>
  )
}

export default RadioGroup