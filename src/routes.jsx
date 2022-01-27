//Libs
import React, { useEffect } from "react";
import { Route, HashRouter, Switch, Redirect } from "react-router-dom";
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
import RedirectPage from "./Pages/RedirectPage";

const Router = (props) => {

  function isAuthenticatedAdmin() {
    // TODO: jwt verification endpoint
    // if ()
    return false;
  }

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

  const ProtectedRoute = ({ Component, ...rest }) => {
    //TODO: Create a redirect page to put into else clause
    return (
      <Route
        {...rest}
        component={isAuthenticatedAdmin() ? AdminPage : RedirectPage}
      />
    )
  }


  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={DefaultPage} />
        <ProtectedRoute path="/admin" />
        <Route component={RedirectPage} />
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