import * as R from 'ramda'
import React from "react"
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

import useAuth from '../use-auth.js'

export default function AccountPage () {
  let {user, signout} = useAuth()

  let SignoutButton = withRouter(({ history }) => (
    <button
      type='button'
      onClick={async () => {
        await signout()
        history.push('/')
      }}
    >Sign out</button>
  ))
  
  let teams = [
    'ACT2019-Oxford'
  ]

  let mkTeamLink = (s,i) =>
    <li key={i}>
      <Link to={`/teams/${s}`}>{s}</Link>&nbsp;
    </li>

  if (user) {
    return (
      <div>
          <h2>Profile</h2>
          <p>
            Your profile information
          </p>
          
          <h4>Conferences you've attended</h4>
          <ul>{R.addIndex(R.map)(mkTeamLink, teams)}</ul>

          <h4>Account Details</h4>
          <div>
            <table>
              <thead>
              <tr>
                <th>Label</th>
                <th>Value</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Name</td>
                <td>{user.displayName}</td>
              </tr>
              <tr>
                <td>E-Mail</td>
                <td><code>{user.email}</code></td>
              </tr>
              <tr>
                <td>User Id</td>
                <td><code>{user.uid}</code></td>
              </tr>
              <tr>
                <td>Verified</td>
                <td>{user.emailVerified ? <b>verified</b> : <i>not verified</i>}</td>
              </tr>
              </tbody>
            </table>
          </div>
      
          <h4>Location</h4>
          <div>
            <tr>
              <td></td>
              <td>TODO</td>
            </tr>  
          </div>

          <h4>Signout</h4>
          <p>
            <SignoutButton/>
          </p>
      
      </div>
    );  
  } else {
    return (<div/>)
  }

}
