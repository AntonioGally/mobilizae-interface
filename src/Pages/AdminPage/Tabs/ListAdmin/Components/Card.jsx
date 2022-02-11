import React, { memo, useState } from "react";

//Components
import { Row, Col } from "react-bootstrap"
import ConfirmModal from "./ConfirmModal"
import { toast } from "react-toastify"

//Scripts
import { formatDate } from "../../../../../scripts/utils"
import authRequest from "../../../../../scripts/http/authRequest";

const Card = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false)
    function deleteAdmin() {
        setDeleteLoading(true);
        authRequest.delete(`/mobilizae/admin/${props.content.id}`)
            .then(() => {
                var newArr = props.adminList.slice();
                newArr = newArr.filter((el) => el.id !== props.content.id)
                props.setAdminList(newArr);
                setShowModal(false);
                toast.success("Administrador deletado");
            })
            .catch((err) => { toast.error("Houve um erro ao deletar o administrador") })
            .finally(() => { setDeleteLoading(false) })
    }
    return (
        <div className='admin-list-page-card-wrapper'>
            <div className='admin-list-page-card-header'>
                <div>
                    <i className="fas fa-pen" onClick={() => { props.handleEditAdminClick(props.content) }}></i>
                    <i className="fas fa-trash" onClick={() => setShowModal(true)}></i>
                </div>
            </div>
            <div style={{ textAlign: 'center', marginBottom: 10 }}>
                <span className='secondary-title'>{props.content.segmentname}</span>
            </div>
            <Row style={{ margin: 0 }}>
                <Col sm={12} md={6} className='card-wrapper-left-side'>
                    <div>
                        <h5>Nome:</h5>
                        <span>{props.content?.name}</span>
                    </div>
                    <div>
                        <h5>Email:</h5>
                        <span>{props.content?.email}</span>
                    </div>
                    <div>
                        <h5>Data de cadastro:</h5>
                        <span>{formatDate(props.content.createdat)}</span>
                    </div>
                    {/* <div>
                        <h5>Cadastrou na página e não participa do grupo:</h5>
                        <span>{content.registeredOutsideGroup}</span>
                    </div> */}
                </Col>
            </Row>
            <ConfirmModal name={props.content.name} showModal={showModal} setShowModal={setShowModal}
                btnClick={deleteAdmin} deleteLoading={deleteLoading} />
        </div>
    )
}

export default memo(Card);