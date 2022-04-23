import React, { useState } from 'react'
import { Table as AntdTable, Row, Col, Button, Modal, Card } from 'antd'
import { useAppDispatch, useAppSelector } from '../app/hook'
import { Person } from '../types'
import { deletePerson, deletePersonSelected } from '../features/persons/persons-slice'

type Props = {
  edit: (id: string) => void
}

const { confirm } = Modal

const Table: React.FC<Props> = ({ edit }: Props) => {
  const persons = useAppSelector((state) => state.persons.data)
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([])
  const dispatch = useAppDispatch()

  const rowSelection: any = {
    selectedRowKeys,
    onChange: (keys: string) => setSelectedRowKeys(keys),
  }

  const delPerson = (id: string, name: string) => {
    confirm({
      title: `Do you want to delete ${name}?`,
      icon: false,
      content: 'If you delete the data, it cannot be recovered.',
      onOk() {
        dispatch(deletePerson(id))
      },
      onCancel() {
        return
      },
    })
  }

  const delPersonSelected = () => {
    confirm({
      title: `Do you want to delete all you selected?`,
      icon: false,
      content: 'If you delete the data, it cannot be recovered.',
      onOk() {
        dispatch(deletePersonSelected(selectedRowKeys))
      },
      onCancel() {
        return
      },
    })
  }

  const columns: any = [
    {
      title: 'Name',
      fixed: 'left',
      render: (row: Person) => <>{row?.firstName} {row?.lastName}</>,
      sorter: (a: Person, b: Person) => {
        if (a.firstName < b.firstName) { return -1; }
        if (a.firstName > b.firstName) { return 1; }
        return 0;
      },
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      sorter: (a: Person, b: Person) => {
        if (a?.gender && b?.gender) {
          if (a.gender < b.gender) { return -1; }
          if (a.gender > b.gender) { return 1; }
          return 0;
        }
      },
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Mobile Phone',
      render: (row: Person) => <>{row?.phoneCountryCode}{row?.phoneNumber}</>,
      sorter: (a: Person, b: Person) => {
        if (a.phoneCountryCode < b.phoneCountryCode) { return -1; }
        if (a.phoneCountryCode > b.phoneCountryCode) { return 1; }
        return 0;
      },
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Nationality',
      dataIndex: 'nationality',
      sorter: (a: Person, b: Person) => {
        if (a?.nationality && b?.nationality) {
          if (a.nationality < b.nationality) { return -1; }
          if (a.nationality > b.nationality) { return 1; }
          return 0;
        }
      },
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: '',
      width: '20%',
      render: (row: Person) => <>
        <Button type='link' onClick={() => edit(row?.id || '')}>Edit</Button>/
        <Button type='link' onClick={() => delPerson(row?.id || '', `${row.firstName} ${row.lastName}`)}>Delete</Button>
      </>
    }
  ]

  return (
    <Row gutter={[16, 16]} justify='center' className='container'>
      <Col lg={16} md={18} sm={20} xs={24}>
        {
          persons.length !== 0 &&
          <Button danger className='button-delete' onClick={delPersonSelected} disabled={selectedRowKeys.length === 0}>Delete Selected</Button>
        }
        <Card>

        <AntdTable
          rowKey='id'
          rowSelection={rowSelection}
          columns={columns}
          dataSource={persons}
          pagination={{
            position: ['topRight'],
            defaultPageSize: 5
          }}
          scroll={{ x: 800 }}
        />
        </Card>
      </Col>
    </Row>
  )
}

export default Table