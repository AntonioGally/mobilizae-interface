import React, { memo } from "react";
import { connect } from "react-redux"
import {
    LineChart,
    ResponsiveContainer,
    Legend, Tooltip,
    Line,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';
import { Row, Col } from "react-bootstrap"

const UserGraph = (props) => {
    //CHART DATA FUNCTIONS
    function getUserPerDayData() {
        var orderedUserList = props.userList.slice().sort((a, b) => {
            var aDate = new Date(Number(a.createdDate.seconds) * 1000);
            var bDate = new Date(Number(b.createdDate.seconds) * 1000);
            if (aDate > bDate) {
                return 1;
            } else if (bDate > aDate) {
                return -1;
            } else return 0;
        })
        var formattedList = orderedUserList.map((value) => {
            var date = new Date(Number(value.createdDate.seconds) * 1000);
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
                // masterArr.push({ data: [], labels: value.createdDate });
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
        var finalData = new Array(6).fill("-");
        finalData = finalData.map((value, index) => {
            return {
                name: labelsArr[index],
                ammount: dataArr[index].length
            }
        })
        return finalData
    }
    function getUserPercentData() {

    }
    function getUserPerSegmentData() {

    }
    function getUserPerHour() {

    }
    return (
        <>
            <Row style={{ minHeight: "40vh" }}>
                <Col sm={12} md={8} lg={8} xl={8}>
                    {props.userList ? (
                        <>
                            <ResponsiveContainer width={'100%'} height="100%">
                                <LineChart data={getUserPerDayData()} >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="ammount" stroke="#8884d8" />
                                </LineChart>
                            </ResponsiveContainer>

                        </>
                    ) : <span>Loading...</span>}
                </Col>
                <Col sm={12} md={6} lg={6} xl={6}></Col>
            </Row>
            <Row>
                <Col sm={12} md={6} lg={6} xl={6} ></Col>
                <Col sm={12} md={6} lg={6} xl={6} ></Col>
            </Row>
        </>
    )
}

const mapStateToProps = state => {
    return {
        userList: state.admin.userList
    }
}

export default connect(mapStateToProps, null)(memo(UserGraph))