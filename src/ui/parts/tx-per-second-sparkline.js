import React, { useState, useEffect } from 'react'
import * as R from 'ramda'

import { Sparklines, SparklinesBars, SparklinesLine, SparklinesSpots } from "react-sparklines";


let randomSpikey = () => Math.random() * (Math.random() > 0.1 ? .2 : 1.0)
let randomData = () => R.map(_ => randomSpikey(), R.range(0,48))

export default function TxSec() {

  let [txSec, setTxSec] = useState(randomData())
  
  useEffect(() => {
    let iv = setTimeout(() => {
      let ts = R.slice(0, R.max(0, R.length(txSec) - 1), txSec)
      setTxSec(R.prepend(randomSpikey(), ts))
    }, 1000 + Math.random()*2000)
    return function cleanup() {
      clearTimeout(iv)
    }
  })

  return (
      <p>
        <i>transactions/second:</i> <br/>
        <Sparklines data={txSec} height={20} width={200} style={{height: "20pt", width: "200pt"}}>
          <SparklinesLine style={{ stroke: "black", fill: "none" }} />
          <SparklinesSpots style={{ fill: "orange" }} />
        </Sparklines>
      </p>
  );
}
