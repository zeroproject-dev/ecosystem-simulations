import { drawPlot, $in } from "src/lib";

function calculateData() {
  let ee = 0.1 * parseFloat($in("E0").value);
  let q = parseFloat($in("Q0").value);
  let k4 = 0.0001 * parseFloat($in("K0").value);
  let k1 = 0.04;
  const maxTime = parseInt($in("T").value);

  let tValues = [];
  let QValues = [];

  while (tValues.length <= maxTime) {
    let dq = k1 * ee * q - k4 * q * q;
    q += dq;
    tValues.push(tValues.length);
    QValues.push(q);
  }

  const trace1 = {
    x: tValues,
    y: QValues,
    type: 'scatter',
    mode: 'lines',
    line: { color: 'orange' }
  };

  return [trace1]
}

export function LogisticGrowth() {
  const data = calculateData();
  const layout = {
    title: 'Crecimiento logístico',
    xaxis: { title: 'Tiempo (t)' },
    yaxis: { title: 'Población (Q)' }
  };

  drawPlot({ data, layout });
}
