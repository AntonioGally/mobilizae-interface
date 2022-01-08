import React from "react";
import "../styles/footerImage.css";
const FooterImage = ({ src }) => {
  return (
    <div className="footer-image-container">
      <div />
      <img src={src} alt="Footer" />
    </div>
  )
}

export default FooterImage;