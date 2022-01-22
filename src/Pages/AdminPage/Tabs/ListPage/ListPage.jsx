import React, { useState } from 'react'

//Components
import Header from './Components/Header';
import Card from './Components/Card';
import VisualizationModal from './Components/VisualizationModal'

//Style
import "./ListPage.style.css"

//Data
import { pages } from "../../../../scripts/api"

const ListPage = ({ changeTab }) => {
    const [inputFilterValue, setInputFilterValue] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({})
    function handleCreateMobilizationButtonClick() {
        changeTab('createNewPages');
    }
    function onCardClick(content) {

        setShowModal(true);
        setModalData(content)
    }
    return (
        <>
            <Header onBtnClick={handleCreateMobilizationButtonClick}
                inputFilterValue={inputFilterValue} setInputFilterValue={setInputFilterValue} />
            <div style={{ marginBottom: 10 }}>
                <span className='secondary-title'>Suas mobilizações</span>
            </div>
            {pages.map((value, index) => (
                <Card content={value} key={index} onCardClick={onCardClick} />
            ))}

            <VisualizationModal showModal={showModal} setShowModal={setShowModal}
                modalData={modalData} />
        </>
    )
}

export default ListPage;