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

const ListUser = (props) => {
  const [inputFilterValue, setInputFilterValue] = useState('');
  const [filter, setFilter] = useState("all")

  function getTabTemplate() {
    switch (filter) {
      case "all":
        return filterUserList().map((value, index) => (
          <Card key={index} content={value} handleDeleteUser={handleDeleteUser} />
        ))
      case "page":
        return <PageSelector pageList={props.pageList} setPageList={props.setPageList}
          filters={props.filters} setFilters={props.setFilters} />
      default:
        return <h1>Default Option</h1>
    }
  }

  useEffect(() => {
    if (!props.userList) {
      authRequest.get(`users/${props.companyInfo.id}`)
        .then((data) => {
          props.setUserList(data.data);
        })
        .catch((err) => {
          toast.error("Unable to load users")
          console.log(err)
        })
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

  function filterUserList() {
    return props.userList.filter((el) => {
      return el.name.toLowerCase().indexOf(inputFilterValue.toLowerCase()) > -1
    })
  }
  return (
    <>
      <Header filter={filter} setFilter={setFilter} inputFilterValue={inputFilterValue}
        setInputFilterValue={setInputFilterValue} />
      {!props.userList ? (
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