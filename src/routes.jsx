import React, { useState, useEffect } from "react";
import { Route, HashRouter, Switch } from "react-router-dom";

import { getPages } from "./utils";
import PageFactory from "./PageFactory.js"

import DefaultPage from "./Components/DefaultPage.jsx";
import AdminPage from "./Components/AdminPage/Login.jsx";

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
          return new PageFactory(value);
        })}
      </Switch>
    </HashRouter>
  );
};

export default Router;