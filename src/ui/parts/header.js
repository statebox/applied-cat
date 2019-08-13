import React from "react"

import useAuth from '../use-auth.js'

import { AccountLink, BrowseLink } from '../routing.js'

export default function Header() {
  let authState = useAuth()
    
  let showDisplayName = (!authState.user) ? null :
      <>
        <AccountLink><code>{authState.user.displayName}</code></AccountLink>
      </>

  return (
    <div id="header" style={{display:'flex'}}>
      <div id="auth-header">
        {authState.user ? showDisplayName : null}
      </div>
    </div>
  )
}