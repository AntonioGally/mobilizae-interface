//Libs
import React, { useEffect } from "react";
import { Route, HashRouter, Switch } from "react-router-dom";
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
import RedirectPage from "./Pages/RedirectPage";

const Router = (props) => {

  function isAuthenticatedAdmin() {
    let token = localStorage.getItem("access_token");
    if (!token) return false;
    else return true
  }

  function getCompanyInfo() {
    return new Promise((resolve, reject) => {
      var host = window.location.host
      var subdomain = host.split('.')[0];
      if (
        subdomain === undefined
        || subdomain === "www"
        || subdomain.indexOf("localhost") > -1
        || subdomain.indexOf("mobilizae") > -1
      ) {
        subdomain = "camarasbc"
      }
      console.log("Getting data from -> ", host, subdomain)
      request.get(`/companyInfo/${subdomain}`)
        .then((data) => { resolve(data.data); })
        .catch((err) => { reject(err); })
    })
  }

  function getPages(companyId) {
    return new Promise((resolve, reject) => {
      request.get(`/public/pages/${companyId}`)
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

  const ProtectedRoute = ({ Component, ...rest }) => {
    return (
      <Route
        {...rest}
        component={isAuthenticatedAdmin() ? AdminPage : RedirectPage}
      />
    )
  }

  if (!props.pageList) return <span>loading..</span>
  console.log(props.pageList.map((value) => {
    return new PageFactory(value, value.id);
  }))
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={DefaultPage} />
        <ProtectedRoute path="/admin" />
        {props.pageList.map((value) => {
          return new PageFactory(value, value.id);
        })}
        <Route component={RedirectPage} />
      </Switch>
    </HashRouter>
  );
};

const mapStateToProps = state => {
  return {
    companyInfo: state.company.companyInfo,
    adminInfo: state.admin.adminInfo,
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