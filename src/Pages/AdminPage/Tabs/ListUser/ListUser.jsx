import React, { useState, useEffect } from "react";
import { connect } from "react-redux"

//Components
import { toast } from "react-toastify";
import Header from "./Components/Header";
import Card from "./Components/Card";
import CardLoader from "../ListPage/Components/CardLoader";

//Store
import { setFilters, setPageList, setUserList } from "../../../../store/actions/admin";

//Scripts
import authRequest from "../../../../scripts/http/authRequest";

//Css
import "./ListUser.style.css"
import PageSelector from "./Components/PageSelector";
import Table from "./Components/Table";

const ListUser = (props) => {
  const [inputFilterValue, setInputFilterValue] = useState('');
  const [filter, setFilter] = useState("all");
  const [visualizationType, setVisualizationType] = useState('cards');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.filters?.selectedPage) {
      setFilter("page")
    }
  }, [])

  function getTabTemplate() {
    switch (filter) {
      case "all":
        if (props.userList?.length > 0) {
          return visualizationType === "table" ? (<Table dataSource={props.userList} />) :
            filterUserList(props.userList).map((value, index) => (
              <Card key={index} content={value} handleDeleteUser={handleDeleteUser} />
            ))
        } else {
          return <div style={{ textAlign: 'center', fontSize: 20 }}>Nenhum usuário encontrado</div>
        }

      case "page":
        return <PageSelector pageList={props.pageList} setPageList={props.setPageList}
          filters={props.filters} setFilters={props.setFilters} filterUserList={filterUserList} />
      default:
        return <h1>Default Option</h1>
    }
  }

  function getUsers() {
    setLoading(true)
    return new Promise((resolve, reject) => {
      authRequest.get(`users/${props.companyInfo.id}`)
        .then((data) => {
          props.setUserList(data.data);
          resolve(data.data)
        })
        .catch((err) => {
          reject(err);
          console.log(err)
          toast.error("Unable to load users")
        }).finally(() => {
          setLoading(false);
        })
    })
  }

  useEffect(() => {
    if (!props.userList) {
      getUsers()
    }
  }, [])

  function handleDeleteUser(content) {
    authRequest.delete(`/users/${content.id}`)
      .then(() => {
        var newArr = props.userList.slice();
        newArr = newArr.filter((el) => el.id !== content.id);
        props.setUserList(newArr);
        toast.success("Usuário deletado com sucesso")
      })
      .catch((err) => {
        toast.error("Houve algum erro ao deletar usuário")
      })

  }

  function filterUserList(arr) {
    return arr.filter((el) => {
      return el.name.toLowerCase().indexOf(inputFilterValue.toLowerCase()) > -1
    })
  }
  return (
    <>
      <Header filter={filter} setFilter={setFilter} inputFilterValue={inputFilterValue}
        setInputFilterValue={setInputFilterValue} usersArray={props.userList} getUsers={getUsers}
        visualizationType={visualizationType} setVisualizationType={setVisualizationType} />
      {!props.userList || loading ? (
        <CardLoader />
      ) : (
        <>
          {getTabTemplate()}
        </>
      )}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    companyInfo: state.company.companyInfo,
    userList: state.admin.userList,
    pageList: state.admin.pageList,
    filters: state.admin.filters
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUserList: (data) => dispatch(setUserList(data)),
    setPageList: (data) => dispatch(setPageList(data)),
    setFilters: (data) => dispatch(setFilters(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListUser);