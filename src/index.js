import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.css';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Routes from "./routes";

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);
