import React, { useState } from "react";
import ManagerFormModal from "./ManagerFormModal";

const ManagerButton = ({ buttonText, modalImage, modalPageInfo, content }) => {
    const [show, setShow] = useState(false);

    return (
        <div style={{ textAlign: "center" }}>
            <button className="button-container" onClick={() => setShow(true)}>
                {buttonText}
            </button>
            <ManagerFormModal show={show} closeModal={() => setShow(false)} pageInfo={modalPageInfo} modalImage={modalImage} content={content} />
        </div>
    )
}

export default ManagerButton;