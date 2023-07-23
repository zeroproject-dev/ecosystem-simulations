import { drawPlot, $in } from "src/lib";

function calculateData() {
  const Q1 = parseFloat($in('Q1').value);
  const Q2 = parseFloat($in('Q2').value);
  const K1 = 0.01 * parseFloat($in('K1').value);
  const K2 = 0.01 * parseFloat($in('K2').value);
  const K3 = 0.01 * parseFloat($in('K3').value);
  const K4 = 0.01 * parseFloat($in('K4').value);
  const a = $in('A').checked;
  const maxTime = parseInt($in("T").value);

  const tValues = [];
  const Q1Values = [];
  const Q2Values = [];

  let Q1i = Q1;
  let Q2i = Q2;

  for (let t = 0; t <= maxTime; t++) {
    tValues.push(t);

    const R = 1 / (1 + K1 * Q1i - K3 * Q1i);

    let D1: number;
    if (!a) {
      D1 = K1 * 1 * Q1i - K3 * Q1i;
    } else {
      D1 = K1 * R * Q1i * Q1i - K3 * Q1i;
    }

    const D2 = K2 * 1 * Q2i - K4 * Q2i;

    Q1i = Q1i + D1;
    Q2i = Q2i + D2;

    Q1Values.push(Q1i);
    Q2Values.push(Q2i);
  }

  const trace1 = {
    x: tValues,
    y: Q1Values,
    type: 'scatter',
    name: 'Población Q1',
    line: { color: 'green' }
  };

  const trace2 = {
    x: tValues,
    y: Q2Values,
    type: 'scatter',
    name: 'Población Q2',
    line: { color: 'blue' }
  };

  return [trace1, trace2]
}

export function Compete() {
  const data = calculateData();

  const layout = {
    title: 'Competencia de dos poblaciones',
    xaxis: { title: 'Tiempo (t)' },
    yaxis: { title: 'Población (Q)' },
  };

  drawPlot({ data, layout });
}
