import React from "react";
import { Route } from "react-router-dom";

import Banner from "./Components/Banner.jsx";
import TextContainer from "./Components/TextContainer.jsx";
import Button from "./Components/Button.jsx";
import FooterImage from "./Components/FooterImage.jsx";

export default class PageFactory {



  constructor({ bannerImage, district, title, containerText, buttonText,
    footerImage, modalImage, pathName, groupLink }) {

    function createComponent() {
      return (
        <div>
          <Banner imageSrc={bannerImage} />
          <TextContainer district={district} titleText={title} containerText={containerText} />
          <Button buttonText={buttonText} modalImage={modalImage} groupLink={groupLink} />
          <FooterImage src={footerImage} />
        </div>
      )
    }

    return (
      <Route path={`/${pathName}`} component={createComponent} />
    )
  }
}