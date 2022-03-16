import React from 'react'

const Header = (props) => {
    return (
        <div className='admin-list-page-header'>
            <div className='admin-list-page-header-left-side'>
                <span className='secondary-title'>
                    Olá {props.companyInfo?.name}
                </span>
                <div>
                    <button onClick={props.onBtnClick} style={{ background: "var(--primary-button-background)", color: "white" }}>Criar mobilização</button>
                    <button>Assistir ao vídeo tutorial</button>
                </div>
                <div style={{ marginTop: 3 }}>
                    <button onClick={() => props.setVisualizationType("cards")}
                        className={props.visualizationType === "cards" ? "active" : ""}
                        style={{ padding: "2px 10px", marginRight: 4 }}>
                        Cards
                    </button>
                    <button onClick={() => props.setVisualizationType("table")}
                        className={props.visualizationType === "table" ? "active" : ""}
                        style={{ padding: "2px 10px" }}>
                        Tabela
                    </button>
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