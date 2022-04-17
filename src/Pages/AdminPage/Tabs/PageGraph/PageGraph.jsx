//Libs
import React, { memo } from "react";
import { connect } from "react-redux"

//Graph
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
    , BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';

import locale from 'antd/es/date-picker/locale/pt_BR';

//Components
import { Row, Col } from "react-bootstrap"

//Script
import { parseUA } from "../../../../scripts/utils"

//Store

const dayjs = require('dayjs')
var isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)




const PageGraph = (props) => {
    const __pie_colors = ['#82ca9d', '#8884d8'];

    function formatDate(_date) {
        var date = new Date(_date)
        return `${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}/${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}`
    }

    function getVisualizationPerDay() {
    }

    function getUserAgentData() {
        // obj = {
        // platform: "desktop",
        // value: 400
        // }
        var totalMobileCount = 0;
        var totalDesktopCount = 0;

        props.privatePageList.forEach((value) => {
            var desktopList = [];
            var mobileList = [];

            value.log.forEach((logObj) => {
                var parsedUA = parseUA(logObj.userAgent);
                if (Object.getOwnPropertyNames(parsedUA.Mozilla).find((el) => el.toLowerCase() === "iphone"
                    || el.toLowerCase() === "android")) {
                    mobileList.push(logObj);
                } else desktopList.push(logObj)
            });

            totalMobileCount += mobileList.length;
            totalDesktopCount += desktopList.length;
        })

        return [
            {
                Platform: "Computador",
                Views: totalDesktopCount
            },
            {
                Platform: "Celular",
                Views: totalMobileCount
            }
        ]
    }

    function getViewPerPage() {
        // obj = {
        //     name: "pagina01",
        //     views: "12"
        // }
        let finalData = [];

        props.privatePageList.forEach((value) => {
            finalData.push({ name: value.segmentname, views: value.log.length })
        });

        return finalData;
    }

    return (
        <>
            <Row>
                <Col sm={12} md={8} lg={8} xl={8} style={{ maxHeight: 340 }}>
                    <div>
                        <h5 className="text-center">Visualizações por dia por página</h5>
                    </div>
                    {/* <ResponsiveContainer width={'100%'} height="100%">
                        <LineChart
                            width={500}
                            height={300}
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="Frontend" stroke="#8884d8" />
                            <Line type="monotone" dataKey="Backend" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer> */}
                </Col>
                <Col sm={12} md={4} lg={4} xl={4} style={{ maxHeight: 340 }}>
                    <div>
                        <h5 className="text-center">Plataformas de acesso</h5>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={730} height={250}>
                            <Tooltip isAnimationActive />
                            <Pie data={getUserAgentData()} dataKey="Views" nameKey="Platform"
                                cx="50%" cy="50%" outerRadius={80} fill="#82ca9d"
                                label={(value) => (`${value.payload.payload.Views}`)}
                            >
                                {getUserAgentData().map((entry, index) => {
                                    return <Cell key={`cell-${index}`} fill={__pie_colors[index % __pie_colors.length]} />
                                })}
                            </Pie>
                        </PieChart>

                    </ResponsiveContainer>
                </Col>
            </Row>
            <Row>
                <Col sm={12} md={12} lg={12} xl={12} style={{ maxHeight: 340 }}>
                    <div>
                        <h5 className="text-center">Visualizações por página</h5>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart width={730} height={250} data={getViewPerPage()}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="views" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </Col>
            </Row>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        privatePageList: state.admin.privatePageList
    }
}

export default connect(mapStateToProps, null)(memo(PageGraph))