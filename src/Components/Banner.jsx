import React, { useEffect } from "react";
import "../styles/banner.css"

import request from "../scripts/http/request"

const Banner = (props) => {
  useEffect(() => {
    window.location.host.indexOf("localhost") < 0 &&
      request.post("/log/page", {
        segment: props.content.pathname,
        companyId: props.content.companyid,
        pageId: props.content.id,
        viwedAt: new Date() - 3
      });
    
  }, [])
  return (
    <div className="banner-container" style={{ backgroundImage: `url(${props.imageSrc})` }} />
  )
}

export default Banner;