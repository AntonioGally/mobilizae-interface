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
  const [filter, setFilter] = useState("all")

  function getTabTemplate() {
    switch (filter) {
      case "all":
        return props.userList.map((value, index) => (
          <Card key={index} content={value} onCardClick={onCardClick} />
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

  function onCardClick(content) {
    console.log(content)
  }
  return (
    <>
      <Header filter={filter} setFilter={setFilter} />
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