import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux"

//Components
import { Row, Col, Spinner } from "react-bootstrap"
import { toast } from "react-toastify"

//Scripts
import authRequest from "../../../../scripts/http/authRequest"

//Store
import { setAdminList } from "../../../../store/actions/admin";


const EditAdmin = (props) => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [loading, setLoading] = useState();

    function onSubmit(data) {
        setLoading(true);
        const newAdmin =
        {
            createdAt: props.selectedAdmin.createdat,
            ...data,
            companyId: props.companyInfo.id
        }
        authRequest.put(`/mobilizae/admin/${props.selectedAdmin.id}`, { ...newAdmin })
            .then((data) => {
                toast.success("Administrador atualizado com sucesso!")
            })
            .catch((err) => { toast.error("Houve um erro ao atualizar o admin"); console.log(err) })
            .finally(() => { setLoading(false) })
    }

    return (
        <>
            <div className="back-button" onClick={() => props.changeTab("listAdmin")}>
                <i className="fas fa-arrow-left" style={{ marginRight: 5 }} />
                Voltar
            </div>

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
                                defaultValue={props.selectedAdmin?.name}
                            />
                            <input placeholder="Email" type="text"
                                {...register("email", {
                                    required: true,
                                })}
                                className={errors.email ? "input-error" : ""}
                                defaultValue={props.selectedAdmin?.email}
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
                            {loading ? <Spinner animation="border" size="sm" /> : "Atualizar"}
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
        selectedAdmin: state.admin.selectedAdmin,
        adminList: state.admin.adminList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAdminList: (data) => dispatch(setAdminList(data)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditAdmin);