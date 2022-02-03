//Libs
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { connect } from "react-redux"

//Script
import request from "../../scripts/http/request";

//Action
import { setAdminInfo } from "../../store/actions/admin"

//styles
import "./DefaultPage.style.css";

//Componets
import NavbarComponent from "./Components/NavbarComponent";
import InputArea from "./Components/InputArea";
import TextContainerOutline from "./Components/TextContainerOutline";
import TextContainerFilled from "./Components/TextContainerFilled";
import ModalLogin from "./Components/ModalLogin";


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
        localStorage.setItem("access_token", data.accessToken);
        props.setAdminInfo(data.user);
        history.push("/admin");
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

  return (
    <>
      <NavbarComponent />
      <div className="defaul-page-wrapper">
        <InputArea emailInput={emailInput} setEmailInput={setEmailInput}
          handleButtonClick={handleNextButtonClick} />

        <TextContainerOutline title='Começando agora na mobilizae?'
          description='Comece sua avaliação grátis! lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ' />

        <TextContainerFilled title='Evento virtual-novidades'
          description='Junte-se aos especialistas da mobilizae para se aprofundar em nossas últimas atualizações e descbrir seu caminho para o sucesso!' />

        <ModalLogin showModal={showModal} setShowModal={setShowModal} emailInput={emailInput}
          passwordInputValue={passwordInputValue} setPasswordInputValue={setPasswordInputValue}
          handleLoginButtonClick={handleLoginButtonClick} />
      </div>
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    setAdminInfo: (data) => (dispatch(setAdminInfo(data)))
  }
}

export default connect(null, mapDispatchToProps)(DefaultPage);