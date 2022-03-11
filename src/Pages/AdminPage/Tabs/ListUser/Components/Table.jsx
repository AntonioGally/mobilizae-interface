//Libs
import React, { useEffect, useState } from "react";

//Components
import { Table as TableAntd, Input } from "antd"
import { FilterOutlined } from '@ant-design/icons';

//Scripts
import { formatDate, sort, downloadToCsv, copyToClipBoard } from "../../../../../scripts/utils";

const Table = (props) => {
    const [filteredValue, setFilteredValue] = useState({
        name: "",
        email: "",
        number: "",
        segmentname: "",
        grouplink: "",
        createdat: "",
        isnewsletteractive: "",
        company_name: "",
        company_subdomain: "",
    });
    const [searchInputValue, setSearchInputValue] = useState("");
    const [copy, setCopy] = useState(false);
    const getColumnFilterProps = (dataIndex) => {
        return {
            filterIcon: () => <FilterOutlined style={filteredValue[dataIndex] !== "" ? { color: "#1890ff" } : { color: "#000" }} />,
            onFilter: (value, record) => {
                return record[dataIndex] ? record[dataIndex]?.toString()?.toLowerCase()?.includes(value?.toLowerCase()) : "";
            },
            filteredValue: [filteredValue[dataIndex]] || null,
            filterDropdown: () => (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder={`Pesquise nessa coluna`}
                        value={filteredValue[dataIndex]}
                        onChange={e => setFilteredValue((prevState) => { return { ...prevState, [dataIndex]: e.target.value } })}
                        style={{ marginBottom: 8, display: 'block' }}
                    />
                </div>
            ),
        }
    }

    function getTableColumns() {
        return [
            {
                title: "Nome",
                key: "name",
                dataIndex: "name",
                sorter: {
                    compare: (a, b) => sort(a.name, b.name)
                },
                fixed: 'left',
                ...getColumnFilterProps("name"),
            },
            {
                title: "Email",
                key: "email",
                dataIndex: "email",
                sorter: {
                    compare: (a, b) => sort(a.email, b.email)
                },
                ...getColumnFilterProps("email"),
            },
            {
                title: "Número",
                key: "number",
                dataIndex: "number",
                ...getColumnFilterProps("number"),
            },
            {
                title: "Página que participa",
                key: "segmentname",
                dataIndex: "segmentname",
                sorter: {
                    compare: (a, b) => sort(a.segmentname, b.segmentname)
                },
                ...getColumnFilterProps("segmentname"),
                render: (text) => {
                    return (
                        <a href={`${window.location.origin}/#/${text}`} target="_blank" rel="noreferrer">
                            {`${window.location.origin}/#/${text}`}
                        </a>
                    )
                }
            },
            {
                title: "Link do grupo",
                key: "grouplink",
                dataIndex: "grouplink",
                sorter: {
                    compare: (a, b) => sort(a.grouplink, b.grouplink)
                },
                ...getColumnFilterProps("grouplink"),
                render: (text) => (
                    <a href={text} target="_blank" rel="noreferrer">
                        {text}
                    </a>
                )
            },
            {
                title: "Data de cadastro",
                key: "createdat",
                dataIndex: "createdat",
                sorter: {
                    compare: (a, b) => sort(a.createdat, b.createdat)
                },
                render: (text) => formatDate(text, false),
                ...getColumnFilterProps("createdat")
            },
            {
                title: "Permissão SMS",
                key: "isnewsletteractive",
                dataIndex: "isnewsletteractive",
                sorter: {
                    compare: (a, b) => sort(a.isnewsletteractive ? "Ativo" : "Desativo", b.isnewsletteractive ? "Ativo" : "Desativo")
                },
                // ...getColumnFilterProps("isnewsletteractive"),
                render: (text) => {
                    return text ? "Ativo" : "Desativo"
                }
            },
            {
                title: "Nome empresa",
                key: "company_name",
                dataIndex: "company_name",
                sorter: {
                    compare: (a, b) => sort(a.company_name, b.company_name)
                },
                ...getColumnFilterProps("company_name"),
            },
            {
                title: "Subdominio empresa",
                key: "company_subdomain",
                dataIndex: "company_subdomain",
                sorter: {
                    compare: (a, b) => sort(a.company_subdomain, b.company_subdomain)
                },
                ...getColumnFilterProps("company_subdomain"),
            },
        ]
    }

    function filteredData() {
        return props.dataSource.filter((el) => {
            var isDataFiltered = false;
            Object.getOwnPropertyNames(el).forEach((header) => {
                if (el[header] && typeof el[header] === 'string' && header !== "grouplink") {
                    if (el[header].indexOf(searchInputValue) > -1) isDataFiltered = true;
                }
            })
            return isDataFiltered
        });
    }

    function handleButtonClick(shouldDownload) {
        var arrHeaders = Object.getOwnPropertyNames(props.dataSource[0]);
        var objHeaders = {}
        arrHeaders.forEach((value) => {
            objHeaders[value] = value;
        })
        var body = props.dataSource;
        shouldDownload && downloadToCsv(objHeaders, body, "tabela_usuarios");
        !shouldDownload && copyToClipBoard(objHeaders, body, ";");
    }

    useEffect(() => {
        if (copy) {
            setTimeout(() => {
                setCopy(false);
            }, 2000)
        }
    }, [copy])


    return (
        <>
            <div className="table-header">
                <input value={searchInputValue} onChange={(e) => setSearchInputValue(e.target.value)}
                    className="table-input" placeholder="Pesquisar na tabela" />
                <div>
                    <button onClick={() => { handleButtonClick(false); setCopy(true) }}>
                        {copy ? "Copiado!" : "Copiar"}
                    </button>
                    <button onClick={() => handleButtonClick(true)}>Baixar CSV</button>
                </div>
            </div>
            <TableAntd dataSource={filteredData()} columns={getTableColumns()} scroll={{ x: 1780, y: 500 }}
                className="list-page-table" />
        </>
    )
}

export default Table;