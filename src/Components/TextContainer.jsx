import React from "react";
import "../styles/textContainer.css";
const TextContainer = ({ district, containerText }) => {
  return (
    <div className="text-container">
      <h1>
        Programa a casa é minha no {district}
      </h1>
      <p>
        {containerText ? containerText : 'O novo programa irá acolher 500 novas famílias. Participe do grupo e saiba mais'}
      </p>
    </div>
  )
}

export default TextContainer;