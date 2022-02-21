//Libs
import React, { memo, useEffect } from "react";
import { connect } from "react-redux"

//Graph
import {
    AreaChart, Area,
    PieChart, Pie,
    BarChart, Bar,
    ResponsiveContainer,
    Legend, Tooltip, CartesianGrid,
    XAxis, YAxis,
} from 'recharts';

//Components
import { Row, Col } from "react-bootstrap"
import { toast } from "react-toastify"

//Script
import authRequest from "../../../../scripts/http/authRequest"

//Store
import { setUserList } from "../../../../store/actions/admin";

const UserGraph = (props) => {
    //CHART DATA FUNCTIONS
    function getUserPerDayData() {
        var orderedUserList = props.userList.slice().sort((a, b) => {
            var aDate = new Date(a.createdat);
            var bDate = new Date(b.createdat);
            if (aDate > bDate) {
                return 1;
            } else if (bDate > aDate) {
                return -1;
            } else return 0;
        })
        var formattedList = orderedUserList.map((value) => {
            var date = new Date(value.createdat);
            var strDate = `${date.getDate()}/${date.getMonth() + 1}`;
            return {
                ...value,
                createdDate: strDate
            }
        });
        var labelsArr = [];
        var dataArr = [];
        formattedList.forEach((value) => {
            if (!labelsArr.find((el) => el.includes(value.createdDate))) {
                labelsArr.push(value.createdDate)
            }
        });
        labelsArr.forEach((value) => {
            var auxArr = [];
            formattedList.forEach((user) => {
                if (value === user.createdDate) {
                    auxArr.push({ user: user })
                }
            })
            dataArr.push(auxArr)
        })
        var finalData = new Array(labelsArr.length).fill("-");
        finalData = finalData.map((value, index) => {
            return {
                name: labelsArr[index],
                Quantidade: dataArr[index]?.length
            }
        })
        return finalData
    }
    function getUserPercentData() {
        var copy = props.userList.slice();
        var acceptedSMS = copy.filter((el) => el.isnewsletteractive);
        var refusedSMS = copy.filter((el) => !el.isnewsletteractive);
        const dataInNumbers = [
            {
                Grupo: "N Ativos",
                valueNumber: acceptedSMS.length,
            },
            {
                Grupo: "N Desativos",
                valueNumber: refusedSMS.length,
            }
        ];
        const dataInPercent = [
            {
                Grupo: "Ativos",
                valuePercent: Number(((acceptedSMS.length * 100) / (copy.length)).toFixed(2)),
            },
            {
                Grupo: "Desativos",
                valuePercent: Number(((refusedSMS.length * 100) / (copy.length)).toFixed(2)),
            }
        ]
        return { dataInNumbers, dataInPercent };
    }
    function getUserPerSegmentData() {
        var labelsArr = [];
        var dataArr = [];
        var copy = props.userList.slice();

        copy.forEach((value) => {
            if (!labelsArr.find((el) => el.includes(value.segmentname))) {
                labelsArr.push(value.segmentname)
            }
        })
        labelsArr.forEach((value) => {
            var auxArr = [];
            copy.forEach((user) => {
                if (value === user.segmentname) {
                    auxArr.push({ user })
                }
            })
            dataArr.push(auxArr)
        })
        var finalData = new Array(labelsArr.length).fill("-");
        finalData = finalData.map((value, index) => {
            return {
                name: labelsArr[index],
                Quantidade: dataArr[index]?.length
            }
        })
        return finalData
    }
    function getUserPerHour() {
    }

    useEffect(() => {
        if (!props.userList) {
            authRequest.get(`users/${props.companyInfo.id}`)
                .then((data) => {
                    props.setUserList(data.data);
                })
                .catch((err) => {
                    toast.error("Unable to load users")
                    console.log(err)
                })
        }
    }, [])

    return (
        <>
            {props.userList ? (
                <>
                    <Row style={{ minHeight: "40vh" }}>
                        <Col sm={12} md={8} lg={8} xl={8}>
                            <h5 className="text-center">Quandidade de usuários cadastrados por dia</h5>
                            <ResponsiveContainer width={'100%'} height="90%">
                                <AreaChart data={getUserPerDayData()}>
                                    <defs>
                                        <linearGradient id="Quantidade" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <Area type="monotone" dataKey="Quantidade" stroke="#82ca9d" fillOpacity={1} fill="url(#Quantidade)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </Col>
                        <Col sm={12} md={4} lg={4} xl={4}>
                            <h5 className="text-center">SMS ativo e desativo</h5>
                            <ResponsiveContainer width={'100%'} height="90%">
                                <PieChart>
                                    <Tooltip isAnimationActive={true}
                                        formatter={(value, name, params) => params.dataKey === "valuePercent" ? [`%${value}`, name] : [value, name]} />
                                    <Pie data={getUserPercentData().dataInNumbers} dataKey="valueNumber" nameKey="Grupo" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
                                    <Pie data={getUserPercentData().dataInPercent} dataKey="valuePercent" nameKey="Grupo" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
                                </PieChart>
                            </ResponsiveContainer>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 20, minHeight: "45vh" }}>
                        <Col sm={12} md={12} lg={12} xl={12} >
                            <h5 className="text-center">Usuários por segmento</h5>
                            <ResponsiveContainer width={'100%'} height="90%">
                                <BarChart data={getUserPerSegmentData()}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="Quantidade" fill="#82ca9d" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Col>
                    </Row>
                </>
            ) : <div style={{ textAlign: 'center' }}>
                <h5>Carregando...</h5>
            </div>}
        </>
    )
}

const mapStateToProps = state => {
    return {
        companyInfo: state.company.companyInfo,
        userList: state.admin.userList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setUserList: (data) => dispatch(setUserList(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(UserGraph))