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
          toast.warning("Esse email não está cadastrado");
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
          description='Junte-se aos especialistas da moblizae para se aprofundar em nossas últimas atualizações e descbrir seu caminho para o sucesso!' />

        <ColumnText textSide="right" image={defaultPageMoblizaeLogo} text="Moblizae, a plataforma de segmentação do seu público da maneira mais prática e rápida possível. Nós conseguimos segmentar seu público em nichos diferentes, exibindo relatórios e dados importantes para gerenciamento do seu público." />
        <ColumnText textSide="left" image={defaultPageGraphsImage} text="Visualize gráficos importantes sobre seus usuários para ajudar na tomada de decição do seu comércio." />
        <ColumnText textSide="right" image={defaultPageCreatePageImage} text="Crie diversos segmentos com grupos de WhatsApp linkado à página de forma prática, e distribua para o seu públcio, deixando sua comunicação com seu usuário final mais rápida, objetiva e efetiva." />

        <TextContainerFilled title='Começando agora na moblizae?'
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