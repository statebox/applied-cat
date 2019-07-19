import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import useAuth from "./use-auth.js";
import { LoginLink, LoginRoute, SignupLink, SignupRoute } from "./routing.js";

import Header from "./parts/header.js";
import Sidenav from "./parts/sidenav.js";

import LoginPage from "./pages/login-page.js"
import SignupPage from "./pages/signup-page.js"
import AccountPage from "./pages/account-page.js"

import LandingPage from "./pages/landing-page.js"

import EventsPage from './pages/events-page.js'

let placeHolder = (s) => () => (<div>{s}</div>)
let DashboardPage = placeHolder("dashboard")
let Publications = placeHolder("publications")
let Lectures = placeHolder("lectures")


import About from './pages/about-page.js'


function MainPage() {
  let authState = useAuth();
  return !authState.user ? <LandingPage /> : <DashboardPage />;
}


/*

- account
- events
- publications
- lectures
- my starred talks
- wiki

*/


function App() {
  return (
    <Router>
      <Header />
      <div id="layout">
        <Sidenav />
        <div id="main">
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/about" component={About} />
            <Route exact path="/account" component={AccountPage} />
            <Route exact path="/account/login" component={LoginPage} />
            <Route exact path="/account/signup" component={SignupPage} />
            <Route path="/events" component={EventsPage} />
            <Route path="/publications" component={Publications} />
            <Route path="/lectures" component={Lectures} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
