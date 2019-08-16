import * as R from "ramda";
import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"


export default function SearchPage({ publications, events, lectures, lunr, match }) {
    
    let [query, setQuery] = useState('petri net');
    let [results, setResults] = useState([]);
    
    function findPub(ref) {
        return R.head(R.filter(R.propEq('id', ref), publications))
    }

    function handleTyping(event) {
        let q = event.target.value
        let autoStar = R.join(' ', R.map(s => `${s}*`, R.split(' ', q)))
        setQuery(autoStar)
        handleSubmit()
    }

    function  handleSubmit(event) {
        console.log('submits')
        if(lunr) {
            let results = lunr.search(query)
            console.log('results', results)
            let r = R.map(d => findPub(d.ref), results)
            setResults(r)
        }
        if (event){ // we call it from handle typing
            event.preventDefault();
        }
    }

    let mkRow = publication => <tr>
        <td><code>{publication.id}</code></td>
        <td>{publication.parsed.year}</td>
        <td><i>{publication.parsed.author}</i><br/>
        <b>{publication.parsed.title}</b></td>
        <td><Link to={`/publication/${publication.id}`}>Details</Link></td>
    </tr>

    return (
        <div className="mainPadding" style={{display: 'flex', flexDirection: 'column'}}>
            <h1>Search</h1>
            <p>
                Search through {R.length(publications)} publications,
                {R.length(lectures)} lectures and {R.length(events)} events. 
            </p>
            {lunr ? <form onSubmit={handleSubmit}>
                    <input onChange={handleTyping} style={{width:'40rem', border: '3px solid purple', backgroundColor: 'rgba(200,0,200,0.3)'}} focus={true} type="text"></input>
                    {/* <input type="submit" value="Submit" /> */}
                </form> : <p>index not loaded</p>}
            <div>
                {R.length(results) > 0 ?
                <>
                    <p>
                        Search query = <code>{query}</code>
                    </p>
                    <table>
                        <thead>
                            <tr>
                                <th>Cite Key</th><th>Year</th><th>Publication</th><th>Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {R.map(mkRow, results)}
                        </tbody>
                    </table>
                </> : <></> }
            </div>
        </div>
    );
}

