import React, { useState } from "react";
import { Table, Input } from "antd"
import { FilterOutlined } from '@ant-design/icons';

import { sort } from "../../../../scripts/utils.js";

const ListUser = ({ users }) => {

  const [filteredValue, setFilteredValue] = useState({
    name: "",
    email: "",
    number: "",
    wantReceiveSMS: "",
    groupLink: "",
    createdDate: "",
  });


  const getColumnFilterProps = (dataIndex) => {
    return {
      filterIcon: () => <FilterOutlined style={filteredValue[dataIndex] !== "" ? { color: "#1890ff" } : { color: "#000" }} />,
      onFilter: (value, record) => {
        if (typeof record[dataIndex] === 'boolean') {
          const auxRecordValue = record[dataIndex] ? "Ativo" : "Bloqueado";
          return auxRecordValue.toString().toLowerCase().includes(value.toLowerCase());
        }
        return record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : "";
      },
      filteredValue: [filteredValue[dataIndex]] || null,
      filterDropdown: () => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder={`Search in this column`}
            value={filteredValue[dataIndex]}
            onChange={e => setFilteredValue((prevState) => { return { ...prevState, [dataIndex]: e.target.value } })}
            style={{ marginBottom: 8, display: 'block' }}
          />
        </div>
      ),
    }
  }

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      ...getColumnFilterProps("name"),
      sorter: {
        compare: (a, b) => sort(a.name, b.name)
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: {
        compare: (a, b) => sort(a.email, b.email)
      },
      ...getColumnFilterProps("email"),
    },
    {
      title: 'Número',
      dataIndex: 'number',
      key: 'number',
      sorter: (a, b) => a.number - b.number,
      ...getColumnFilterProps("number"),
    },
    {
      title: 'SMS',
      dataIndex: 'wantReceiveSMS',
      key: 'wantReceiveSMS',
      sorter: {
        compare: (a, b) => {
          console.log(a, b);
           sort(a.wantReceiveSMS, b.wantReceiveSMS)
        }
      },
      ...getColumnFilterProps("wantReceiveSMS"),
      render: (text) => {
        if (text === true) {
          return "Ativado"
        } else {
          return "Bloqueado"
        }
      }
    },
    {
      title: 'Grupo',
      dataIndex: 'groupLink',
      key: 'groupLink',
      sorter: {
        compare: (a, b) => sort(a.groupLink, b.groupLink)
      },
      render: (text) => (
        <a href={text} target="_blank" rel="noreferrer">{text}</a>
      ),
      ...getColumnFilterProps("groupLink"),
    },
    {
      title: 'Data de cadastro',
      dataIndex: 'createdDate',
      key: 'createdDate',
      ...getColumnFilterProps("createdDate"),
      sorter: (a, b) => new Date(Number(a.createdDate?.seconds) * 1000) - new Date(Number(b.createdDate?.seconds) * 1000),
      render: (text) => {
        if (!text) {
          return "-"
        } else {
          var date = new Date(Number(text?.seconds) * 1000)
          return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} - ${date.getHours()}:${date.getSeconds()}`
        }
      }
    }
  ]

  return (
    <>
      {users && (
        <div>
          <h3 onClick={() => console.log(users)}>Listar usuários</h3>
          <Table dataSource={users} columns={columns} scroll={{ x: 'auto' }} pagination={{ showSizeChanger: true, defaultPageSize: 50 }} />
        </div>
      )}
    </>
  )
}

export default ListUser;