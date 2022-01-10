import React from "react";
import { Route } from "react-router-dom";

import ReactGA from 'react-ga';

import Banner from "./Components/Banner.jsx";
import TextContainer from "./Components/TextContainer.jsx";
import Button from "./Components/Button.jsx";
import FooterImage from "./Components/FooterImage.jsx";

export default class PageFactory {



  constructor({ bannerImage, title, containerText, buttonText,
    footerImage, modalImage, pathName, groupLink }, id) {

    function createComponent() {
      ReactGA.ga('set', 'new_page_path', `/${window.location.hash}`);
      ReactGA.pageview(`/${window.location.hash}`);
      return (
        <div >
          <Banner imageSrc={bannerImage} />
          <TextContainer titleText={title} containerText={containerText} />
          <Button buttonText={buttonText} modalImage={modalImage} groupLink={groupLink} />
          <FooterImage src={footerImage} />
        </div>
      )
    }

    return (
      <Route key={id} path={`/${pathName}`} component={createComponent} />
    )
  }
}