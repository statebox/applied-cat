import * as R from 'ramda'
import React from "react";

import useAuth from '../use-auth.js'

import { AccountLink } from '../routing.js'
import { Link } from 'react-router-dom'

let mapi = R.addIndex(R.map)

function navElements (authState) {
  // logged in
  if (authState.user) {
    return [
      <Link to="/">Home</Link>,
      <Link to="/about">About</Link>,
      <AccountLink/>,
      <Link to="/events">Events</Link>,
      <Link to="/publications">Publications</Link>,
      <Link to="/lectures">Lectures</Link>
    ]
  }

  // else, not logged in
  return []
}

export default function Sidenav() {
  let authState = useAuth()
  let elements = navElements(authState)
  return (
    <div id="sidenav">
      { mapi((x,i) => <div className="sidenav-item" key={i}>{x}</div>, elements) }
    </div>
  )
}