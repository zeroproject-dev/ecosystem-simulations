import { drawPlot, $in } from "src/lib";

function calculateData() {
  let q = parseFloat($in('Q1').value);
  let q2 = parseFloat($in('Q2').value);
  let k5 = 0.01 * parseFloat($in('K5').value);
  let k3 = 0.01 * parseFloat($in('K3').value);
  let k6 = 0.01 * parseFloat($in('K6').value);
  let k4 = 0.01 * parseFloat($in('K4').value);
  let coop = $in('A').checked;
  let k1 = 0.08;
  let k2 = 0.04;
  let k7 = 0.003;
  let k8 = 0.003;
  let i = 5;
  let t = 0;
  let ti = 0;
  let qi = q;
  let qi2 = q2;

  const maxTime = parseInt($in("T").value);

  const tValues = [];
  const qValues = [];
  const q2Values = [];
  const q2CoopValues = [];

  while (t <= maxTime) {
    tValues.push(t);

    let r: number;
    let d1: number;
    let d2: number;

    if (coop) {
      r = i / (1 + k8 * q * q + k2 * q);
      if (r < 0) {
        r = 0;
      }
      d1 = k7 * r * q * q - k3 * q;
    } else {
      r = i / (1 + k1 * q + k2 * q2);
      if (r < 0) {
        r = 0;
      }
      d1 = k5 * r * q - k3 * q;
    }

    d2 = k6 * r * q2 - k4 * q2;
    q += d1;
    q2 += d2;

    qValues.push(q);
    q2Values.push(q2);
    q2CoopValues.push(2 * q);

    t += 1;
    ti = t;
    qi = q;
    qi2 = q2;
  }

  const trace1 = {
    x: tValues,
    y: qValues,
    type: 'scatter',
    name: 'Población Q1',
    line: { color: 'blue' }
  };

  const trace2 = {
    x: tValues,
    y: q2Values,
    type: 'scatter',
    name: 'Población Q2',
    line: { color: 'red' }
  };

  const trace3 = {
    x: qValues,
    y: q2CoopValues,
    type: 'scatter',
    name: 'Interacción cooperativa (2 * Q)',
    line: { color: 'orange' }
  };

  return coop ? [trace1, trace2, trace3] : [trace1, trace2];
}

export function Exclus() {
  const data = calculateData();

  const layout = {
    title: 'Competencia por fuentes limitadas',
    xaxis: { title: 'Tiempo (t)' },
    yaxis: { title: 'Población (Q)' },
  };

  drawPlot({ data, layout });
}
