import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { mockedData } from "../utils"


const DefaultPage = () => {
  const history = useHistory();
  useEffect(() => {
    history.push(`/${mockedData[0].pathName}`)
  })
  return (
    <h1>This is a default page</h1>
  )
}

export default DefaultPage;