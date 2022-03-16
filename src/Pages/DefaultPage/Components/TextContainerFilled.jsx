import React from "react"

const TextContainerFilled = (props) => {
  return (
    <div className="default-page-text-container-filled">
      <h3>{props.title}</h3>
      <span>{props.description} {props.email && <a style={{ color: "white" }} href={`mailto:${props.email}`} target="_blank" rel="noreferrer">{props.email}</a>}</span>
    </div>
  )
}

export default TextContainerFilled;