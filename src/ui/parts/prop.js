import * as R from 'ramda'
import React from 'react'

export default function Prop({ name, val }) {
    if (name === 'Citation Key') {
        return (<><b>{name}:</b> <code>{val}</code><br /></>)
    } else {
        if (name === 'DOI') {
            return (<><b>{name}:</b> <a href={`https://doi.org/${val}`}>{val}</a><br /></>)
        } else {
            if (R.test(/^http/, val)) {
                return (<><b>{name}:</b> <a href={val}>{val}</a><br /></>)    
            } else {
                return (<><b>{name}:</b> {val}<br /></>)
            }
        }
    }
}