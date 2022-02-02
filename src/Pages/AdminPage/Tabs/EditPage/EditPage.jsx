import React, { useState, useRef } from "react";
import { connect } from "react-redux"
import { useForm } from "react-hook-form";

//Components
import { Row, Col, Form, Spinner } from "react-bootstrap"
import { toast } from "react-toastify"

//Scripts
import server from "../../../../scripts/http/config"
import authRequest from "../../../../scripts/http/authRequest"

//Store
import { setFilters } from "../../../../store/actions/admin"

const EditPage = (props) => {
  const bannerImageRef = useRef(null);
  const footerImageRef = useRef(null);
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [loading, setLoading] = useState();
  const [imageSelected, setImageSelected] = useState({ banner: false, footer: false });

  function onSubmit(data) {
    setLoading(true)
    const imageData = new FormData();
    var photos = []
    photos.push(
      { image: data.bannerImage[0], oldBanner: props.filters?.selectedPage.info.bannerimage },
      { image: data.footerImage[0], oldFooter: props.filters?.selectedPage.info.footerimage }
    )
    delete data.bannerImage;
    delete data.footerImage;
    const newPage = {
      ...data,
      companyId: props.filters?.selectedPage.info.companyid,
      adminId: props.filters?.selectedPage.info.adminid
    }

    authRequest.put(`/pages/${props.filters?.selectedPage.info.id}`, newPage)
      .then((data) => {
        photos.length > 0 ?
          authRequest.put(`pages/image/${props.filters?.selectedPage.info.id}`, imageData, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then((data) => {
              toast.success("Página atualizada com sucesso!");
              setLoading(false);
            }) : toast.success("Página atualizada com sucesso!"); setLoading(false)
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
        setLoading(false)
      })

    for (const image of photos) {
      imageData.append("files", image.image)
    }

    imageSelected.banner && imageData.append("banner", true);
    imageSelected.banner && imageData.append("oldBanner", photos[0].oldBanner);
    imageSelected.footer && imageData.append("footer", true);
    imageSelected.footer && imageData.append("oldFooter", photos[1].oldFooter);
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
                  type="file" accept="image/*" onChangeCapture={(e) => { readURL(e.target, "bannerImage") }}
                  {...register("bannerImage", {
                    required: false,
                  })}
                />
              </Form.Group>
              <div className="banner-image-dnd">
                {imageSelected.banner ? (
                  <img ref={bannerImageRef} src="#" alt="Banner Preview" />
                ) : (
                  <img src={`${server.host}/getImage/${props.filters?.selectedPage.info.bannerimage}`} alt="Banner Preview" />
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
                  type="file" accept="image/*" onChangeCapture={(e) => readURL(e.target, "footerImage")}
                  {...register("footerImage", {
                    required: false,
                  })}
                />
              </Form.Group>
              <div className="logo-image-dnd">
                {imageSelected.footer ? (
                  <img ref={footerImageRef} src="#" alt="Logo Preview" />
                ) : (
                  <img src={`${server.host}/getImage/${props.filters?.selectedPage.info.footerimage}`} alt="Logo Preview" />
                )}
              </div>
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