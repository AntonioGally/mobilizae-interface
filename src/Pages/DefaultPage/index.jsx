//Libs
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { connect } from "react-redux"

//Script
import request from "../../scripts/http/request";
import server from "../../scripts/http/config";

//Action
import { setAdminInfo, setPageList } from "../../store/actions/admin"

//styles
import "./DefaultPage.style.css";

//Assets
import defaultPageGraphsImage from "../../assets/images/defaultPageGraphsImage.png";
import defaultPageCreatePageImage from "../../assets/images/defaultPageCreatePageImage.png";
import defaultPageMoblizaeLogo from "../../assets/images/defaultPageMoblizaeLogo.png";
import defaulPageListUser from "../../assets/images/defaulPageListUser.png";

//Componets
import NavbarComponent from "./Components/NavbarComponent";
import InputArea from "./Components/InputArea";
import TextContainerOutline from "./Components/TextContainerOutline";
import TextContainerFilled from "./Components/TextContainerFilled";
import ColumnText from "./Components/ColumnText";
import ModalLogin from "./Components/ModalLogin";
import { setCompanyInfo } from "../../store/actions/company";


const DefaultPage = (props) => {
  const history = useHistory();
  const [emailInput, setEmailInput] = useState('');
  const [passwordInputValue, setPasswordInputValue] = useState('');
  const [showModal, setShowModal] = useState(false);

  function login() {
    return new Promise((resolve, reject) => {
      request.post("/login", { email: emailInput, password: passwordInputValue })
        .then((data) => { resolve(data.data) })
        .catch((err) => { reject(err) })
    })
  }

  function handleNextButtonClick() {
    setShowModal(true)
  }

  function handleLoginButtonClick() {
    if (emailInput.trim().length > 0 && passwordInputValue.trim().length > 0) {
      login().then((data) => {
        var url = server.host.indexOf("localhost") > -1 ? "http://localhost:3000" : `https://${data.user.company_subdomain}.mobilizae.com.br`
        window.location.href = `${url}/#/?access_token=${data.accessToken}&u=${JSON.stringify(data.user)}`
      }).catch((err) => {
        if (err.request.status === 400) {
          toast.warning("Esse email n??o est?? cadastrado");
        } else if (err.request.status === 403) {
          toast.warning("Email ou senha incorretos");
        }
      })
    } else {
      toast.error("Preencha os campos de login");
    }
  }

  function getCompanyInfo() {
    return new Promise((resolve, reject) => {
      var host = window.location.host
      var subdomain = host.split('.')[0];
      if (
        subdomain === undefined
        || subdomain === "www"
        || subdomain.indexOf("localhost") > -1
        || subdomain.indexOf("mobilizae") > -1
      ) {
        subdomain = "antoniogally"
      }
      console.log("Getting data from -> ", host, subdomain)
      request.get(`/companyInfo/${subdomain}`)
        .then((data) => { resolve(data.data); })
        .catch((err) => { reject(err); })
    })
  }

  function getPages(companyId) {
    return new Promise((resolve, reject) => {
      request.get(`/public/pages/${companyId}`)
        .then((data) => { resolve(data.data) })
        .catch((err) => { reject(err) })
    })
  }

  useEffect(() => {
    var data = history.location.search?.split("access_token=")[1]?.split("&u=");
    if (data) {
      props.setAdminInfo(JSON.parse(window.decodeURI(data[1])))
      getCompanyInfo().then((data) => {
        props.setCompanyInfo(data);
        getPages(data.id).then((data) => {
          props.setPageList(data);
        })
      });
      localStorage.setItem("access_token", data[0]);
      history.push("/admin")
    }
  }, [history, props])

  return (
    <>
      <NavbarComponent />
      <div className="defaul-page-wrapper">
        <InputArea emailInput={emailInput} setEmailInput={setEmailInput}
          handleButtonClick={handleNextButtonClick} />

        <TextContainerFilled title='Evento virtual-novidades'
          description='Junte-se aos especialistas da moblizae para se aprofundar em nossas ??ltimas atualiza????es e descbrir seu caminho para o sucesso!' />

        <ColumnText textSide="right" image={defaultPageMoblizaeLogo} text="Moblizae, a plataforma de segmenta????o do seu p??blico da maneira mais pr??tica e r??pida poss??vel. N??s conseguimos segmentar seu p??blico em nichos diferentes, exibindo relat??rios e dados importantes para gerenciamento do seu p??blico." />
        <ColumnText textSide="left" image={defaultPageGraphsImage} text="Visualize gr??ficos importantes sobre seus usu??rios para ajudar na tomada de deci????o do seu com??rcio." />
        <ColumnText textSide="right" image={defaultPageCreatePageImage} text="Crie diversos segmentos com grupos de WhatsApp linkado ?? p??gina de forma pr??tica, e distribua para o seu p??blcio, deixando sua comunica????o com seu usu??rio final mais r??pida, objetiva e efetiva." />
        <ColumnText textSide="left" image={defaulPageListUser} text="Tenha as informa????es dos usu??rios na palma da m??o" />

        <TextContainerFilled title='Come??ando agora na moblizae?'
          description='Entre em contato conosco. ' email="antonio.gally@gmail.com"/>

        <ModalLogin showModal={showModal} setShowModal={setShowModal} emailInput={emailInput}
          passwordInputValue={passwordInputValue} setPasswordInputValue={setPasswordInputValue}
          handleLoginButtonClick={handleLoginButtonClick} />
      </div>
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    setCompanyInfo: (data) => dispatch(setCompanyInfo(data)),
    setAdminInfo: (data) => dispatch(setAdminInfo(data)),
    setPageList: (data) => dispatch(setPageList(data))
  }
}

export default connect(null, mapDispatchToProps)(DefaultPage);