import { $in, drawPlot } from "../lib/index"

function calculateData() {
  let q1 = parseFloat($in('Q1').value);
  let q2 = parseFloat($in('Q2').value);
  const k5 = 0.01 * parseFloat($in('K1').value);
  const k6 = 0.01 * parseFloat($in('K2').value);
  const k3 = 0.01 * parseFloat($in('K3').value);
  const k4 = 0.01 * parseFloat($in('K4').value);
  const maxTime = parseInt($in("T").value);

  let k1 = 0.08;
  let k2 = 0.04;
  let k7 = 0.002;
  let k8 = 0.002;
  let t = 0;
  let ti = 0;
  let qi1 = q1;
  let qi2 = q2;

  const tValues = [];
  const q1Values = [];
  const q2Values = [];

  while (t < maxTime) {
    tValues.push(t);

    let r = 1 / (1 + k1 * q1 * q2 - k2 * q1 * q2);
    if (r < 0) {
      r = 0;
    }

    const dq1 = k5 * r * q1 * q2 - k7 * q1 * q2 - k3 * q1;
    const dq2 = k6 * r * q1 * q2 - k8 * q1 * q2 - k4 * q2;

    q1 += dq1;
    q2 += dq2;

    q1Values.push(q1);
    q2Values.push(q2);

    t += 1;
    ti = t;
    qi1 = q1;
    qi2 = q2;
  }

  const trace1 = {
    x: tValues,
    y: q1Values,
    type: 'scatter',
    name: 'Población Q1',
    line: { color: 'green' }
  };

  const trace2 = {
    x: tValues,
    y: q2Values,
    type: 'scatter',
    name: 'Población Q2',
    line: { color: 'red' }
  };

  return [trace1, trace2];
}

export function Coop() {
  const data = calculateData();

  const layout = {
    title: 'Existencia Cooperativa',
    xaxis: { title: 'Tiempo (t)' },
    yaxis: { title: 'Población (Q)' },
  };

  drawPlot({ data, layout });
}
