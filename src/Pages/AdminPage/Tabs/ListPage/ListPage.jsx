import React, { useState, useEffect, memo } from 'react'
import { connect } from "react-redux";

//Components
import { toast } from 'react-toastify';
import Header from './Components/Header';
import Card from './Components/Card';
import CardLoader from "./Components/CardLoader"
import VisualizationModal from './Components/VisualizationModal'

//Style
import "./ListPage.style.css"

//Store
import { setFilters, setAdminInfo, setPrivatePageList } from "../../../../store/actions/admin";

//Scripts
import authRequest from "../../../../scripts/http/authRequest";


const ListPage = (props) => {
    const [inputFilterValue, setInputFilterValue] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({});

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
        return props.privatePageList.filter((el) => {
            return el.segmentname.toLowerCase().indexOf(inputFilterValue.toLowerCase()) > -1
        })
    }

    function getPageList() {
        props.companyInfo && authRequest.get(`/pages/${props.companyInfo.id}`)
            .then((data) => { props.setPrivatePageList(data.data) })
            .catch((err) => { toast.error("Erro ao listar segmentos"); console.log(err) })
    }

    useEffect(() => {
        if (!props.privatePageList) getPageList();
    }, [props.companyInfo])

    return (
        <>
            <Header onBtnClick={handleCreateMobilizationButtonClick}
                companyInfo={props.companyInfo} inputFilterValue={inputFilterValue}
                setInputFilterValue={setInputFilterValue} />
            <div style={{ marginBottom: 10 }}>
                <span className='secondary-title'>
                    Suas mobilizações ({props.privatePageList?.length})
                </span>
            </div>
            <div className='admin-page-scroll'>
                {props.privatePageList
                    ?
                    (<>
                        {filterPageList()?.map((value, index) => {
                            return (<Card content={value} key={index} pageList={props.privatePageList}
                                setPageList={props.privatePageList} handleEditPageClick={handleEditPageClick}
                                onCardClick={onCardClick} index={index} />)
                        })}
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
        privatePageList: state.admin.privatePageList,
        filters: state.admin.filters,
        adminInfo: state.admin.adminInfo,
        companyInfo: state.company.companyInfo,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setPrivatePageList: (data) => dispatch(setPrivatePageList(data)),
        setFilters: (data) => dispatch(setFilters(data)),
        setAdminInfo: (data) => dispatch(setAdminInfo(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(ListPage));