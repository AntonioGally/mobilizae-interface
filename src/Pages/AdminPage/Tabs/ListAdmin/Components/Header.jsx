import React from 'react'

const Header = (props) => {
    return (
        <div className='admin-list-page-header' style={{ alignItems: 'center' }}>
            <div className='admin-list-page-header-left-side'>
                <div style={{ marginTop: 0 }}>
                    <button onClick={props.onBtnClick}>Criar Administradores</button>
                </div>
            </div>
            <div className='admin-list-page-header-right-side'>
                <input placeholder='Pesquisar pelo nome do admin' value={props.inputFilterValue}
                    onChange={(e) => props.setInputFilterValue(e.target.value)} />
            </div>
        </div>
    )
}

export default Header;