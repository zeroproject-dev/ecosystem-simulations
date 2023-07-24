import { DrainingTank } from "./draining-tank";
import { LogisticGrowth } from "./logistic-growth";
import { Compete } from "./compete";
import { Coop } from "./coop";
import { Exclus } from "./exclus";
import { Interact } from "./interact";
import { Oscillat } from "./oscillat";
import { NetProd } from "./netprod";
import { OpenAq } from "./openaq";
import { Pulse } from "./pulse";
import { Saltmrsh } from "./saltmrsh";
import { Fire } from "./fire";
import { Climax } from "./climax";

interface ShowData {
  [key: string]: Function;
}

const showData: ShowData = {
  "draining-tank": DrainingTank,
  "logistic-growth": LogisticGrowth,
  "compete": Compete,
  "coop": Coop,
  "exclus": Exclus,
  "interact": Interact,
  "oscillat": Oscillat,
  "netprod": NetProd,
  "openaq": OpenAq,
  "pulse": Pulse,
  "saltmrsh": Saltmrsh,
  "fire": Fire,
  "climax": Climax,
}

export function show(id: string) {
  return showData[id]();
}
