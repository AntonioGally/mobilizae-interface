import React from "react"

const Header = (props) => {
  return (
    <>
      <span className="secondary-title" style={{ marginBottom: 12 }}>
        Usuários ({props.usersArray?.length})
        <i style={{ marginLeft: 10, cursor: "pointer" }} className="fas fa-redo" onClick={props.getUsers} />
      </span>
      <div className='admin-list-page-header'>

        <div className='admin-list-page-header-left-side'>
          <div>
            <button onClick={() => props.setFilter("all")}
              className={props.filter === "all" ? "admin-list-user-button-active admin-list-user-button" : "admin-list-user-button"}>
              Todos os participantes
            </button>
            <button onClick={() => props.setFilter("page")}
              className={props.filter === "page" ? "admin-list-user-button-active admin-list-user-button" : "admin-list-user-button"}>
              Participantes por mobilização
            </button>
          </div>
          <div style={{ marginTop: 4 }}>
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
          <input placeholder='Pesquisar pelo nome' value={props.inputFilterValue}
            onChange={(e) => props.setInputFilterValue(e.target.value)} />
        </div>
      </div>
    </>
  )
}

export default Header;