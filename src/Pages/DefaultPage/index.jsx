//Libs
import React, { useState } from "react";

//styles
import "./DefaultPage.style.css";

//Componets
import NavbarComponent from "./Components/NavbarComponent";
import InputArea from "./Components/InputArea";
import TextContainerOutline from "./Components/TextContainerOutline";
import TextContainerFilled from "./Components/TextContainerFilled";


const DefaultPage = () => {
  const [subdomainInputValue, setSubdomainInputValue] = useState('');

  function handleButtonClick() {
    console.log("Clicou")
  }

  return (
    <>
      <NavbarComponent />
      <div className="defaul-page-wrapper">
        <InputArea subdomainInputValue={subdomainInputValue} setSubdomainInputValue={setSubdomainInputValue}
          handleButtonClick={handleButtonClick} />
        <TextContainerOutline title='Começando agora na mobilizae?'
          description='Comece sua avaliação grátis! lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ' />
        <TextContainerFilled title='Evento virtual-novidades'
          description='Junte-se aos especialistas da mobilizae para se aprofundar em nossas últimas atualizações e descbrir seu caminho para o sucesso!' />
      </div>
    </>
  )
}

export default DefaultPage;