import React from "react";
import { withTypes } from "react-final-form";

import WhiteBackground from '../parts/white-background.js'
// https://hackmd.io/udwS94xLRXCSt1aE6YefvQ

export default function About() {
  return (
    <div
      className="mainPadding"
      style={{
        maxWidth: "40em",
        textAlign: "justify",
        justifyContent: "inter-word"
      }}>
      <h2>Applied category theory</h2>
      <p>
      Applied category theory is the application of <i>category theory</i> (and related fields of pure mathematics) to other fields, especially in engineering, science and social science.
      </p>
      <p>
        Applied category theory is quite a diverse field, but relatively common themes are a focus on <i>compositionality</i> to reason in a scalable way, and the use of <i>string diagrams</i> as a practical notation.
      </p>
      <p>
        Existing sub-fields of applied category theory include:
        <ul>
          <li>functional programming</li>
          <li>programming language semantics</li>
          <li>quantum computing</li>
          <li>linguistics</li>
          <li>open systems</li>
          <li>machine learning</li>
          <li>probability</li>
        </ul>
      </p>
      <p>
        This site serves two different (but related) purposes:
      </p>
      <ol>
        <li>
          It is a community hub and research wiki for the{" "}
          <a href="/about">Applied category theory</a> community, just as the{" "}
          <a href="https://ncatlab.org/nlab/show/HomePage">nLab</a> and <a href="https://nforum.ncatlab.org/">nForum</a> are for higher
          category theory.
        </li>
        <li>
          It is a place to collect more pedagogical material on category
          theory that is simpler than you will find on the nLab, but more
          in-depth than is suitable for Wikipedia
        </li>
      </ol>
    </div>
  );
}
