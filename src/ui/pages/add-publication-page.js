import * as R from "ramda";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import useAuth from '../use-auth.js'

import Citation from "../parts/bibtex-citation.js";

import firebaseInit from "../../firebaseInit.js";

let example = `
@article{genovese_executions_2019,
	title = {Executions in ({Semi}-){Integer} {Petri} {Nets} are {Compact} {Closed} {Categories}},
	volume = {287},
	issn = {2075-2180},
	url = {http://arxiv.org/abs/1805.05988},
	doi = {10.4204/EPTCS.287.7},
	abstract = {In this work, we analyse Petri nets where places are allowed to have a negative number of tokens. For each net we build its correspondent category of executions, which is compact closed, and prove that this procedure is functorial. We moreover exhibit a procedure to recover the original net from its category of executions, show that it is again functorial, and that this gives rise to an adjoint pair. Finally, we use compact closeness to infer that allowing negative tokens in a Petri net makes the causal relations between transition firings non-trivial, and we use this to model interesting phenomena in economics and computer science.},
	urldate = {2019-08-12},
	journal = {Electronic Proceedings in Theoretical Computer Science},
	author = {Genovese, Fabrizio and Herold, Jelle},
	month = jan,
	year = {2019},
	note = {arXiv: 1805.05988},
	keywords = {Mathematics - Category Theory, Computer Science - Distributed, Parallel, and Cluster Computing},
	pages = {127--144}
}
`;

let exampleCitation = parseBibtex(example);
console.log(exampleCitation);

import parseBibtex from "../../lib/parse-bibtex.js";

export default function AddPublicationPage({ publications }) {

  let authState = useAuth()
  
  // form mode: 'ready' -> 'submitting' -> 'ok' | 'error'
  let [state, setState] = useState("ready");
  let [citation, setCitation] = useState({
    parsed: exampleCitation,
    bibtex: example
  });

  let changeHandler = event => {
    let bibtex = event.target.value;
    let parsed = parseBibtex(bibtex);
    if(parsed) {
      setCitation({ parsed, bibtex });
    }
  };

  let handleSubmit = () => {
    // only submit if valid citation
    if (!citation) {
      return;
    }

    let replaceUndefined = (x) => R.pipe(
      R.toPairs,
      R.map(([k,v]) => [k, v ? v : false]),
      R.fromPairs
    )(x)

    citation.user = 
    setState("submitting");
    console.log("submit", citation.bibtex, citation.parsed);
    firebaseInit()
      .firestore()
      .collection("publications")
      .doc(citation.parsed.citeKey)
      .set(replaceUndefined(citation))
      .then(() => {
        setState("ok");
      })
      .catch(error => {
        setState(error);
      });
    // ^ hack: using state to hold error, using the default case in `switchView`
    // this breaks when error === 'ready' or 'submitting, which is unlikelly
  };

  let submitForm = (
    <>
      <p>
        <b>How to add a citation?</b> We suggest that you paste a DOI, Arxiv URL, or similar and into <a href="zbib.org">zbib.org</a>.
        Then you go to "Export" and select download BiBTeX. Then open the file and copy it's contents and paste below.<br></br>
        aAlternatively, you can create a BiBTeX file manually, <a href="https://truben.no/latex/bibtex/">here</a>.
      </p>
      <p>Paste valid BiBTeX here:</p>
      <div style={{ display: "flex", flex: 1 }}>
        <textarea
          style={{
            height: "100%",
            flex: "1",
            fontFamily: "monospace",
            margin: "1rem"
          }}
          onChange={changeHandler}
          defaultValue={example}
          className="bibtex-input"
        />
        <div style={{ flex: 1, margin: "1rem" }}>
          <Citation citation={citation.parsed} />
          <button
            onClick={() => {
              handleSubmit();
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );

  let publishingNotice = (
    <>
      <p>Publishing... please wait</p>
    </>
  );

  let publishingError = err => (
    <>
      <p>Publishing: something went wrong: ${err}</p>
    </>
  );

  let publishingSuccess = (
    <>
      <p>Published sucessfully</p>
      <p>Go to: <code><Link to={`/publication/${citation.parsed.citeKey}`}>{citation.parsed.citeKey}</Link></code></p>
    </>
  );

  let switchView = () => {
    switch (state) {
      case "submitting":
        return publishingNotice;
      case "ok":
        return publishingSuccess;
      case "ready":
        return submitForm;
      default:
        return publishingError(state);
    }
  };


  let isLoggedIn = () => <>
      <h2>Submit Publication</h2>
      {switchView()}
    </>

return (
    <div  className="mainPadding" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      { authState.user ? isLoggedIn() : 'Please sign in to add a publication.' }
    </div>
  );
}
