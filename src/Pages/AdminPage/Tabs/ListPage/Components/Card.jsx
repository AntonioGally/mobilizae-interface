import React, { memo, useEffect, useState } from 'react'

//Components
import { Row, Col } from "react-bootstrap"
import { toast } from "react-toastify"
import ConfirmModal from "./ConfirmModal";

//Scripts
import server from "../../../../../scripts/http/config"
import authRequest from "../../../../../scripts/http/authRequest";

const Card = (props) => {
    const [showModal, setShowModal] = useState(false);

    function getParticipantsCount() {
        return new Promise((resolve, reject) => {
            authRequest.get(`/usersByPage/${props.content.id}/true`).then((data) => {
                resolve(data.data);
            })
        })
    }

    function deletePage() {
        authRequest.delete(`/pages/${props.content.id}`)
            .then(() => {
                var newArr = props.pageList.slice();
                newArr = newArr.filter((el) => el.id !== props.content.id)
                props.setPageList(newArr);
                toast.success("Página deletada")
            })
            .catch((err) => { toast.error("Houve um erro ao deletar a página") })
    }

    useEffect(() => {
        if (!props.pageList[props.index].participants) {
            getParticipantsCount().then((data) => {
                var arr = props.pageList.slice();
                arr[props.index].participants = data.usercount;
                props.setPageList(arr);
            })
        }
    }, [])
    return (
        <div className='admin-list-page-card-wrapper'>
            <div className='admin-list-page-card-header'>
                <div>
                    <i className="fas fa-pen" onClick={() => { props.handleEditPageClick(props.content) }}></i>
                    <i className="fas fa-trash" onClick={() => setShowModal(true)}></i>
                </div>
                <button className='admin-create-page-btn-submit'
                    onClick={() => props.onCardClick({ ...props.content, participants: props.content?.participants })}>
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
                        <h5>Participantes:</h5>
                        <span>{props.content?.participants}</span>
                    </div>
                    <div>
                        <h5>Grupos preenchidos:</h5>
                        <span>{(Math.round(Number(props.content?.participants) / 250)).toString()}</span>
                    </div>
                    <div>
                        <h5>Acessos na página:</h5>
                        <span>{props.content.pageAccess}</span>
                    </div>
                    <div>
                        <h5>Criada por:</h5>
                        <span>{props.content["admin_name"]}</span>
                    </div>
                    {/* <div>
                        <h5>Cadastrou na página e não participa do grupo:</h5>
                        <span>{content.registeredOutsideGroup}</span>
                    </div> */}
                </Col>
                <Col sm={12} md={6} className='card-wrapper-right-side'>
                    <img src={`${server.host}/getImage/${props.content.footerimage}`} alt="Segment ilustration" loading="lazy" />
                </Col>
            </Row>
            <ConfirmModal title={props.content.segmentname} showModal={showModal} setShowModal={setShowModal} btnClick={deletePage} />
        </div>
    )
}

export default memo(Card);