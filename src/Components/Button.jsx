import React, { useState } from "react";
import "../styles/button.css";
import FormModal from "./FormModal";
const Button = ({ buttonText, modalImage }) => {
  const [show, setShow] = useState(false);
  return (
    <div style={{ textAlign: "center" }}>
      <button className="button-container" onClick={() => setShow(true)}>
        {buttonText ? buttonText : "Quero participar"}
      </button>
      <FormModal show={show} closeModal={() => setShow(false)} modalImage={modalImage} />
    </div>

  )
}

export default Button;