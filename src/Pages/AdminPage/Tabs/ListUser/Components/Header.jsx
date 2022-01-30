import React from "react"

const Header = (props) => {
  return (
    <>
      <span className="secondary-title" style={{ marginBottom: 12 }}>
        Listar usuários
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
        </div>
        <div className='admin-list-page-header-right-side'>
          <input placeholder='Pesquisar pela mobilização' value={props.inputFilterValue}
            onChange={(e) => props.setInputFilterValue(e.target.value)} />
        </div>
      </div>
    </>
  )
}

export default Header;