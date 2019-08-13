import React from "react";
import { Route, Link } from "react-router-dom";



function Root({ match }) {
    return (
    <div>
      <p>Requested root: {match.params.id}</p>;
      <h5>Contracts:</h5>
        <ul>
          <li>
            <Link to={`${match.url}/c0`}>Components</Link>
          </li>
          <li>
            <Link to={`${match.url}/c1`}>Props v. State</Link>
          </li>
        </ul>
    </div>
    )
}

export default function Browse({ match }) {
    return (
      <div>
        <h3>Browse</h3>
  
        <h5>Roots:</h5>
        <ul>
          <li>
            <Link to={`${match.url}/root0`}>root0</Link>
          </li>
          <li>
            <Link to={`${match.url}/root1`}>root1</Link>
          </li>
        </ul>
  
        <Route path={`${match.path}/:id`} component={Root} />
        <Route
          exact
          path={match.path}
          render={() => <p>Please select a root.</p>}
        />
      </div>
    );
  }