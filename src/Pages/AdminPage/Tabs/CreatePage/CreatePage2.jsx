import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Form, Row, Col } from "react-bootstrap"
import { toast } from 'react-toastify';
import Image from "../Tools/Image.jsx";
//Data Base
import { db } from "../../../../firebase-config"
import { collection, addDoc } from "firebase/firestore"

const CreatePage = () => {
  const { register, resetField, formState: { errors }, handleSubmit } = useForm();
  const [images, setImages] = useState({
    banner: [],
    modalLogo: [],
    footerLogo: []
  });

  const pagesCollectionRef = collection(db, "pages");

  async function createPage(obj) {
    await addDoc(pagesCollectionRef, obj);
  }

  function onSubmit(newPageObj) {
    newPageObj.createdDate = new Date();
    if (images.banner?.length === 0 ||
      images.footerLogo?.length === 0 ||
      images.modalLogo?.length === 0) {
      toast.error("Adicione imagens")
      return false;
    }
    newPageObj.bannerImage = images.banner[0]["data_url"];
    newPageObj.footerImage = images.modalLogo[0]["data_url"];
    newPageObj.modalImage = images.footerLogo[0]["data_url"];

    createPage(newPageObj).then(() => {
      toast.success(`Página ${newPageObj.pathName} criada com sucesso`);
      var arr = ["pathName", "groupLink"];
      arr.forEach((value) => {
        resetField(value);
      })
    }).catch((err) => {
      console.log(err)
      toast.error("Houve um erro ao criar nova pagina :c");
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <div className="my-image-div">
          <Form.Label style={{ marginLeft: 15 }}>Imagem do banner </Form.Label>
          <Image images={images.banner} style={{ height: 400 }}
            setImages={(value) => { setImages((prev) => ({ ...prev, banner: value })) }} />
        </div>
        <Col md={6} sm={12} className="my-col">
          <Form.Group className="mb-3">
            <Form.Label>Texto do container (opcional) </Form.Label>
            <Form.Control type="text" placeholder="Enter container text"
              isInvalid={errors.containerText}
              {...register("containerText", {
                required: false,
              })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Texto do botão (opcional) </Form.Label>
            <Form.Control type="text" placeholder="Enter button text"
              isInvalid={errors.buttonText}
              {...register("buttonText", {
                required: false,
              })} />
          </Form.Group>
        </Col>

        <Col md={6} sm={12} className="my-col">

          <Form.Group className="mb-3">
            <Form.Label> Texto do título </Form.Label>
            <Form.Control type="text" placeholder="Enter title text"
              isInvalid={errors.title}
              {...register("title", {
                required: true,
              })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label> Nome do caminho </Form.Label>
            <Form.Control type="text" placeholder="bairroJardim"
              isInvalid={errors.pathName}
              {...register("pathName", {
                required: true,
              })} />
            <Form.Text className="text-muted">
              Esse nome vai ser usado para o camminho do site (meusite.com/bairroJardim)
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label> Grupo de whatsapp </Form.Label>
            <Form.Control type="text" placeholder="whats app group link"
              isInvalid={errors.groupLink}
              {...register("groupLink", {
                required: true,
              })} />
            <Form.Text className="text-muted">
              Link do grupo que vai ser atrelado à aquele bairro
            </Form.Text>
          </Form.Group>
        </Col>

      </Row>
      <Row>
        <Col md={6} sm={12}>
          <Form.Group className="mb-3">
            <Form.Label> Imagem do footer </Form.Label>
            <Image images={images.footerLogo} style={{ height: 100 }}
              setImages={(value) => { setImages((prev) => ({ ...prev, footerLogo: value })) }} />
          </Form.Group>
        </Col>
        <Col md={6} sm={12}>
          <Form.Group className="mb-3">
            <Form.Label> Logo do modal </Form.Label>
            <Image images={images.modalLogo} style={{ height: 100 }}
              setImages={(value) => { setImages((prev) => ({ ...prev, modalLogo: value })) }} />
          </Form.Group>
        </Col>
      </Row>
      <button type="submit" className='btn btn-primary' style={{ marginBottom: 15 }} >
        Submit
      </button>
    </form>
  )
}

export default CreatePage;