import React, { useState } from 'react'
import { connect } from "react-redux";

//Components
import Header from './Components/Header';
import Card from './Components/Card';
import CardLoader from "./Components/CardLoader"
import VisualizationModal from './Components/VisualizationModal'

//Style
import "./ListPage.style.css"

//Store
import { setPageList, setFilters, setAdminInfo } from "../../../../store/actions/admin";


const ListPage = (props) => {
    const [inputFilterValue, setInputFilterValue] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({})

    function handleCreateMobilizationButtonClick() {
        props.changeTab('createNewPages');
    }

    function handleListUserButtonClick(content) {
        props.setFilters({ ...props.filters, selectedPage: { pageId: content.id, info: content } })
        props.changeTab('listUser');
    }

    function handleEditPageClick(content) {
        props.setFilters({ ...props.filters, selectedPage: { pageId: content.id, info: content } })
        props.changeTab('editPage');
    }

    function onCardClick(content) {
        setModalData(content)
        setShowModal(true)
    }

    function filterPageList() {
        return props.pageList.filter((el) => {
            return el.segmentname.toLowerCase().indexOf(inputFilterValue.toLowerCase()) > -1
        })
    }
    return (
        <>
            <Header onBtnClick={handleCreateMobilizationButtonClick}
                companyInfo={props.companyInfo} inputFilterValue={inputFilterValue}
                setInputFilterValue={setInputFilterValue} />
            <div style={{ marginBottom: 10 }}>
                <span className='secondary-title'>
                    Suas mobilizações ({props.pageList?.length})
                </span>
            </div>
            <div className='admin-page-scroll'>
                {props.pageList
                    ?
                    (<>
                        {filterPageList()?.map((value, index) => (
                            <Card content={value} key={index} pageList={props.pageList}
                                setPageList={props.setPageList} handleEditPageClick={handleEditPageClick}
                                onCardClick={onCardClick} index={index} />
                        ))}
                    </>)
                    :
                    (<CardLoader />)
                }
            </div>


            <VisualizationModal showModal={showModal} setShowModal={setShowModal}
                modalData={modalData} handleListUserButtonClick={handleListUserButtonClick} />
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        pageList: state.admin.pageList,
        filters: state.admin.filters,
        adminInfo: state.admin.adminInfo,
        companyInfo: state.company.companyInfo,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setPageList: (data) => dispatch(setPageList(data)),
        setFilters: (data) => dispatch(setFilters(data)),
        setAdminInfo: (data) => dispatch(setAdminInfo(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);