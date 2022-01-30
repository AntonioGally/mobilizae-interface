import React, { memo, useEffect } from 'react'

//Components
import { Row, Col } from "react-bootstrap"

//Scripts
import authRequest from "../../../../../scripts/http/authRequest";

const Card = (props) => {

  function getParticipantsCount() {
    return new Promise((resolve, reject) => {
      authRequest.get(`/usersByPage/${props.content.id}/true`).then((data) => {
        resolve(data.data);
      })
    })
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
    <div className='admin-list-page-card-wrapper' onClick={() => props.onCardClick({ ...props.content, participants: props.content?.participants })}>
      <div style={{ textAlign: 'center', marginBottom: 10 }}>
        <span className='secondary-title'>{props.content.segmentname}</span>
      </div>
      <Row style={{ margin: 0 }}>
        <Col sm={12} md={6} className='card-wrapper-left-side'>
          <div>
            <h5>Link da página de captura:</h5>
            <span>{window.location.origin}/#/{props.content.pathname}</span>
          </div>
          <div>
            <h5>Participantes:</h5>
            <span>{props.content?.participants}</span>
          </div>
          <div>
            <h5>Criada por:</h5>
            <span>{props.content["admin_name"]}</span>
          </div>
        </Col>
        <Col sm={12} md={6} className='card-wrapper-right-side'>
          <img src={props.content.footerimage} alt="Segment ilustration" />
        </Col>
      </Row>
    </div>
  )
}

export default memo(Card);