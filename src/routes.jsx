import React from "react";
import { Route, HashRouter, Switch } from "react-router-dom";

import { mockedData } from "./utils";
import PageFactory from "./PageFactory.js"

import DefaultPage from "./Components/DefaultPage.jsx";
import AdminPage from "./Components/AdminPage/index.jsx";

const Router = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={DefaultPage} />
        <Route path="/admin" component={AdminPage} />
        {mockedData.map((value) => {
          return new PageFactory(value);
        })}
      </Switch>
    </HashRouter>
  );
};

export default Router;