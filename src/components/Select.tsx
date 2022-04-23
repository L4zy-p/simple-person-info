import React from 'react'
import { Select as AntdSelect, Form as AntdForm } from 'antd'
import { FieldError } from 'react-hook-form'
import { CountryCode } from '../types'

type Props = {
  label: string,
  options: any
  error?: FieldError,
  errormessage: string,
  required?: boolean,
  showSearch?: boolean,
  isCountryCode?: boolean
}

const Select: React.FC<Props> = ({ label, options, error, errormessage, required, showSearch, isCountryCode, ...field }: Props) => {
  return (
    <AntdForm.Item label={label} validateStatus={error && 'error'} required={required}>
      <AntdSelect {...field} showSearch={showSearch}>
        {
          !isCountryCode && options?.map((op: any, i: number) => (
            <AntdSelect.Option key={i} value={op}>{op}</AntdSelect.Option>
          ))
        }
        {
          isCountryCode && options?.map((op: CountryCode, i: number) => (
            <AntdSelect.Option key={i} value={op.dial_code}>
              <span className={`fi fi-${op.code.toLowerCase()}`}></span>
              <span className='country-code'>{op.dial_code}</span>
              </AntdSelect.Option>
          ))
        }
      </AntdSelect>
      {
        error && <div className='ant-form-item-explain-error'>{error?.message || errormessage}</div>
      }
    </AntdForm.Item>
  )
}

export default Select