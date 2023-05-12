import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import { useForm } from "react-hook-form";

//Components
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { toast } from "react-toastify";

//Scripts
import request from "../scripts/http/request";
import { generateDate } from "../scripts/utils";

//Css
import "../styles/formModal.css";



const ManagerFormModal = ({ show, closeModal, modalImage, pageInfo, content }) => {
    const [loading, setLoading] = useState(false);
    const [radioValue, setRadioValue] = useState(false);
    const [wppLink, setWppLink] = useState("");
    const { register, formState: { errors }, handleSubmit, reset, clearErrors } = useForm();


    function onSubmit(value) {
        const newUser = {
            createdAt: generateDate(),
            name: value.name,
            email: value.email,
            number: value.number,
            segmentName: pageInfo.pathname,
            isNewsLetterActive: radioValue,
            groupLink: pageInfo.grouplink,
            pageId: pageInfo.id,
            invitedBy: value.invitedBy
        }
        request.post("/users", newUser)
            .then((data) => {
                setWppLink(`https://wa.me/${value.number}`)
                toast.success("Usuário cadastrado com sucesso!");
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
                        <label className={errors.email ? "text-danger" : ""}>Email:</label>
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
                    <div>
                        <label className={errors.email ? "text-danger" : ""}>Convidado por:</label>
                        <input type="text" {...register("invitedBy", {
                            required: true,
                            // pattern: {
                            //   value: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i
                            // },
                            minLength: 3
                        })} />
                    </div>
                </div>
                <div className="form-modal-button-area">
                    <Form.Check
                        style={{ textAlign: 'left' }}
                        value={radioValue}
                        onChange={() => setRadioValue(!radioValue)}
                        type={"checkbox"}
                        defaultChecked={true}
                        label={`Aceita receber sms e avisos no telefone?`}
                    />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        {wppLink.trim().length !== 0 && (
                            <a href={wppLink} style={{ fontSize: 16 }} target="_blank" rel="noreferrer">Mande mensagem para o usuário</a>
                        )}
                        <div>
                            <button onClick={() => { reset(); clearErrors() }} className="button-container cancel">Limpar formulário</button>
                            <button className="button-container">Confirmar</button>
                        </div>
                    </div>
                    <br />
                    {loading && (
                        <Spinner animation="border" size="lg" />
                    )}
                </div>
            </Form>
        </Modal>, document.getElementById('modal-root')
    )

}

export default ManagerFormModal;