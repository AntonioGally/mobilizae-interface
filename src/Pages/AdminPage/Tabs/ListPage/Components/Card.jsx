import React, { memo, useEffect, useState } from 'react'

//Components
import { Row, Col } from "react-bootstrap"
import ConfirmModal from "./ConfirmModal";

//Scripts
import server from "../../../../../scripts/http/config"
import { formatDate } from "../../../../../scripts/utils"

const Card = (props) => {

    return (
        <div className='admin-list-page-card-wrapper'>
            <div className='admin-list-page-card-header'>
                <div>
                    <i className="fas fa-pen" onClick={() => { props.handleEditPageClick(props.content) }}></i>
                    <i className="fas fa-trash" onClick={() => props.setShowDeleteModal(true)}></i>
                </div>
                <button className='admin-create-page-btn-submit'
                    onClick={() => props.onCardClick({ ...props.content, participants: props.content.userCount })}
                >
                    Visualizar
                </button>
            </div>
            <div style={{ textAlign: 'center', marginBottom: 10 }}>
                <span className='secondary-title'>{props.content.segmentname}</span>
            </div>
            <Row style={{ margin: 0 }}>
                <Col sm={12} md={6} className='card-wrapper-left-side'>
                    <div>
                        <h5>Link da página de captura:
                            <i style={{ marginLeft: 12, fontSize: 12 }} className="fas fa-external-link-alt"></i>
                        </h5>
                        <span>
                            <a href={`${window.location.origin}/#/${props.content.pathname}`} target="_blank" rel="noreferrer">
                                {window.location.origin}/#/{props.content.pathname}
                            </a>
                        </span>
                    </div>
                    <div>
                        <h5 onClick={() => console.log(props)}>Participantes:</h5>
                        <span>{props.content.userCount}</span>
                    </div>
                    <div>
                        <h5>Grupos preenchidos:</h5>
                        <span>{(Math.round(Number(props.content.userCount) / 250)).toString()}</span>
                    </div>
                    <div>
                        <h5>Acessos na página:</h5>
                        <span>{props.content.pageAccess}</span>
                    </div>
                    <div>
                        <h5>Data de cadastro:</h5>
                        <span>{formatDate(props.content.createdat)}</span>
                    </div>
                </Col>
                <Col sm={12} md={6} className='card-wrapper-right-side'>
                    <img src={`${server.host}/getImage/${props.content.footerimage}`} alt="Segment ilustration" loading="lazy" />
                </Col>
            </Row>
            <ConfirmModal title={props.content.segmentname} showModal={props.showDeleteModal} setShowModal={props.setShowDeleteModal}
                btnClick={props.handleDeletePage} deleteLoading={props.deletePageLoading} />
        </div>
    )
}

export default memo(Card);