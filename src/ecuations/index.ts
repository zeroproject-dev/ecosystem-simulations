import { DrainingTank } from "./draining-tank";
import { LogisticGrowth } from "./logistic-growth";
import { Compete } from "./compete";
import { Coop } from "./coop";
import { Exclus } from "./exclus";

interface ShowData {
  [key: string]: Function
}

const showData: ShowData = {
  "draining-tank": DrainingTank,
  "logistic-growth": LogisticGrowth,
  "compete": Compete,
  "coop": Coop,
  "exclus": Exclus,
}

export function show(id: string) {
  return showData[id]();
}
