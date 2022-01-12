import React, { useState, useEffect } from "react";

//Components
import { Table, Input } from "antd"
import { FilterOutlined } from '@ant-design/icons';
import { Spinner } from "react-bootstrap";

//Scripts
import { sort } from "../../../../scripts/utils.js";

// Data Base
import { db } from "../../../../firebase-config";
import { collection, getDocs } from "firebase/firestore"


const ListPage = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);
  const pagesCollectionRef = collection(db, "pages");

  const [filteredValue, setFilteredValue] = useState({
    groupLink: "",
    createdDate: "",
    pathName: "",
  });

  async function getPages() {
    setLoading(true);
    const data = await getDocs(pagesCollectionRef);
    setPages(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setLoading(false);
  }

  function getColumnFilterProps(dataIndex) {
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

  useEffect(() => {
    getPages();
  }, [])

  return (
    <>
      {!loading ? (
        <div>
          <h3>Listar páginas</h3>
          <Table dataSource={pages} columns={columns} scroll={{ x: 'auto' }} rowKey={(record) => record.id}
            pagination={{ showSizeChanger: true, defaultPageSize: 50 }} />
        </div>
      ) : (
        <div style={{ margin: '150px auto', width: 'fit-content' }}>
          <Spinner animation="border" size="lg" />
        </div>
      )}
    </>
  )
}

export default ListPage;