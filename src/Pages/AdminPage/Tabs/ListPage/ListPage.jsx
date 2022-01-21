import React, { useState } from 'react'

//Components
import Header from './Components/Header';
import Card from './Components/Card';

//Style
import "./ListPage.style.css"

//Data
import { pages } from "../../../../scripts/api"

const ListPage = () => {
    const [inputFilterValue, setInputFilterValue] = useState('');
    return (
        <>
            <Header inputFilterValue={inputFilterValue} setInputFilterValue={setInputFilterValue} />
            <div style={{ marginBottom: 10 }}>
                <span className='secondary-title'>Suas mobilizações</span>
            </div>
            {pages.map((value, index) => (
                <Card content={value} key={index} />
            ))}
        </>
    )
}

export default ListPage;