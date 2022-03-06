import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux"

//Components
import { Row, Col, Form, Spinner } from "react-bootstrap"
import { toast } from "react-toastify"

//Scripts
import authRequest from "../../../../scripts/http/authRequest"
import { generateDate } from "../../../../scripts/utils"

//Store
import { setPageList } from "../../../../store/actions/admin"

//Css
import "./CreatePage.style.css";


const CreatePage = (props) => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [loading, setLoading] = useState();
    const [imageSelected, setImageSelected] = useState({ banner: false, footer: false });

    const [groupLinkArray, setGroupLinkArray] = useState(1)

    const bannerImageRef = useRef(null)
    const footerImageRef = useRef(null)

    function onSubmit(data) {
        setLoading(true);
        const formData = new FormData();
        var photos = [];
        var groupLinkArr = [];
        var groupLinkString;
        photos.push(data.bannerImage[0], data.footerImage[0])
        delete data.bannerImage;
        delete data.footerImage;
        var headers = Object.getOwnPropertyNames(data);
        headers.forEach((value) => {
            if (value.indexOf("groupLink-") > -1) {
                groupLinkArr.push(data[value])
                delete data[value]
            }
        });
        groupLinkString = groupLinkArr.join(";")
        headers.forEach((value) => {
            formData.append(value, data[value])
        });
        for (const image of photos) {
            formData.append("files", image)
        }
        formData.append("companyId", props.companyInfo.id);
        formData.append("adminId", props.adminInfo.id);
        formData.append("createdAt", generateDate())
        formData.append("groupLink", groupLinkString)

        authRequest.post(`/pages`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then((data) => {
                toast.success("Página criada com sucesso!");
                props.setPageList([data.data, ...props.pageList])
            })
            .catch((err) => {
                const errorMap = {
                    500: toast.error("Houve algum erro nos nossos servidores"),
                    404: toast.error("Essa página não existe existe"),
                    403: toast.warning(`Essa página já existe (${props.filters?.selectedPage.info.pathname})`),
                    400: toast.error("Houve um problema ao enviar as imagens para os nossos servidores")
                }
                if (err.response.status) {
                    return errorMap[err.response.status]
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }

    function readURL(input, imageInputName) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                if (imageInputName === "bannerImage") {
                    setImageSelected((prev) => ({ ...prev, banner: true }))
                    bannerImageRef.current.src = e.target.result;
                } else {
                    setImageSelected((prev) => ({ ...prev, footer: true }))
                    footerImageRef.current.src = e.target.result;
                }
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    return (
        <>
            <div className="back-button" onClick={() => props.changeTab("listPages")}>
                <i className="fas fa-arrow-left" style={{ marginRight: 5 }} />
                Voltar
            </div>
            <span className="secondary-title">
                Criar mobilização
            </span>
            <div className="admin-create-page-wrapper" style={{ marginTop: 20 }}>
                <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                    <Row style={{ margin: 0 }}>
                        <Col sm={12} md={6} className="admin-create-page-left-side">
                            <input placeholder="Titulo da mobilização" type="text"
                                {...register("segmentName", {
                                    required: true,
                                    maxLength: 50
                                })}
                                className={errors.segmentName ? "input-error" : ""}
                            />
                            <input placeholder="Texto de descrição" type="text"
                                {...register("containerText", {
                                    required: true,
                                })}
                                className={errors.containerText ? "input-error" : ""}
                            />
                            <div style={{ marginTop: 12, maxHeight: 150, overflowY: "auto" }}>
                                {new Array(groupLinkArray).fill("-").map((value, index) => {
                                    return (
                                        <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
                                            <input style={{ marginTop: 0, width: "90%" }} placeholder="Link de grupo de whatsapp" type="text"
                                                {...register(`groupLink-${index}`, {
                                                    required: true,
                                                    minLength: 3,
                                                })}
                                                className={errors.groupLink ? "input-error" : ""}
                                            />
                                            <i className="add-group-link-button fas fa-plus"
                                                onClick={() => { setGroupLinkArray((prev) => prev + 1) }} />
                                        </div>
                                    )
                                })}
                            </div>



                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label style={{ margin: 0 }} className={errors.bannerImage ? "input-error" : ""}>
                                    Banner
                                </Form.Label>
                                <Form.Control style={{ margin: 0, padding: 9 }}
                                    type="file" accept="image/*" onChangeCapture={(e) => readURL(e.target, "bannerImage")}
                                    {...register("bannerImage", {
                                        required: true,
                                    })}
                                />
                            </Form.Group>
                            <div className="banner-image-dnd">
                                {imageSelected.banner && (
                                    <img ref={bannerImageRef} src="#" alt="Banner Preview" />
                                )}
                            </div>
                        </Col>
                        <Col sm={12} md={6} className="admin-create-page-right-side">
                            <input placeholder="Texto para chamada de ação" type="text"
                                {...register("buttonText", {
                                    required: true,
                                    minLength: 3,
                                    maxLength: 35
                                })}
                                className={errors.buttonText ? "input-error" : ""}
                            />
                            <span className="input-subtitle">
                                (Quero participar, saiba mais, participe do grupo VIP)
                            </span>
                            <input placeholder="Nome do caminho da URL" type="text"
                                {...register("pathName", {
                                    required: true,
                                    minLength: 3,
                                    maxLength: 20
                                })}
                                className={errors.pathName ? "input-error" : ""}
                            />
                            <span className="input-subtitle">
                                Esse nome será usado para o caminho do site <br />
                                (antoniogally.mobilizae.com.br/meuURL)
                            </span>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label style={{ margin: 0 }} className={errors.footerImage ? "input-error" : ""}>
                                    Logo
                                </Form.Label>
                                <Form.Control style={{ margin: 0, padding: 9 }}
                                    type="file" accept="image/*" onChangeCapture={(e) => readURL(e.target, "footerImage")}
                                    {...register("footerImage", {
                                        required: true,
                                    })}
                                />
                            </Form.Group>
                            <div className="logo-image-dnd" style={{ height: 131 }}>
                                {imageSelected.footer && (
                                    <img ref={footerImageRef} src="#" alt="Logo Preview" />
                                )}
                            </div>
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
        adminInfo: state.admin.adminInfo,
        pageList: state.admin.pageList,
        companyInfo: state.company.companyInfo,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setPageList: (data) => dispatch(setPageList(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePage);