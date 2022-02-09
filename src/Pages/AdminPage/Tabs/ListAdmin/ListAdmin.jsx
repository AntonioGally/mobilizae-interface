import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

//Components
import { toast } from "react-toastify"
import Header from './Components/Header';
import Card from './Components/Card';
import CardLoader from "../ListPage/Components/CardLoader"
// import VisualizationModal from './Components/VisualizationModal'

//Style
import "./ListAdmin.style.css"

//Scripts
import authRequest from "../../../../scripts/http/authRequest"

//Store
import { setAdminList } from "../../../../store/actions/admin";


const ListAdmin = (props) => {
    const [inputFilterValue, setInputFilterValue] = useState('');

    function getAdminList() {
        return new Promise((resolve, reject) => {
            authRequest.get("/mobilizae/admin")
                .then((data) => resolve(data.data))
                .catch((err) => reject(err))
        })
    }

    function handleCreateAdminButton() {
        props.changeTab('createNewAdmin');
    }

    function filterAdminList() {
        return props.adminList.filter((el) => {
            return el.name.toLowerCase().indexOf(inputFilterValue.toLowerCase()) > -1
        })
    }

    function handleEditAdminClick(content) {
        console.log(content)
    }

    function handleOnCardClick(content) {

    }

    useEffect(() => {
        if (!props.adminList) {
            getAdminList().then((data) => {
                props.setAdminList(data)
            }).catch((err) => {
                console.log(err)
                toast.error("Houve algum problema ao listar administradores")
            })
        }
    }, [])

    return (
        <>
            <Header onBtnClick={handleCreateAdminButton} inputFilterValue={inputFilterValue}
                setInputFilterValue={setInputFilterValue} />

            <div style={{ marginBottom: 10 }}>
                <span className='secondary-title'>
                    Lista de administradores ({props.adminList?.length})
                </span>
            </div>

            <div className='admin-page-scroll'>
                {props.adminList
                    ?
                    (<>
                        {filterAdminList()?.map((value, index) => (
                            <Card content={value} key={index} adminList={props.adminList}
                                setAdminList={props.setAdminList}
                                handleEditAdminClick={handleEditAdminClick}
                                onCardClick={handleOnCardClick} />
                        ))}
                    </>)
                    :
                    (<CardLoader />)
                }
            </div>

        </>
    )
}

const mapStateToProps = (state) => {
    return {
        adminList: state.admin.adminList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAdminList: (data) => dispatch(setAdminList(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListAdmin);