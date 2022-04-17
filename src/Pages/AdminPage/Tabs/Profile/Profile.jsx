import React, { memo } from "react";
import { connect } from "react-redux"

//Components
import { Row, Col } from "react-bootstrap"


const Profile = (props) => {
    return (
        <>
            <div className="back-button" onClick={() => props.changeTab("listAdmin")}>
                <i className="fas fa-arrow-left" style={{ marginRight: 5 }} />
                Voltar
            </div>
            <span className="secondary-title">
                Configurações
            </span>

            <div className="admin-create-page-wrapper" style={{ marginTop: 20 }}>
                <form>
                    <Row style={{ margin: 0 }}>
                        <Col sm={12} md={6} className="admin-create-page-left-side">
                            <span style={{ fontSize: 16 }}>Nome</span>
                            <input placeholder="Nome" type="text" style={{ margin: "0 0 12px" }}
                                value={props.companyInfo.name} disabled />
                            <span style={{ fontSize: 16 }}>Subdomínio</span>
                            <input placeholder="Email" type="text" style={{ margin: "0 0 12px" }}
                                value={props.companyInfo.subdomain} disabled />
                            <span style={{ fontSize: 16 }}>Métrica customizada</span>
                            <input placeholder="Senha" type="text" style={{ margin: "0 0 12px" }}
                                value={props.companyInfo.iscustommetricactive ? "Habilitado" : "Desabilitado"} disabled />

                        </Col>
                        <Col sm={12} md={6} className="admin-create-page-right-side">

                        </Col>
                    </Row>
                </form>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        companyInfo: state.company.companyInfo,
    }
}

export default connect(mapStateToProps, null)(memo(Profile));