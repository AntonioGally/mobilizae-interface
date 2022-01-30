import React, { memo } from "react"

//Components
import { Row, Col } from "react-bootstrap"


const Card = (props) => {
  function formatDate(date) {
    var formattedDate = new Date(date);
    var day = formattedDate.getDate();
    var month = formattedDate.getMonth() + 1
    if (day < 10) {
      day = `0${day}`
    }
    if (month < 10) {
      month = `0${month}`
    }

    return `${day}/${month}/${formattedDate.getFullYear()} ${formattedDate.getHours()}h${formattedDate.getMinutes()}`
  }
  return (
    <div className='admin-list-page-card-wrapper' onClick={() => props.onCardClick(props.content)}>
      <Row style={{ margin: 0 }}>
        <Col sm={12} md={6} className='card-wrapper-left-side'>
          <div>
            <h5>Nome:</h5>
            <span>{props.content.name}</span>
          </div>
          <div>
            <h5>Email:</h5>
            <span>{props.content.email}</span>
          </div>
          <div>
            <h5>Número</h5>
            <span>{props.content.number}</span>
          </div>
          <div>
            <h5>
              Página que participa:
              <i style={{ marginLeft: 12, fontSize: 12 }} className="fas fa-external-link-alt"></i>
            </h5>
            <span >
              <a onClick={(e) => e.stopPropagation()}
                href={`${window.location.origin}/#/${props.content.segmentname}`} target="_blank" rel="noreferrer">
                {window.location.origin}/#/{props.content.segmentname}
              </a>
            </span>
          </div>
          <div>
            <h5>Link do grupo:</h5>
            <span>{props.content.grouplink}</span>
          </div>
        </Col>
        <Col sm={12} md={6} className='card-wrapper-left-side'>
          <div>
            <h5>Data de cadastro:</h5>
            <span>
              {formatDate(props.content.createdat)}
            </span>
          </div>
          <div>
            <h5>Permissão SMS:</h5>
            <span>{props.content.isnewsletteractive ? "Ativo" : "Desabilitado"}</span>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default memo(Card);