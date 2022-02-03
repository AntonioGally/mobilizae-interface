import React from "react"

const TextContainerOutline = (props) => {
  return (
    <div className="default-page-text-container-outline">
      <h3>{props.title}</h3>
      <span>{props.description}</span>
    </div>
  )
}

export default TextContainerOutline;