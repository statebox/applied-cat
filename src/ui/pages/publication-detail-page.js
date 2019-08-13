import * as R from "ramda";
import React from 'react'
import Citation from "../parts/bibtex-citation.js";
import { Link } from "react-router-dom";

export default function PublicationDetailPage({ publications, match }) {
  let publicationId = match.params.publicationId;
  let publication =
    R.head(R.filter(R.propEq("id", publicationId), publications)) || {};

  let showTimestamp = pub => {
    if (pub.date) {
      let d = pub.date.toDate();
      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      return `${month}/${year}`;
    }
    return "";
  };

  return (
    <div>
      <Citation input={publication.input} />
    </div>
  );
}
