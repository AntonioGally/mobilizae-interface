import React from "react";
import { Route } from "react-router-dom";

import server from "./http/config";

import Banner from "../Components/Banner.jsx";
import TextContainer from "../Components/TextContainer.jsx";
import Button from "../Components/Button.jsx";
import ManagerButton from "../Components/ManagerButton.jsx"
import FooterImage from "../Components/FooterImage.jsx";

export default class PageFactory {

  constructor(props, id) {
    function createComponent() {
      return (
        <div>
          <Banner content={props} imageSrc={`${server.host}/getImage/${props.bannerimage}`} />
          <TextContainer titleText={props.segmentname} containerText={props.containertext} />
          <Button content={props} buttonText={props.buttontext} modalImage={`${server.host}/getImage/${props.footerimage}`}
            modalPageInfo={props} groupLink={props.grouplink} />

          <FooterImage src={`${server.host}/getImage/${props.footerimage}`} />
        </div>
      )
    }

    function createManagerComponent() {
      return (
        <div>
          <Banner content={props} imageSrc={`${server.host}/getImage/${props.bannerimage}`} />
          <TextContainer titleText={props.segmentname} containerText={props.containertext} />
          <ManagerButton content={props} buttonText={"Cadastrar usuário"} modalImage={`${server.host}/getImage/${props.footerimage}`}
            modalPageInfo={props} />

          <FooterImage src={`${server.host}/getImage/${props.footerimage}`} />
        </div>
      )
    }

    return (
      <>
        <Route key={id} path={`/${props.pathname}`} component={createComponent} />
        <Route key={`manager-${id}`} path={`/manager/${props.pathname}`} component={createManagerComponent} />
      </>

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