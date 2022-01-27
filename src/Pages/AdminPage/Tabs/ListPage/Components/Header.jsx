import React from 'react'

const Header = (props) => {
    return (
        <div className='admin-list-page-header'>
            <div className='admin-list-page-header-left-side'>
                <span className='secondary-title'>Olá f5mkt</span>
                <div>
                    <button onClick={props.onBtnClick}>Criar mobilização</button>
                    <button>Assistir ao vídio tutorial</button>
                </div>
            </div>
            <div className='admin-list-page-header-right-side'>
                <input placeholder='Pesquisar pela mobilização' value={props.inputFilterValue}
                    onChange={(e) => props.setInputFilterValue(e.target.value)} />
            </div>
        </div>
    )
}

export default Header;