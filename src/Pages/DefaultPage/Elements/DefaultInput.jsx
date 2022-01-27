import React from "react"

import "./Elements.style.css"

const DefaultInput = (props) => {
  return (
    <div className="password-input subdomain-input" style={{ marginBottom: 0 }}>
      <input {...props} />
    </div>
  )
}

export default DefaultInput