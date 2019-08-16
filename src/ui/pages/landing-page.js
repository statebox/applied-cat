import React from "react";

import { LoginLink } from "../routing.js";

import WhiteBackground from '../parts/white-background.js'
import Center from "../parts/center.js";

// https://hackmd.io/bvkJTESdTxumDaODt2lJPg?edit

export default function Landing() {
  return (
    <WhiteBackground>
    <Center>
      <h1>
        Welcome to <code>applied.cat</code>
      </h1>
      <h1> 😸 <LoginLink /></h1>
    </Center>
    </WhiteBackground>
  );
}
