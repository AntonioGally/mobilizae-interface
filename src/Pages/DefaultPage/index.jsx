import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getPages } from "../../scripts/utils"
import { Spinner } from "react-bootstrap"


const DefaultPage = () => {
  const history = useHistory();
  useEffect(() => {
    getPages().then((data) => {
      history.push(`/${data[0].pathName}`)
    })
  })
  return (
    <div style={{ margin: '150px auto', width: 'fit-content' }}>
      <Spinner animation="border" size="lg" />
    </div>
  )
}

export default DefaultPage;