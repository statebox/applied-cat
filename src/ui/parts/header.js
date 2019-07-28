import React from "react"

import useAuth from '../use-auth.js'

import { AccountLink, BrowseLink } from '../routing.js'

export default function Header() {
  let authState = useAuth()
    
  let showDisplayName = (!authState.user) ? null :
      <>
        <AccountLink><code>{authState.user.displayName}</code></AccountLink>
      </>
    

  if(!authState.user) {
    return null
  }

  return (
    <div id="header">
      <div id="auth-header">
        {showDisplayName}
      </div>
      {/* <div id="auth-header" style={{backgroundColor: 'orange', fontFamily: 'Fira code'}}>
        <BrowseLink></BrowseLink>
      </div> */}
    </div>
  )
}