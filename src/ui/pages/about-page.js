import React from "react";

// https://hackmd.io/udwS94xLRXCSt1aE6YefvQ

export default function About() {
  return (
    <div
      style={{
        maxWidth: "40em",
        textAlign: "justify",
        justifyContent: "inter-word"
      }}
    >
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
    </div>
  );
}
