import React, { useRef, useState, useEffect } from "react";
import { useScreenshot } from "use-react-screenshot";

//Scripts
import { downloadToCsv } from "../../../../../scripts/utils"
import authRequest from "../../../../../scripts/http/authRequest"

//Components
import { Modal, Spinner } from "react-bootstrap"
import QRCode from "react-qr-code";

const VisualizationModal = (props) => {
    const [linkCopy, setLinkCopy] = useState(false);
    const [downloadQrCode, setDownloadQrCode] = useState(false)

    const [image, takeScreenShot] = useScreenshot();

    const invisibleInputToCopyLink = useRef();
    const qrCodeImage = useRef();

    function copyLink() {
        setLinkCopy(true);
        invisibleInputToCopyLink.current.style.display = 'block';
        invisibleInputToCopyLink.current.textContent = window.location.origin + "/#/" + props.modalData.pathname;
        invisibleInputToCopyLink.current.select();
        invisibleInputToCopyLink.current.setSelectionRange(0, 99999);
        document.execCommand("copy");

        invisibleInputToCopyLink.current.style.display = 'none';
        setTimeout(() => {
            setLinkCopy(false);
        }, 3000);
    }

    function generateQrCode() {
        setDownloadQrCode(true)
        takeScreenShot(qrCodeImage.current);
    }

    useEffect(() => {
        if (image && downloadQrCode) {
            var download = document.createElement('a');
            download.href = image;
            download.download = "qr-code";
            download.click();
            setDownloadQrCode(false)
        }
    }, [image, downloadQrCode]);

    function viewUsers() {
        props.handleListUserButtonClick()
    }

    function downloadCellPhones(pageId) {
        var headers = {};
        var body = [];
        function getParticipantsInfo() {
            return new Promise((resolve, reject) => {
                authRequest.get(`/usersByPage/${pageId}/false`).then((data) => {
                    resolve(data.data);
                })
            })
        }
        getParticipantsInfo().then((data) => {
            var segmentName;
            headers.number = "number";
            headers.name = "name";
            data.forEach((value) => {
                segmentName = value.segmentname;
                body.push({ number: value.number, name: value.name });
            })
            downloadToCsv(headers, body, `${segmentName}_Numbers`);
        })
    }

    function downloadEmails(pageId) {
        var headers = {};
        var body = [];
        function getParticipantsInfo() {
            return new Promise((resolve, reject) => {
                authRequest.get(`/usersByPage/${pageId}/false`).then((data) => {
                    resolve(data.data);
                })
            })
        }
        getParticipantsInfo().then((data) => {
            var segmentName;
            headers.email = "email";
            headers.name = "name";
            data.forEach((value) => {
                segmentName = value.segmentname;
                body.push({ email: value.email, name: value.name });
            })
            downloadToCsv(headers, body, `${segmentName}_Emails`);
        })
    }

    return (
        <>
            <Modal show={props.showModal} onHide={() => props.setShowModal(false)}
                className="admin-list-page-modal" centered={true}>
                <div style={{ marginBottom: 15 }}>
                    <h3 className="secondary-title">
                        {props.modalData.segmentname}
                    </h3>
                </div>
                <div className='card-wrapper-left-side'>
                    <div style={{ marginBottom: 15 }}>
                        <h5>
                            Link da página de captura:
                            <i style={{ marginLeft: 12, fontSize: 12 }} class="fas fa-external-link-alt"></i>
                        </h5>
                        <span>
                            <a href={`${window.location.origin}/#/${props.modalData.pathname}`} target="_blank" rel="noreferrer">
                                {window.location.origin}/#/{props.modalData.pathname}
                            </a>
                        </span>
                        <div className='admin-list-page-modal-btn-area'>
                            <button onClick={copyLink}>
                                {linkCopy ? "Copiado!" : "Copiar Link"}
                            </button>
                            <button onClick={generateQrCode}>
                                {!downloadQrCode ? "Gerar QR Code" : <Spinner animation="border" size="sm" />}
                            </button>
                        </div>
                    </div>
                    <div style={{ marginBottom: 15 }}>
                        <h5>Participantes:</h5>
                        <span>{props.modalData.participants}</span>
                        <div className='admin-list-page-modal-btn-area'>
                            <button onClick={viewUsers}>
                                Visualizar
                            </button>
                            <button onClick={() => downloadCellPhones(props.modalData.id)}>
                                Baixar telefones
                            </button>
                            <button onClick={() => downloadEmails(props.modalData.id)}>
                                Baixar emails
                            </button>
                        </div>
                    </div>
                    <div style={{ marginBottom: 15 }}>
                        <h5>Criado por:</h5>
                        <span>{props.modalData["admin_name"]}</span>
                        <div className='admin-list-page-modal-btn-area'>
                            <button>Visualizar</button>
                        </div>
                    </div>
                    <div className='admin-list-page-modal-btn-area'>
                        <button style={{ width: "85%", margin: "20px auto 0" }}>
                            Interagir no grupo
                        </button>
                    </div>
                </div>

            </Modal>
            <textarea ref={invisibleInputToCopyLink} style={{ display: 'none' }} />
            <div style={{ display: downloadQrCode ? "block" : "none" }}>
                <div style={{ width: 256, height: 256 }} ref={qrCodeImage}>
                    <QRCode value={`${window.location.origin}/#/${props.modalData.pathname}`} />
                </div>
            </div>
        </>

    )
}

export default VisualizationModal;