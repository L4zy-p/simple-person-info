import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Row, Col, Card, Button, Spin} from 'antd'
import moment from 'moment'
import { v4 as uuiv4 } from 'uuid'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { useAppDispatch } from '../app/hook'
import { addPerson, editPerson } from '../features/persons/persons-slice'

import { Person } from '../types'

import Input from './Input'
import Select from './Select'
import DatePicker from './DatePicker'
import RadioGroup from './RadioGroup'

import titles from '../mock/title.json'
import gender from '../mock/gender.json'
import nationality from '../mock/nationlity.json'
import countryCode from '../mock/countryCode.json'




type IFormValues = Person

type Props = {
  defaultValues?: Person,
  setDefaultValues?: (values: any) => void
}

const schema = yup.object({
  title: yup.string().required('require'),
  firstName: yup.string().matches(/^[a-z]+$/, 'Must be only alphabet').required('require'),
  lastName: yup.string().matches(/^[a-z]+$/, 'Must be only alphabet').required('require'),
  birthDay: yup.date().required('require'),
  phoneCountryCode: yup.string().required('require'),
  phoneNumber: yup.string().matches(/^[0-9]+$/, 'Must be only digits')
  .min(9, 'Must be exactly 9 digits')
  .max(9, 'Must be exactly 9 digits').required('require'),
  expectedSalary: yup.string().matches(/^[0-9]+$/, 'Must be only digits').required('require'),
})

const PersonForm: React.FC<Props> = ({ defaultValues, setDefaultValues }: Props) => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm<IFormValues>({
    resolver: yupResolver(schema)
  })
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)

  const onSubmit = (data: IFormValues) => {
    setLoading(true)
    if (data?.id) {
      dispatch(editPerson({ ...data, birthDay: moment(data.birthDay).format('YYYY-MM-DD') }))
    } else {
      dispatch(addPerson({ ...data, id: uuiv4(), birthDay: moment(data.birthDay).format('YYYY-MM-DD') }))
    }
    setTimeout(() => {
      reset()
      setLoading(false)
    }, 300)
  }

  useEffect(() => {
    if (defaultValues) {
      reset({ ...defaultValues, birthDay: defaultValues?.birthDay ? moment(defaultValues?.birthDay) : null })
    }
  }, [defaultValues])

  return (
    <Row gutter={[16, 16]} justify='center' className='container'>
      <Col lg={16} md={18} sm={20} xs={24}>
        <Card>
          {
            loading && <div className='ant-modal-mask'><Spin className='loading'/></div>
          }
          <h1 className='title-card'>Personal Infomation</h1>
          <form className='ant-form ant-form-horizontal' onSubmit={handleSubmit(onSubmit)} >
            <Row gutter={[10,0]}>
              <Col lg={4} md={7} sm={9}>
                <Controller
                  name='title'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Select
                    label='Title'
                    options={titles}
                    error={errors.title}
                    errormessage='require'
                    required
                    {...field} />}
                />
              </Col>
              <Col lg={10} md={17} sm={24} xs={24}>
                <Controller
                  name='firstName'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Input
                    label='Firstname'
                    error={errors.firstName}
                    errormessage='require'
                    required
                    {...field} />}
                />
              </Col>
              <Col lg={10} md={17} sm={24} xs={24}>
                <Controller
                  name='lastName'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Input
                    label='Lastname'
                    error={errors.lastName}
                    errormessage='require'
                    required
                    {...field} />}
                />
              </Col>
            </Row>
            <Row gutter={[10,0]}>
              <Col lg={8} md={10} sm={14} xs={14}>
                <Controller
                  name='birthDay'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <DatePicker
                    label='Birthday'
                    error={errors.birthDay}
                    errormessage='require'
                    required
                    {...field} />}
                />
              </Col>
              <Col lg={16} md={14} sm={24} xs={24}>
                <Controller
                  name='nationality'
                  control={control}
                  render={({ field }) => <Select
                    label='Nationality'
                    options={nationality}
                    error={errors.nationality}
                    errormessage='require'
                    showSearch
                    {...field} />}
                />
              </Col>
            </Row>
            <Row gutter={[8,0]}>
              <Col lg={16} md={14} sm={24} xs={24}>
                <Controller
                  name='citizenId'
                  control={control}
                  render={({ field }) => <Input
                    label='Citizen ID'
                    error={errors.citizenId}
                    errormessage='require'
                    {...field} />}
                />
              </Col>
            </Row>
            <Row gutter={[8,0]}>
              <Col span={24}>
                <Controller
                  name='gender'
                  control={control}
                  render={({ field }) => <RadioGroup
                    label='Gender'
                    options={gender}
                    error={errors.gender}
                    errormessage='require'
                    {...field} />}
                />
              </Col>
            </Row>
            <Row gutter={[8,0]} align='top'>
              <Col lg={6} md={8} sm={8} xs={8}>
                <Controller
                  name='phoneCountryCode'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Select
                    label='Phone'
                    options={countryCode}
                    error={errors.phoneCountryCode}
                    errormessage='require'
                    showSearch
                    required
                    isCountryCode
                    {...field} />}
                />
              </Col>
              <Col lg={10} md={8} sm={12} xs={24}>
                <Controller
                  name='phoneNumber'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Input
                    label=''
                    error={errors.phoneNumber}
                    errormessage='require'
                    required
                    {...field} />}
                />
              </Col>
            </Row>
            <Row gutter={[8,0]}>
              <Col lg={14} md={16} sm={24} xs={24}>
                <Controller
                  name='passport'
                  control={control}
                  render={({ field }) => <Input
                    label='Passport No'
                    error={errors.passport}
                    errormessage='require'
                    {...field} />}
                />
              </Col>
            </Row>
            <Row gutter={[8,0]}>
              <Col lg={12} md={14} sm={20} xs={16}>
                <Controller
                  name='expectedSalary'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Input
                    label='Expected Salary'
                    error={errors.expectedSalary}
                    errormessage='require'
                    required
                    {...field} />}
                />
              </Col>
            </Row>
            <Row justify='end' align='bottom' gutter={[8,0]}>
              <Col>
                <Button htmlType='button' type='link' onClick={() => setDefaultValues && setDefaultValues({})}>Reset</Button>
              </Col>
              <Col>
                <Button size='large' htmlType='submit' type='primary'>{defaultValues?.id ? 'Edit' : 'Submit'}</Button>
              </Col>
            </Row>

          </form>
        </Card>
      </Col>
    </Row>
  )
}

export default PersonForm