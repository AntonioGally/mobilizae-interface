import React, { useState, useEffect } from "react";
import { Route, HashRouter, Switch } from "react-router-dom";

import { getPages } from "./scripts/utils";
import PageFactory from "./scripts/PageFactory.js"

import DefaultPage from "./Pages/DefaultPage";
import AdminPage from "./Pages/AdminPage";

const Router = () => {
  const [pages, setPages] = useState([]);
  useEffect(() => {
    getPages().then((data) => {
      setPages(data);
    })
  }, [])

  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={DefaultPage} />
        <Route path="/admin" component={AdminPage} />
        {pages && pages.map((value) => {
          return new PageFactory(value, value.id);
        })}
      </Switch>
    </HashRouter>
  );
};

export default Router;