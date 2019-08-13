import * as R from 'ramda'
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

export default function EventsPage({events}) {

  let mkEventLink = (s,i) => (
    <li key={i}>
      <code>{s.id}</code> <Link to={`/events/${s.id}`}>{s.title}</Link> {s.city}, {s.country}, {s.year} &nbsp;
    </li>
  )

  return (
      <div>
        <h2>Events</h2>
        <p>
          <ol>
            {R.addIndex(R.map)(mkEventLink, events)}
          </ol>
        </p>
      </div>
    )
  }          