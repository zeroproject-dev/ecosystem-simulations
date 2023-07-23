import { drawPlot, $in } from "src/lib";

function calculateData() {
  let K = parseFloat($in("K").value);
  let Q0 = parseFloat($in("Q0").value);
  const maxTime = parseInt($in("T").value);

  let t = [];
  let Q = [];

  let i = 0;
  while (i <= maxTime) {
    let DQ = -K * Q0;
    Q0 = Q0 + DQ;
    t.push(i++);
    Q.push(Q0);
  }

  const trace = {
    x: t,
    y: Q,
    type: "scatter",
    mode: "lines",
    name: "Drenaje",
    line: { color: "blue" },
  };

  return [trace];
}

export function DrainingTank() {
  let data = calculateData();

  let layout = {
    title: "Tanque de drenaje",
    xaxis: {
      title: "Tiempo (t)",
      zeroline: false,
    },
    yaxis: {
      title: "Nivel del liquido (Q)",
      zeroline: false,
    },
  };

  drawPlot({ data, layout });
  data = null;
}
