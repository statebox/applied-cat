import * as R from 'ramda'
import React, { useEffect, useState } from 'react'

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import useAuth from "./use-auth.js";
import firebaseInit from "../firebaseInit.js"
import { LoginLink, LoginRoute, SignupLink, SignupRoute } from "./routing.js";

import Header from "./parts/header.js";
import Sidenav from "./parts/sidenav.js";

import LoginPage from "./pages/login-page.js"
import SignupPage from "./pages/signup-page.js"
import AccountPage from "./pages/account-page.js"

import LandingPage from "./pages/landing-page.js"

import SearchPage from './pages/search-page.js'
import EventsPage from './pages/events-page.js'

import Publications from './pages/publications-page.js'
import PublicationDetailPage from './pages/publication-detail-page.js'
import AddPublicationPage from './pages/add-publication-page.js'

import LecturesPage from './pages/lectures-page.js'
import LectureDetailsPage from './pages/lecture-details-page.js'


let placeHolder = (s) => () => (<div>{s}</div>)
let DashboardPage = placeHolder("dashboard")


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

  let [events, setEvents] = useState([]);
  let [publications, setPublications] = useState([]);
  let [lectures, setLectures] = useState([]);

  useEffect(() => {
    let fb = firebaseInit()

    document.firebase = fb;

    let db = fb.firestore()
    db.collection('events').get().then(snapshot => {
      let es = []
      snapshot.forEach(doc => {
        es.push(R.assoc('id', doc.id, doc.data()))
      })
      console.log('EVENTS', es)
      setEvents(es)
    })
  }, []);

  useEffect(() => {
    let fb = firebaseInit()

    document.firebase = fb;

    let db = fb.firestore()
    db.collection('publications').get().then(snapshot => {
      let es = []
      snapshot.forEach(doc => {
        es.push(R.assoc('id', doc.id, doc.data()))
      })
      console.log('PUBLICATIONS', es)
      setPublications(es)
    })
  }, []);

  useEffect(() => {
    let fb = firebaseInit()

    document.firebase = fb;

    let db = fb.firestore()
    db.collection('lectures').get().then(snapshot => {
      let es = []
      snapshot.forEach(doc => {
        es.push(R.assoc('id', doc.id, doc.data()))
      })
      console.log('LECTURES', es)
      setLectures(es)
    })
  }, []);

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
            
            <Route path="/search" render={
                (props) => <SearchPage {...props} events={events} lectures={lectures} publications={publications}/>
            }/>
            
            <Route path="/events" render={
                (props) => <EventsPage {...props} events={events}/>
            }/>
            <Route exact path="/publications/add" render={
              (props) => <AddPublicationPage {...props}/>
            }/>
            <Route path="/publications" render={
              (props) => <Publications {...props} publications={publications}/>
            }/>
            <Route path="/publication/:publicationId" render={
               (props) => <PublicationDetailPage {...props} publications={publications}/>
            }/>
            <Route path="/lectures" render={
               (props) => <LecturesPage {...props} lectures={lectures}/>
            }/>
            <Route path="/lecture/:lectureId" render={
               (props) => <LectureDetailsPage {...props} lectures={lectures}/>
            }/>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
