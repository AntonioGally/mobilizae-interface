//Libs
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

//styles
import "./DefaultPage.style.css";

//Componets
import NavbarComponent from "./Components/NavbarComponent";
import InputArea from "./Components/InputArea";
import TextContainerOutline from "./Components/TextContainerOutline";
import TextContainerFilled from "./Components/TextContainerFilled";
import ModalLogin from "./Components/ModalLogin";


const DefaultPage = () => {
  const history = useHistory()
  const [subdomainInputValue, setSubdomainInputValue] = useState('');
  const [passwordInputValue, setPasswordInputValue] = useState('');
  const [showModal, setShowModal] = useState(false);

  function handleNextButtonClick() {
    setShowModal(true)
  }

  function handleLoginButtonClick() {
    console.log("Clicou")
    history.push("/admin");
  }

  return (
    <>
      <NavbarComponent />
      <div className="defaul-page-wrapper">
        <InputArea subdomainInputValue={subdomainInputValue} setSubdomainInputValue={setSubdomainInputValue}
          handleButtonClick={handleNextButtonClick} />

        <TextContainerOutline title='Começando agora na mobilizae?'
          description='Comece sua avaliação grátis! lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ' />

        <TextContainerFilled title='Evento virtual-novidades'
          description='Junte-se aos especialistas da mobilizae para se aprofundar em nossas últimas atualizações e descbrir seu caminho para o sucesso!' />

        <ModalLogin showModal={showModal} setShowModal={setShowModal} subdomainInputValue={subdomainInputValue}
          passwordInputValue={passwordInputValue} setPasswordInputValue={setPasswordInputValue}
          handleLoginButtonClick={handleLoginButtonClick} />
      </div>
    </>
  )
}

export default DefaultPage;