import * as R from 'ramda'
import React from 'react'
import { Link } from "react-router-dom";


export default function EventsPage() {
    let teams = [
      'ACT2019-Oxford'
    ]
  
    let mkTeamLink = (s,i) => <span key={i}>
      <Link to={`/events/${s}`}>{s}</Link>
      &nbsp;
    </span>
  
    return (
      <div>
        <h2>Events</h2>
        <p>
          {R.addIndex(R.map)(mkTeamLink, teams)}
        </p>
      </div>
    )
  }          