import React from "react";
import { Route } from "react-router-dom";

import server from "./http/config";

import Banner from "../Components/Banner.jsx";
import TextContainer from "../Components/TextContainer.jsx";
import Button from "../Components/Button.jsx";
import FooterImage from "../Components/FooterImage.jsx";

export default class PageFactory {

  constructor(props) {
    this.props = props;
  }

  createComponent() {
    const bannerImage = this.props.bannerimage?.indexOf("data:image/") > -1 ? this.props.bannerimage : `${server.host}/getImage/${this.props.bannerimage}`
    const footerImage = this.props.footerimage?.indexOf("data:image/") > -1 ? this.props.footerimage : `${server.host}/getImage/${this.props.footerimage}`
    return (
      <div>
        <Banner content={this.props} imageSrc={this.props.bannerimage != undefined ? bannerImage : ""} />
        <TextContainer titleText={this.props.segmentname} containerText={this.props.containertext} />
        <Button content={this.props} buttonText={this.props.buttontext} modalImage={`${server.host}/getImage/${this.props.footerimage}`}
          modalPageInfo={this.props} groupLink={this.props.grouplink} />
        <FooterImage src={this.props.footerimage != undefined ? footerImage : ""} />
      </div>
    )
  }

  createRoute() {
    return (
      <Route key={this.props.id} path={`/${this.props.pathname}`} component={this.createComponent()} />
    )
  }
}
//bannerimage
//segmentname
//containertext
//buttontext
//footerimage
//grouplink
//pageId