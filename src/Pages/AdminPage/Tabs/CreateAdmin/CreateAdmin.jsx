import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux"

//Components
import { Row, Col, Spinner } from "react-bootstrap"
import { toast } from "react-toastify"

//Scripts
import authRequest from "../../../../scripts/http/authRequest"
import { generateDate } from "../../../../scripts/utils"

//Store
import { setAdminList } from "../../../../store/actions/admin"


const CreateAdmin = (props) => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [loading, setLoading] = useState();

    function onSubmit(data) {
        setLoading(true);
        const newAdmin =
        {
            createdAt: generateDate(),
            ...data,
            companyId: props.companyInfo.id
        }
        authRequest.post("/mobilizae/admin", { ...newAdmin })
            .then((data) => {
                props.setAdminList([data.data, ...props.adminList]);
                toast.success("Administrador criado com sucesso!")
            })
            .catch((err) => { toast.error("Houve um erro ao criar o admin"); console.log(err) })
            .finally(() => { setLoading(false) })
    }

    return (
        <>
            <div className="back-button" onClick={() => props.changeTab("listAdmin")}>
                <i className="fas fa-arrow-left" style={{ marginRight: 5 }} />
                Voltar
            </div>
            <span className="secondary-title">
                Criar Administrador
            </span>

            <div className="admin-create-page-wrapper" style={{ marginTop: 20 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Row style={{ margin: 0 }}>
                        <Col sm={12} md={6} className="admin-create-page-left-side">
                            <input placeholder="Nome" type="text"
                                {...register("name", {
                                    required: true,
                                    maxLength: 50
                                })}
                                className={errors.name ? "input-error" : ""}
                            />
                            <input placeholder="Email" type="text"
                                {...register("email", {
                                    required: true,
                                })}
                                className={errors.email ? "input-error" : ""}
                            />
                            <span className="input-subtitle">
                                (Será usado para login na plataforma)
                            </span>
                            <input placeholder="Senha" type="password"
                                {...register("password", {
                                    required: true,
                                    minLength: 5
                                })}
                                className={errors.password ? "input-error" : ""}
                            />
                        </Col>
                        <Col sm={12} md={6} className="admin-create-page-right-side">

                        </Col>

                        <button className="admin-create-page-btn-submit">
                            {loading ? <Spinner animation="border" size="sm" /> : "Tudo certo, vamos mobilizar!"}
                        </button>
                    </Row>
                </form>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        companyInfo: state.company.companyInfo,
        adminList: state.admin.adminList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAdminList: (data) => dispatch(setAdminList(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAdmin);