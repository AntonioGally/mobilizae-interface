//Libs
import React, { useState } from "react";

//Components
import { Table as TableAntd, Input } from "antd"
import { FilterOutlined } from '@ant-design/icons';

//Scripts
import { formatDate, sort } from "../../../../../scripts/utils";

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
                title: "Link do grup",
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
                ...getColumnFilterProps("createdat")
            },
            {
                title: "Permissão SMS",
                key: "isnewsletteractive",
                dataIndex: "isnewsletteractive",
                sorter: {
                    compare: (a, b) => sort(a.isnewsletteractive ? "Ativo" : "Desativo", b.isnewsletteractive ? "Ativo" : "Desativo")
                },
                ...getColumnFilterProps("isnewsletteractive"),
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



    return (
        <TableAntd dataSource={props.dataSource} columns={getTableColumns()} scroll={{ x: 1780, y: "auto" }}
            className="list-page-table" />
    )
}

export default Table;