
import React from "react";

import { DefaultLayout } from "./pages/DefaultLayout";
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import NoMatch from './pages/NoMatch'
import ListItem from './pages/ListItem'
import Import from './pages/Import'
import Report from './pages/Report'
import Invoice from './pages/Invoice'
import Profile from './pages/Profile'

export default [

  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: Home
  },
  {
    path: "/import",
    exact: true,
    layout: DefaultLayout,
    component: Import
  },
  // {
  //   path: "/login",
  //   // layout: null,
  //   component: Login
  // },
  {
    path: "/register",
    layout: DefaultLayout,
    component: Register
  },
  {
    path: "/list-item",
    layout: DefaultLayout,
    component: ListItem
  },
  {
    path: "/report",
    layout: DefaultLayout,
    component: Report
  },
  {
    path: "/invoice",
    layout: DefaultLayout,
    component: Invoice
  },
  {
    path: "/profile",
    layout: DefaultLayout,
    component: Profile
  },
  {
    path: "*",
    layout: DefaultLayout,
    component: NoMatch
  },
];