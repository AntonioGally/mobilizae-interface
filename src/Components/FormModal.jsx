//Libs
import React, { useState } from "react";
import ReactDOM from 'react-dom';

//Components
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

//Scripts
import { useForm } from "react-hook-form";

//Css
import "../styles/formModal.css";

//Data Base
import { db } from "../firebase-config"
import { collection, addDoc } from "firebase/firestore"



const FormModal = ({ show, closeModal, modalImage, groupLink }) => {
  const [radioValue, setRadioValue] = useState(false);
  const { register, formState: { errors }, handleSubmit } = useForm();
  const usersCollectionRef = collection(db, "users");

  async function createUser(obj) {
    await addDoc(usersCollectionRef, obj);
  }

  function onSubmit(value) {
    const newUser = {
      ...value,
      createdDate: new Date(),
      wantReceiveSMS: radioValue,
      groupLink: groupLink
    }
    createUser(newUser).then((data) => {
      window.location.href = groupLink;
    })

  }

  return ReactDOM.createPortal(
    <Modal show={show} onHide={closeModal} centered className="form-modal-container">
      <img src={modalImage} alt="Header logo" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-modal-input-area">
          <div>
            <label className={errors.name ? "text-danger" : ""}>Seu nome:</label>
            <input type="text" {...register("name", {
              required: true,
              pattern: { value: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u },
              minLength: 3
            })} />
          </div>
          <div>
            <label className={errors.email ? "text-danger" : ""}>Seu melhor email:</label>
            <input type="text" {...register("email", {
              required: true,
              // pattern: {
              //   value: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i
              // },
              minLength: 3
            })} />
          </div>
          <div>
            <label className={errors.number ? "text-danger" : ""}>Whatsapp com DDD:</label>
            <input type="text"
              {...register("number", {
                required: true,
                minLength: 11,
                pattern: { value: /^[0-9]+$/ },
              })} />
          </div>
        </div>
        <div className="form-modal-button-area">
          <Form.Check
            style={{ textAlign: 'left' }}
            value={radioValue}
            onChange={() => setRadioValue(!radioValue)}
            type={"checkbox"}
            label={`Aceito receber sms e avisos no meu telefone `}
          />
          <button className="button-container">Confirmar</button>
        </div>
      </form>
    </Modal>, document.getElementById('modal-root')
  )
}

export default FormModal;