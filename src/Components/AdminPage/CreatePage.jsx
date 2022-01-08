import React from 'react';
import { useForm } from "react-hook-form";
import { Form, Row, Col } from "react-bootstrap"
import { toast } from 'react-toastify';
//Data Base
import { db } from "../../firebase-config"
import { collection, addDoc } from "firebase/firestore"

const CreatePage = () => {
  const { register, resetField, formState: { errors }, handleSubmit } = useForm();

  const pagesCollectionRef = collection(db, "pages");

  async function createPage(obj) {
    await addDoc(pagesCollectionRef, obj);
  }

  function onSubmit(newPageObj) {
    createPage(newPageObj).then(() => {
      toast.success(`Página ${newPageObj.pathName} criada com sucesso`);
      var arr = ["bannerImage", "district", "containerText", "pathName", "groupLink"];
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
        <Col md={6} sm={12}>
          <Form.Group className="mb-3">
            <Form.Label>Imagem do banner (link) </Form.Label>
            <Form.Control type="text" placeholder="Enter image link"
              isInvalid={errors.bannerImage}
              {...register("bannerImage", {
                required: true,
              })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Bairro</Form.Label>
            <Form.Control type="text" placeholder="Enter distric"
              isInvalid={errors.district}
              {...register("district", {
                required: true,
              })} />
          </Form.Group>

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

        <Col md={6} sm={12}>
          <Form.Group className="mb-3">
            <Form.Label> Imagem do footer </Form.Label>
            <Form.Control type="text" placeholder="Enter footer image"
              isInvalid={errors.footerImage}
              {...register("footerImage", {
                required: true,
              })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label> Logo do modal </Form.Label>
            <Form.Control type="text" placeholder="Enter modal logo"
              isInvalid={errors.modalImage}
              {...register("modalImage", {
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
      <button type="submit" className='btn btn-primary'>
        Submit
      </button>
    </form>
  )
}

export default CreatePage;