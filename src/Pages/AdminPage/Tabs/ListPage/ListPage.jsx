import React, { useState, useEffect, memo } from 'react'
import { connect } from "react-redux";

//Components
import { toast } from 'react-toastify';
import Header from './Components/Header';
import Card from './Components/Card';
import Table from './Components/Table';
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
    const [visualizationType, setVisualizationType] = useState('cards');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletePageLoading, setDeletePageLoading] = useState(false);

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

    function handleDeletePage(id) {
        setDeletePageLoading(true);
        authRequest.delete(`/pages/${id}`)
            .then(() => {
                var newArr = props.privatePageList.slice();
                newArr = newArr.filter((el) => el.id !== id)
                props.setPrivatePageList(newArr);
                toast.success("Página deletada")
            })
            .catch((err) => { toast.error("Houve um erro ao deletar a página") })
            .finally(() => { setDeletePageLoading(false); setShowDeleteModal(false) })
    }

    function filterPageList() {
        return props.privatePageList.filter((el) => {
            return el.segmentname.toLowerCase().indexOf(inputFilterValue.toLowerCase()) > -1
        })
    }

    function getPrivatePageList() {
        props.companyInfo && authRequest.get(`/pages/${props.companyInfo.id}`)
            .then((data) => { props.setPrivatePageList(data.data) })
            .catch((err) => { toast.error("Erro ao listar segmentos"); console.log(err) })
    }

    useEffect(() => {
        if (!props.privatePageList) getPrivatePageList();
    }, [props.companyInfo])

    return (
        <>
            <Header onBtnClick={handleCreateMobilizationButtonClick}
                companyInfo={props.companyInfo} inputFilterValue={inputFilterValue}
                setInputFilterValue={setInputFilterValue} setVisualizationType={setVisualizationType}
                visualizationType={visualizationType} />
            <div style={{ marginBottom: 10 }}>
                <span className='secondary-title'>
                    Suas mobilizações ({props.privatePageList?.length})
                </span>
            </div>
            <div className='admin-page-scroll'>
                {props.privatePageList ? (
                    <>
                        {visualizationType === "table" ?
                            (<Table dataSource={props.privatePageList} handleEditPageClick={handleEditPageClick}
                                handleDeletePage={handleDeletePage} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />)
                            : (
                                <>
                                    {filterPageList()?.map((value, index) => {
                                        return (<Card content={value} key={index} handleEditPageClick={handleEditPageClick}
                                            onCardClick={onCardClick} handleDeletePage={handleDeletePage} deletePageLoading={deletePageLoading}
                                            showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />)
                                    })}
                                </>
                            )}
                    </>
                ) : (<CardLoader />)}
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