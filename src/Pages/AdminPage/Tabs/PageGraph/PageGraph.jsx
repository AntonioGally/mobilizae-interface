//Libs
import React, { memo, useEffect, useState } from "react";
import { connect } from "react-redux"

//Graph
import {
    AreaChart, Area,
    PieChart, Pie,
    BarChart, Bar,
    ResponsiveContainer,
    Legend, Tooltip, CartesianGrid,
    XAxis, YAxis, Cell,
} from 'recharts';

import locale from 'antd/es/date-picker/locale/pt_BR';

//Components
import { Row, Col } from "react-bootstrap"
import DatePicker from '../../../../Elements/DatePicker.tsx';
import { toast } from "react-toastify"

//Script
import authRequest from "../../../../scripts/http/authRequest"

//Store
import { setUserList } from "../../../../store/actions/admin";

const dayjs = require('dayjs')
var isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)


const PageGraph = (props) => {
    const [visualizationPerDay, setVisualizationPerDay] = useState([]);

    function getVisualizationPerDay(dateToFilter) {
        
    }

    return (
        <>
            
        </>
    )
}

export default memo(PageGraph)