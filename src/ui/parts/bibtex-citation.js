import * as R from 'ramda'
import React from 'react'

import Prop from '../parts/prop.js'

export default function Citation({ citation }) {
    if (!citation) {
        return <div> - </div>
    }

    let mkProp = k => <Prop key={`prop-${k}`} name={k} val={citation.extra[k]}/>
    let keys = R.keys(citation.extra)

    return (
        <div>
            <h4>Publication: <i>{citation.title}</i></h4>
            <p style={{ wordBreak: 'break-word', width: '80rem', whiteSpace: 'pre-wrap' }}>{citation.abstract}</p>
            <p>
                <Prop name='Author(s)' val={citation.author} />
                <Prop name='Year' val={citation.year} />
                <Prop name='DOI' val={citation.doi} />
                <Prop name='URL' val={citation.url} />
                <Prop name='Citation Key' val={citation.citeKey} />
                <br></br>
                {R.map(mkProp, keys)}
            </p>
        </div>
    )
}
