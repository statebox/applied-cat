import * as R from 'ramda'
import bibtexParse from 'bibtex-parse-js'

export default function parse (input) {
    // invalid input
    if (!input || input.trim() === '') {
        return false
    }

    // parse into list of citations
    let citations = bibtexParse.toJSON(input)

    // doesn't contain enough citations (1 is enough)
    if (citations.length < 1) {
        return false
    }
    
    // take the first
    let citation = R.head(citations)

console.log('C', citation)

    // pick out the known keys
    let knownKeys = ['title', 'abstract', 'doi', 'url', 'author', 'year']
    let stripped = R.omit(knownKeys, citation.entryTags)
    let cleanUp = s => s ? R.replace(/[{}]/g, '', s) : false
    
    let known = R.fromPairs(R.map(k => [
        k,  // dictionary key
        cleanUp(citation.entryTags[k]) // value
    ], knownKeys))

    let knownWithCitekey = R.assoc('citeKey', citation.citationKey, known)

    // store the rest under 'extra'
    return R.assoc('extra', stripped, knownWithCitekey)
}