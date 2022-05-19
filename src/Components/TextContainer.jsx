import React from "react";
import "../styles/textContainer.css";
const TextContainer = ({ titleText, containerText }) => {
  return (
    <div className="text-container">
      <h1>
        {titleText}
      </h1>
      <p>
        {containerText ? containerText : 'Descrição'}
      </p>
    </div>
  )
}

export default TextContainer;