import React, { useState, useEffect, memo } from "react";

//Components
import { Table, Input } from "antd"
import { FilterOutlined } from '@ant-design/icons';
import { Spinner } from "react-bootstrap";

//Scripts
import { sort } from "../../../../scripts/utils.js";
import { connect } from "react-redux"
import { setUserList } from "../../../../store/actions/admin.js";

// Data Base
import { db } from "../../../../firebase-config";
import { collection, getDocs } from "firebase/firestore"

const ListUser = (props) => {

  const usersCollectionRef = collection(db, "users");

  const [loading, setLoading] = useState(false);
  const [filteredValue, setFilteredValue] = useState({
    name: "",
    email: "",
    number: "",
    wantReceiveSMS: "",
    groupLink: "",
    createdDate: "",
  });


  function getColumnFilterProps(dataIndex) {
    return {
      filterIcon: () => <FilterOutlined style={filteredValue[dataIndex] !== "" ? { color: "#1890ff" } : { color: "#000" }} />,
      onFilter: (value, record) => {
        if (typeof record[dataIndex] === 'boolean') {
          const auxRecordValue = record[dataIndex] ? "Ativo" : "Bloqueado";
          return auxRecordValue.toString().toLowerCase().includes(value.toLowerCase());
        } else if (dataIndex === "createdDate") {
          var date = new Date(Number(record.createdDate?.seconds) * 1000)
          var auxStringDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} - ${date.getHours()}:${date.getSeconds()}`;
          return auxStringDate.toString().toLowerCase().includes(value.toLowerCase());
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

  async function getUsers() {
    setLoading(true);
    const data = await getDocs(usersCollectionRef);
    props.setUserList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setLoading(false);
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
          if (a.wantReceiveSMS) {
            return -1
          } else {
            return 1
          }
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
      className: "list-table-text-ellipsis",
      render: (text) => (
        <a href={text} target="_blank" rel="noreferrer">{text}</a>
      ),
      ...getColumnFilterProps("groupLink"),
    },
    {
      title: 'Segmento',
      dataIndex: 'pagePath',
      key: 'pagePath',
      sorter: {
        compare: (a, b) => sort(a.pagePath, b.pagePath)
      },
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

  useEffect(() => {
    if (!props.userList) {
      getUsers();
    }
  }, [])

  return (
    <>
      {!loading ? (
        <div>
          <h3 className="admin-tab-title">Listar usuários</h3>
          <Table dataSource={props.userList} columns={columns} scroll={{ x: 1200, y: 450 }} rowKey={(record) => record.id}
            pagination={{ showSizeChanger: true, defaultPageSize: 10 }} />
        </div>
      ) : (
        <div style={{ margin: '150px auto', width: 'fit-content' }}>
          <Spinner animation="border" size="lg" />
        </div>
      )}
    </>
  )
}

const mapStateToProps = state => {
  return {
    userList: state.admin.userList
  }
}

const dispatchStateToProps = dispatch => {
  return {
    setUserList: (data) => dispatch(setUserList(data))
  }
}

export default connect(mapStateToProps, dispatchStateToProps)(memo(ListUser));