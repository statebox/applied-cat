import * as R from 'ramda'
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

import firebaseInit from "../../firebaseInit.js"

export default function EventsPage() {

  let [events, setEvents] = useState([]);

  useEffect(() => {
    let fb = firebaseInit()

    document.firebase = fb;

    let db = fb.database()
    db.ref('events/ACT2018').once('value').then(snapshot => {
      setEvents(snapshot.val())
    })
  }, []);
  
  let mkEventLink = (s,i) => (
    <span key={i}>
      <Link to={`/events/${s}`}>{s}</Link> &nbsp;
    </span>
  )

  return (
      <div>
        <h2>Events</h2>
        <p>
          {R.addIndex(R.map)(mkEventLink, events)}
        </p>
      </div>
    )
  }          