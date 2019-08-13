import * as R from "ramda";
import React, { useState } from 'react'
import { Link } from "react-router-dom"
import elasticlunr from 'elasticlunr'

export default function SearchPage({ publications, events, lectures, match }) {

    let elasticlunr = false
    let [query, setQuery] = useState('petri net');
    let [results, setResults] = useState([]);

    function handleTyping(event) {
        let q = event.target.value
        if(R.length(q) > 3) {
            setQuery(q)
        } else {
            setQuery('')
        }
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <p>
                Search through {R.length(publications)} publications,
                {R.length(lectures)} lectures and {R.length(events)} events. 
            </p>
            <p>
                <input onChange={handleTyping} style={{width:'40rem', border: '3px solid red'}} focus={true} type="text"></input>
            </p>
            <div>
                {results}
            </div>
        </div>
    );
}

