import React, { useState } from 'react'
import { connect } from "react-redux";

//Components
import Header from './Components/Header';
import Card from './Components/Card';
import CardLoader from "./Components/CardLoader"
import VisualizationModal from './Components/VisualizationModal'

//Style
import "./ListPage.style.css"

//Script
import { setPageList } from "../../../../store/actions/admin";

const ListPage = (props) => {
    const [inputFilterValue, setInputFilterValue] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({})

    function handleCreateMobilizationButtonClick() {
        props.changeTab('createNewPages');
    }

    function onCardClick(content) {
        setModalData(content)
        setShowModal(true)
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
                    {props.pageList?.map((value, index) => (
                        <Card content={value} key={index} pageList={props.pageList}
                            setPageList={props.setPageList}
                            onCardClick={onCardClick} index={index} />
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

const mapDispatchToProps = (dispatch) => {
    return {
        setPageList: (data) => dispatch(setPageList(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);