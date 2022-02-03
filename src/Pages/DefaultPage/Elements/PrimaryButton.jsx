import React from "react";

import "./Elements.style.css"

const PrimaryButton = (props) => {
  return (
    <button type={props.type} className="primary-button"
      onClick={props.onClick} style={props.style}>{props.text}</button>
  )
};

export default PrimaryButton