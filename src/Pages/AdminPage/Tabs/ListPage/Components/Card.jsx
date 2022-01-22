import React, { memo } from 'react'

//Components
import { Row, Col } from "react-bootstrap"

const Card = ({ content, onCardClick }) => {
    return (
        <div className='admin-list-page-card-wrapper' onClick={() => onCardClick(content)}>
            <div style={{ textAlign: 'center', marginBottom: 10 }}>
                <span className='secondary-title'>{content.segmentName}</span>
            </div>
            <Row style={{ margin: 0 }}>
                <Col sm={12} md={6} className='card-wrapper-left-side'>
                    <div>
                        <h5>Link da página de captura:</h5>
                        <span>{content.pageLink}</span>
                    </div>
                    <div>
                        <h5>Participantes:</h5>
                        <span>{content.participants}</span>
                    </div>
                    <div>
                        <h5>Grupos preenchidos:</h5>
                        <span>{content.filledGroups}</span>
                    </div>
                    <div>
                        <h5>Acessos na página:</h5>
                        <span>{content.pageAccess}</span>
                    </div>
                    <div>
                        <h5>Cadastrou na página e não participa do grupo:</h5>
                        <span>{content.registeredOutsideGroup}</span>
                    </div>
                </Col>
                <Col sm={12} md={6} className='card-wrapper-right-side'>
                    <img src={content.image} alt="Segment ilustration" />
                </Col>
            </Row>
        </div>
    )
}

export default memo(Card);