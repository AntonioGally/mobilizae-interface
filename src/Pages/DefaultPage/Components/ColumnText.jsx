import React from "react";

//Components
import { Row, Col } from "react-bootstrap"

const ColumnText = (props) => {
    return (
        <Row className="defaul-page-column-text-row">
            {props.textSide === "left" ? (
                <>
                    <Col md={6} sm={12}>
                        <p>{props.text}</p>
                    </Col>
                    <Col md={6} sm={12}>
                        <div>
                            <img src={props.image} alt="Text description" />
                        </div>
                    </Col>
                </>
            ) : (
                <>
                    <Col md={7} sm={12}>
                        <div>
                            <img src={props.image} alt="Text description" />
                        </div>
                    </Col>
                    <Col md={5} sm={12}>
                        <p>{props.text}</p>
                    </Col>
                </>
            )}
        </Row>
    )
}

export default ColumnText;