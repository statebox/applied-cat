import * as R from 'ramda'
import React, { useState } from 'react'

import Citation from '../parts/bibtex-citation.js'

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
`

export default function AddPublicationPage({publications}) {
  
  let [input, setInput] = useState(example);
  
  let changeHandler = (event) => {
    let value = event.target.value
    setInput(value)
  }

  return (
      <div style={{flex:1, display:'flex', flexDirection: 'column'}}>
        <h2>Submit Publication</h2>
        <p>Paste valid BiBTeX here:</p>
        <div style={{display:'flex', flex: 1}}>
          <textarea
            style={{height: '100%', flex: '1', fontFamily: 'monospace', margin: '1rem'}}
            onChange={changeHandler}
            defaultValue={example}
            className="bibtex-input">
          </textarea>
          <div style={{flex: 1, margin: '1rem'}}>
            <Citation input={input}></Citation>
            <button>Submit</button>
          </div>
        </div>
      </div>
    )
  }          