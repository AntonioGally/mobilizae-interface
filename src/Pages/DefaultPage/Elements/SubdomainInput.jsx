import React from "react"

import "./Elements.style.css"

const SubdomainInput = (props) => {
  return (
    <div className="subdomain-input">
      <input {...props} />
      <div>.mobilizae.com</div>
    </div>
  )
}

export default SubdomainInput