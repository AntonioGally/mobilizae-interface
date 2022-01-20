import React from "react"

const TextContainerFilled = (props) => {
  return (
    <div className="default-page-text-container-filled">
      <h3>{props.title}</h3>
      <span>{props.description}</span>
    </div>
  )
}

export default TextContainerFilled;