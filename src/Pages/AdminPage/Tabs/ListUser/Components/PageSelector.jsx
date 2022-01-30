import React, { useEffect, useState } from "react";

//Components
import { Form } from "react-bootstrap"
import { toast } from "react-toastify"
import Card from "./Card"
import CardLoader from "../../ListPage/Components/CardLoader"

//Scripts
import authRequest from "../../../../../scripts/http/authRequest"

const PageSelector = (props) => {
  const [users, setUsers] = useState([])

  function onCardClick(pageId) {
    console.log(pageId)
    // getUsers(pageId)
  }

  function getUsers(pageId) {
    authRequest.get(`/usersByPage/${pageId}/false`)
      .then((data) => {
        props.setFilters({ ...props.filters, selectedPage: { pageId, filteredUsers: data.data } })
      })
      .catch((err) => {
        toast.error("Unable to get user by page")
        console.log(err)
      })
  }

  // useEffect(() => {
  //   if (props.filters?.selectedPage) {

  //   }

  // }, [props.filters])

  return (
    <>
      <span className='secondary-title'>
        Selecione a página
      </span>

      {props.pageList && (
        <div style={{ marginBottom: 25 }}>
          <Form.Select onChange={(e) => { getUsers(e.target.value) }}>
            <option>Selecionar....</option>
            {props.pageList?.map((value, index) => (
              <option key={index} value={value.id}>{value.segmentname}</option>
            ))}
          </Form.Select>
        </div>
      )}

      {props.filters?.selectedPage?.filteredUsers?.map((value, index) => (
        <Card content={value} key={index} pageList={props.pageList}
          setPageList={props.setPageList}
          onCardClick={onCardClick} index={index} />
      ))}
    </>
  )
}

export default PageSelector;