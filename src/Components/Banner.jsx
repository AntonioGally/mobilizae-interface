import React from "react";
import "../styles/banner.css"

const Banner = (props) => {
  return (
    <div className="banner-container" style={{backgroundImage: `url(${props.imageSrc})`}} />
  )
}

export default Banner;