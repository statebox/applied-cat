import * as R from 'ramda'
import React from 'react'
import { Link } from "react-router-dom";

import Prop from '../parts/prop.js'

function YoutubeEmbed({url}) {
  let youtubeId = 'MmjBUwnZQZU'
  let w = 1280
  let h = 768
  let src = `https://www.youtube-nocookie.com/embed/${youtubeId}`
  return (
    <iframe width={w} height={h} src={src} frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen></iframe>
  )
}


export default function LecturesPage({lectures, match}) {

  let lectureId = match.params.lectureId
  let lecture =
    R.head(R.filter(R.propEq("id", lectureId), lectures)) || {};

  return (
      <div>
        <h4>Lecture: <i>{lecture.title}</i></h4>
        <Prop name="Link" val={lecture.url}></Prop>
        <YoutubeEmbed url={lecture.url}></YoutubeEmbed>
      </div>
    )
  }          