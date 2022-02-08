import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk";

//Reducers
import adminReducer from "./store/reducers/admin";
import companyReducer from "./store/reducers/company";

//Css
import './styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from "react-toastify";
import Routes from "./routes";

const composeEnhancers = typeof window !== undefined && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  admin: adminReducer,
  company: companyReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <Routes />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);