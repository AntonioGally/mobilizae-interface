import React from "react";

//Css
import "./CreatePage.style.css";

//Components
import { Row, Col } from "react-bootstrap"

const CreatePage = (props) => {
    return (
        <>
            <div className="back-button" onClick={() => props.changeTab("listPages")}>
                <i class="fas fa-arrow-left" style={{ marginRight: 5 }} />
                Voltar
            </div>
            <span className="secondary-title" style={{ marginBottom: 12 }}>
                Criar mobilização
            </span>
            <div className="admin-create-page-wrapper">
                <form>
                    <Row style={{ margin: 0 }}>
                        <Col sm={12} md={6} className="admin-create-page-left-side">
                            <input placeholder="Nome da mobilização" />
                            <input placeholder="Texto do título" />
                            <input placeholder="Link de grupo de whatsapp" />
                            <button type="button">Imagem do banner principal</button>
                            <div className="banner-image-dnd"></div>
                        </Col>
                        <Col sm={12} md={6} className="admin-create-page-right-side">
                            <input placeholder="Texto para chamada de ação" />
                            <span className="input-subtitle">
                                (Quero participar, saiba mais, participe do grupo VIP)
                            </span>
                            <input placeholder="Nome do caminho da URL" />
                            <span className="input-subtitle">
                                Esse nome será usado para o caminho do site <br />
                                (antoniogally.mobilizae.com.br/meuURL)
                            </span>
                            <button type="button">Seu logo ou da ação</button>
                            <div className="logo-image-dnd" >

                            </div>
                        </Col>
                        <button className="admin-create-page-btn-submit">Tudo certo, vamos mobilizar!</button>
                    </Row>
                </form>
            </div>
        </>
    )
}

export default CreatePage;