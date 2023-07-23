import { DrainingTank } from "./draining-tank";
import { LogisticGrowth } from "./logistic-growth";
import { Compete } from "./compete";
import { Coop } from "./coop";

interface ShowData {
  [key: string]: Function
}

const showData: ShowData = {
  "draining-tank": DrainingTank,
  "logistic-growth": LogisticGrowth,
  "compete": Compete,
  "coop": Coop,
}

export function show(id: string) {
  return showData[id]();
}
