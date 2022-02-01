import React, { useState } from "react";
import { connect } from "react-redux"
import { useForm } from "react-hook-form";

//Components
import { Row, Col, Form, Spinner } from "react-bootstrap"
import { toast } from "react-toastify"

//Scripts
import authRequest from "../../../../scripts/http/authRequest"

//Store
import { setFilters } from "../../../../store/actions/admin"

const EditPage = (props) => {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [loading, setLoading] = useState();

  async function onSubmit(data) {
    setLoading(true)
    const formData = new FormData();
    var photos = []
    photos.push(data.bannerImage[0], data.footerImage[0])
    delete data.bannerImage;
    delete data.footerImage;
    var headers = Object.getOwnPropertyNames(data);
    headers.forEach((value) => {
      formData.append(value, data[value])
    });
    for (const image of photos) {
      formData.append("files", image)
    }
    formData.append("companyId", props.filters?.selectedPage.info.companyid);
    formData.append("adminId", props.filters?.selectedPage.info.adminid);


    authRequest.put(`/pages/${props.filters?.selectedPage.info.id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then((data) => {
        toast.success("Página atualizada com sucesso!")
        console.log(data.data)
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
  return (
    <>
      <div className="back-button" onClick={() => props.changeTab("listPages")}>
        <i className="fas fa-arrow-left" style={{ marginRight: 5 }} />
        Voltar
      </div>
      <span className="secondary-title">
        Editar mobilização <strong>{props.filters?.selectedPage.info.segmentname}</strong>
      </span>
      <div className="admin-create-page-wrapper" style={{ marginTop: 20 }}>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <Row style={{ margin: 0 }}>
            <Col sm={12} md={6} className="admin-create-page-left-side">
              <input placeholder="Nome da mobilização" type="text"
                {...register("segmentName", {
                  required: true,
                  maxLength: 50
                })}
                defaultValue={props.filters?.selectedPage.info.segmentname}
                className={errors.segmentName ? "input-error" : ""}
              />
              <span className="input-subtitle">
                Nome que vai aparecer na plataforma
              </span>
              <input placeholder="Texto do título" type="text"
                {...register("containerText", {
                  required: true,
                })}
                defaultValue={props.filters?.selectedPage.info.containertext}
                className={errors.containerText ? "input-error" : ""}
              />
              <span className="input-subtitle">
                Texto descritivo opcional
              </span>
              <input placeholder="Link de grupo de whatsapp" type="text"
                {...register("groupLink", {
                  required: true,
                  minLength: 3,
                })}
                defaultValue={props.filters?.selectedPage.info.grouplink}
                className={errors.groupLink ? "input-error" : ""}
              />

              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label style={{ margin: 0 }} className={errors.bannerImage ? "input-error" : ""}>
                  Banner
                </Form.Label>
                <Form.Control style={{ margin: 0, padding: 9 }}
                  type="file" accept="image/*"
                  {...register("bannerImage", {
                    required: true,
                  })}
                />
              </Form.Group>
              {/* <div className="banner-image-dnd"></div> */}
            </Col>
            <Col sm={12} md={6} className="admin-create-page-right-side">
              <input placeholder="Texto para chamada de ação" type="text"
                {...register("buttonText", {
                  required: true,
                  minLength: 3,
                  maxLength: 35
                })}
                defaultValue={props.filters?.selectedPage.info.buttontext}
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
                defaultValue={props.filters?.selectedPage.info.pathname}
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
                  type="file" accept="image/*"
                  {...register("footerImage", {
                    required: true,
                  })}
                />
              </Form.Group>
              {/* <div className="logo-image-dnd" ></div> */}

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
    filters: state.admin.filters,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFilters: (data) => dispatch(setFilters(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPage);