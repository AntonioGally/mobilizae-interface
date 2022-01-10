import React, { useState } from "react";
import { Table, Input } from "antd"
import { FilterOutlined } from '@ant-design/icons';

import { sort } from "../../utils.js";


const ListPage = ({ pages }) => {
  const [filteredValue, setFilteredValue] = useState({
    groupLink: "",
    createdDate: "",
    pathName: "",
  });

  const getColumnFilterProps = (dataIndex) => {
    return {
      filterIcon: () => <FilterOutlined style={filteredValue[dataIndex] !== "" ? { color: "#1890ff" } : { color: "#000" }} />,
      onFilter: (value, record) => {
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
      title: 'Link whatsApp atrelado',
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
      sorter: (a, b) => {
        return new Date(Number(a.createdDate?.seconds) * 1000) - new Date(Number(b.createdDate?.seconds) * 1000)
      },
      render: (text) => {
        if (!text) {
          return "-"
        } else {
          var date = new Date(Number(text.seconds) * 1000)
          return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} - ${date.getHours()}:${date.getSeconds()}`
        }
      },
    },
    {
      title: 'Link da página',
      dataIndex: 'pathName',
      key: 'pathName',
      sorter: {
        compare: (a, b) => sort(a.pathName, b.pathName)
      },
      render: (text) => (
        <a href={`/#/${text}`} alt="page link" target="_blank" rel="noreferrer">{text}</a>
      ),
      ...getColumnFilterProps("pathName"),
    },
  ]

  return (
    <>
      {pages && (
        <div>
          <h3>Listar páginas</h3>
          <Table dataSource={pages} columns={columns} scroll={{ x: 'auto' }} pagination={{ showSizeChanger: true, defaultPageSize: 50 }} />
        </div>
      )}
    </>
  )
}

export default ListPage;