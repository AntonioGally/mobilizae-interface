//Libs
import React, { useEffect } from "react";
import { Route, HashRouter, Switch, useHistory } from "react-router-dom";
import { connect } from "react-redux"

//Actions
import { setCompanyInfo } from "./store/actions/company";
import { setPageList } from "./store/actions/admin.js";

//Scripts
import PageFactory from "./scripts/PageFactory.js"
import request from "./scripts/http/request";

//Pages
import DefaultPage from "./Pages/DefaultPage";
import AdminPage from "./Pages/AdminPage";
import NotFound from "./Pages/NotFound";

const Router = (props) => {
  function getCompanyInfo() {
    return new Promise((resolve, reject) => {
      let subDomain = "antoniogally";
      request.get(`/companyInfo/${subDomain}`)
        .then((data) => { resolve(data.data); })
        .catch((err) => { reject(err); })
    })
  }
  function getPages(companyId) {
    return new Promise((resolve, reject) => {
      request.get(`/pages/${companyId}`)
        .then((data) => { resolve(data.data) })
        .catch((err) => { reject(err) })
    })
  }

  useEffect(() => {
    if (!props.companyInfo || !props.pageList) {
      getCompanyInfo().then((data) => {
        props.setCompanyInfo(data);
        getPages(data.id).then((data) => {
          props.setPageList(data);
        })
      });
    }
  }, []);


  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={DefaultPage} />
        <Route path="/admin" component={AdminPage} />
        <Route component={NotFound} />
        {props.pageList && props.pageList.map((value) => {
          return new PageFactory(value, value.id);
        })}
      </Switch>
    </HashRouter>
  );
};

const mapStateToProps = state => {
  return {
    companyInfo: state.company.companyInfo,
    pageList: state.admin.pageList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCompanyInfo: (data) => dispatch(setCompanyInfo(data)),
    setPageList: (data) => dispatch(setPageList(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Router);