//Libs
import React, { useState } from "react";

//Components
import { Table as TableAntd, Input } from "antd"
import { FilterOutlined } from '@ant-design/icons';

//Scripts
import { formatDate, sort } from "../../../../../scripts/utils";

const Table = (props) => {
    const [filteredValue, setFilteredValue] = useState({
        pathname: "",
        userCount: "",
        buttontext: "",
        containertext: "",
        createdat: "",
        grouplink: "",
        admin_email: "",
        admin_name: "",
        company_email: "",
        company_name: "",
        company_subdomain: "",
        segmentname: ""
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
                title: "",
                key: "options",
                dataIndex: "options",
                render: (text, record, index) => {
                    return (
                        <>
                            <div className="text-center">
                                <i className="fas fa-pen" style={{ marginRight: 0, color: "#868686", cursor: "pointer" }}
                                    onClick={() => { props.handleEditPageClick(record) }}></i>
                            </div>
                            {/* <i className="fas fa-trash" style={{ color: "#868686", cursor: "pointer" }}
                                onClick={() => props.setShowDeleteModal(true)}></i> */}
                        </>
                    )
                },
                width: "50px"
            },
            {
                title: "Nome do segmento",
                key: "segmentname",
                dataIndex: "segmentname",
                sorter: {
                    compare: (a, b) => sort(a.segmentname, b.segmentname)
                },
                ...getColumnFilterProps("segmentname"),
            },
            {
                title: "Link da página",
                key: "pathname",
                dataIndex: "pathname",
                render: (text, record) => {
                    return (
                        <a href={`${window.location.origin}/#/${text}`} target="_blank" rel="noreferrer" >
                            {`${window.location.origin}/#/${text}`}
                        </a>
                    )
                },
                sorter: {
                    compare: (a, b) => sort(a.pathname, b.pathname)
                },
                ...getColumnFilterProps("pathname"),
            },
            {
                title: "Quantidade participante",
                key: "userCount",
                dataIndex: "userCount",
                sorter: (a, b) => a.userCount - b.userCount,
                ...getColumnFilterProps("userCount"),
            },
            {
                title: "Texto botão",
                key: "buttontext",
                dataIndex: "buttontext",
                sorter: {
                    compare: (a, b) => sort(a.buttontext, b.buttontext)
                },
                ...getColumnFilterProps("buttontext"),
            },
            {
                title: "Texto descrição",
                key: "containertext",
                dataIndex: "containertext",
                sorter: {
                    compare: (a, b) => sort(a.containertext, b.containertext)
                },
                ...getColumnFilterProps("containertext"),
            },
            {
                title: "Data de criação",
                key: "createdat",
                dataIndex: "createdat",
                render: (text) => (formatDate(text, false)),
                sorter: (a, b) => new Date(Number(a.createdat) * 1000) - new Date(Number(b.createdat) * 1000),
                ...getColumnFilterProps("createdat"),
            },
            {
                title: "Link do grupo ativo",
                key: "grouplink",
                dataIndex: "grouplink",
                render: (text, record, index) => {
                    var link = text?.split(";").length > 0 ? text?.split(";")[Math.round(record.userCount / 250)] : text;
                    return (
                        <a href={link} target="_blank" rel="noreferrer">
                            {link}
                        </a>
                    )
                },
                ...getColumnFilterProps("grouplink"),
            },
            {
                title: "Email admin",
                key: "admin_email",
                dataIndex: "admin_email",
                sorter: {
                    compare: (a, b) => sort(a.admin_email, b.admin_email)
                },
                ...getColumnFilterProps("admin_email"),
            },
            {
                title: "Nome admin",
                key: "admin_name",
                dataIndex: "admin_name",
                sorter: {
                    compare: (a, b) => sort(a.admin_name, b.admin_name)
                },
                ...getColumnFilterProps("admin_name"),
            },
            {
                title: "Email empresa",
                key: "company_email",
                dataIndex: "company_email",
                sorter: {
                    compare: (a, b) => sort(a.company_email, b.company_email)
                },
                ...getColumnFilterProps("company_email"),
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
    function getTableData() {
        var contentArray = props.dataSource.slice();
        return contentArray;
    }
    return (
        <>
            <TableAntd dataSource={getTableData()} columns={getTableColumns()} scroll={{ x: 2500, y: "auto" }}
                className="list-page-table" />
        </>
    )
}

export default Table