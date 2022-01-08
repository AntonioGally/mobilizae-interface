import React from "react";
import "../styles/button.css";
const Button = ({ buttonText }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <button className="button-container">
        {buttonText ? buttonText : "Quero participar"}
      </button>
    </div>

  )
}

export default Button;