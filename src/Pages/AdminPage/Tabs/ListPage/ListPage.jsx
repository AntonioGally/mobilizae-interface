import React, { useState } from 'react'
import { connect } from "react-redux";

//Components
import Header from './Components/Header';
import Card from './Components/Card';
import CardLoader from "./Components/CardLoader"
import VisualizationModal from './Components/VisualizationModal'

//Style
import "./ListPage.style.css"

//Data
import { pages } from "../../../../scripts/api"

const ListPage = (props) => {
    const [inputFilterValue, setInputFilterValue] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({})
    function handleCreateMobilizationButtonClick() {
        props.changeTab('createNewPages');
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
                <span className='secondary-title'>
                    Suas mobilizações ({props.pageList?.length})
                </span>
            </div>
            {props.pageList
                ?
                (<>
                    {props.pageList.map((value, index) => (
                        <Card content={value} key={index} onCardClick={onCardClick} />
                    ))}
                </>)
                :
                (<CardLoader />)
            }


            <VisualizationModal showModal={showModal} setShowModal={setShowModal}
                modalData={modalData} />
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        pageList: state.admin.pageList
    }
}

export default connect(mapStateToProps, null)(ListPage);