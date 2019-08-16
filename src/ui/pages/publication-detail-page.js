import * as R from "ramda";
import React from 'react'
import Citation from "../parts/bibtex-citation.js";

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
    <div className="mainPadding">
      <Citation citation={publication.parsed} />
      <h5>Bibtex:</h5>
      <pre style={{ wordBreak: 'break-word', width: '80rem', whiteSpace: 'pre-wrap' }}>
        {publication.bibtex}
      </pre>
    </div>
  );
}
