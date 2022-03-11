import React, { forwardRef } from "react"

import "./Elements.style.css"

const DefaultInput = forwardRef((props, ref) => {
  return (
    <div className="password-input subdomain-input" style={{ marginBottom: 0 }}>
      <input {...props} ref={ref} />
    </div>
  )
})

export default DefaultInput