import React from "react";
import { Route } from "react-router-dom";

import ReactGA from 'react-ga';

import server from "./http/config";

import Banner from "../Components/Banner.jsx";
import TextContainer from "../Components/TextContainer.jsx";
import Button from "../Components/Button.jsx";
import FooterImage from "../Components/FooterImage.jsx";

export default class PageFactory {



  constructor(props, id) {
    function createComponent() {
      ReactGA.ga('set', 'new_page_path', `/${window.location.hash}`);
      ReactGA.pageview(`/${window.location.hash}`);
      return (
        <div>
          <Banner imageSrc={`${server.host}/getImage/${props.bannerimage}`} />
          <TextContainer titleText={props.segmentname} containerText={props.containertext} />
          <Button buttonText={props.buttontext} modalImage={`${server.host}/getImage/${props.footerimage}`} 
          modalPageInfo={props} groupLink={props.grouplink} />
          
          <FooterImage src={`${server.host}/getImage/${props.footerimage}`} />
        </div>
      )
    }

    return (
      <Route key={id} path={`/${props.pathname}`} component={createComponent} />
    )
  }
}