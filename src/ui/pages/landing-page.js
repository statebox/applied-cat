import React from "react";

import { LoginLink } from "../routing.js";

import Center from "../parts/center.js";

// https://hackmd.io/bvkJTESdTxumDaODt2lJPg?edit

export default function Landing() {
  return (
    <Center>
      <h1>
        What is <b>act.statebox.org</b>?
      </h1>
      <p>
        This site serves two different (but related) purposes:
        <ol>
          <li>
            It is a community hub and research wiki for the{" "}
            <a href="/about">Applied category theory</a> community, just as the{" "}
            <a href="https://ncatlab.org/nlab/show/HomePage">nLab</a> and <a href="https://nforum.ncatlab.org/">nForum</a> are for higher
            category theory.
          </li>
          <li>
            It is a place to collect more pedagogical material on category
            theory that is simpler than you will find on the nLab, but more
            in-depth than is suitable for Wikipedia
          </li>
        </ol>
      </p>
      <h1><LoginLink /></h1>
    </Center>
  );
}
