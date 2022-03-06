//Libs
import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import { useForm } from "react-hook-form";

//Components
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { toast } from "react-toastify"

//Scripts
import request from "../scripts/http/request";
import { generateDate } from "../scripts/utils"

//Css
import "../styles/formModal.css";


const FormModal = ({ show, closeModal, modalImage, groupLink, pageInfo, content }) => {
  const [loading, setLoading] = useState(false);
  const [radioValue, setRadioValue] = useState(false);
  const { register, formState: { errors }, handleSubmit } = useForm();



  function onSubmit(value) {
    const newUser = {
      createdAt: generateDate(),
      name: value.name,
      email: value.email,
      number: value.number,
      segmentName: pageInfo.pathname,
      isNewsLetterActive: radioValue,
      groupLink: pageInfo.grouplink,
      pageId: pageInfo.id
    }
    request.post("/users", newUser)
      .then((data) => {
        console.log(data)
        window.location.href = data.data.grouplink
      }).catch((err) => {
        if (err.response.status === 400) {
          toast.warning("Esse email já está cadastrado")
        } else {
          toast.error("Houve algum problema em nossos servidores")
        }
      }).finally(() => {
        setLoading(false);
      })
  }

  useEffect(() => {
    show && request.post("/log/button", {
      segment: content.pathname,
      companyId: content.companyid,
      pageId: content.id,
      viwedAt: new Date() - 3,
      description: "CTA button that stays on auto generated pages"
    })
  }, [show])

  return ReactDOM.createPortal(
    <Modal show={show} onHide={closeModal} centered className="form-modal-container">
      <img src={modalImage} alt="Header logo" />
      <Form onSubmit={handleSubmit(onSubmit)}>
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
          <br />
          {loading && (
            <Spinner animation="border" size="lg" />
          )}
        </div>
      </Form>
    </Modal>, document.getElementById('modal-root')
  )
}

export default FormModal;