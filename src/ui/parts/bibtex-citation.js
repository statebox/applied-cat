import * as R from 'ramda'
import React from 'react'
import bibtexParse from 'bibtex-parse-js'

let mapi = R.addIndex(R.map)

import Prop from '../parts/prop.js'

export default function Citation({ input }) {
    if (!input) {
        return <div> - </div>
    }

    var citations = bibtexParse.toJSON(input)

    function MkElem({ citation }) {
        if (!citation) {
            return <></>
        }
        let knownKeys = ['title', 'abstract', 'doi', 'url', 'author', 'year']
        let stripped = R.omit(knownKeys, citation.entryTags)
        let et = citation.entryTags

        let keys = R.keys(stripped)

        return (
            <div>
                <h4>Publication: <i>{et.title.replace(/[{}]/g,'')}</i></h4>
                <p style={{ wordBreak: 'break-word', width: '80rem', whiteSpace: 'pre-wrap' }}>{et.abstract}</p>
                <p>
                    <Prop name='Author(s)' val={et.author} />
                    <Prop name='Year' val={et.year} />
                    <Prop name='DOI' val={et.doi} />
                    <Prop name='URL' val={et.url} />
                    <Prop name='Citation Key' val={citation.citationKey} />
                </p>
                <p>
                    <br/><i>Additional Tags:</i><br/><br/>
                    {mapi((x,i) => <Prop key={i} name={keys[i]} val={stripped[x]}/>, keys)}
                </p>
            </div>
        )
    }

    return (
        <>
            {mapi((c, i) => <MkElem key={i} citation={c} />, citations)}
        </>
    )
}
