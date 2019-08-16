import * as R from 'ramda'
import React from 'react'
import { Link } from "react-router-dom";

export default function LecturesPage({lectures}) {

  let mkLectureLink = (s,i) => (
    <li key={i}>
      <Link to={`/lecture/${s.id}`}>{s.title}</Link> &nbsp;
    </li>
  )

  return (
      <div className="mainPadding">
        <h2>Lectures</h2>
        <p>
          <ol>
            {R.addIndex(R.map)(mkLectureLink, lectures)}
          </ol>
        </p>
      </div>
    )
  }          