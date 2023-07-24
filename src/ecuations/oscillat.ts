import { drawPlot, $in } from "src/lib";

function calculateData() {
  let ej = parseFloat($in('E').value);
  let k6 = 0.01 * parseFloat($in('K6').value);
  const maxTime = parseInt($in("T").value);
  let isRenovable = $in('A').checked;

  let c = 5;
  let k1 = 0.002;
  let k4 = 0.1;
  let k5 = 0.02;
  let k8 = 0.3;
  let p0 = 0.08;
  let h = 10;
  let t0 = 3.2;
  let dt = 0.1;
  let t = 0;
  let dh: number, dc: number, dp: number;
  let c1: number, h1: number, p1: number;
  let k = 0.01;
  let k0 = 0.01;
  let k9 = 0.005;
  let p = 0;

  const tValues = [];
  const cValues = [];
  const hValues = [];
  const pValues = [];

  function unlimitedSource() {
    ej = 0.1 * ej;
    while (t * t0 < maxTime) {
      dh = k1 * ej * h - k4 * c * h;
      dc = k5 * c * h - k8 * c;
      c1 = c + dc * dt;
      if (c1 < 5) {
        c1 = 5;
      }
      h1 = h + dh * dt;
      if (h1 < 8) {
        h1 = 8;
      }
      tValues.push(t * t0);
      cValues.push(c);
      hValues.push(h);
      pValues.push(p);
      c = c1;
      h = h1;
      t += dt;
    }
  }

  function renewableSource() {
    while (t * t0 < maxTime) {
      dp = k0 * ej - k9 * p - k * p * h;
      dh = k1 * p * h - k4 * c * h - k6 * h;
      dc = k5 * c * h - k8 * c;
      c1 = c + dc * dt;
      if (c1 < 1) {
        c1 = 1;
      }
      h1 = h + dh * dt;
      if (h1 < 1) {
        h1 = 1;
      }
      p1 = p + dp * dt;
      if (p1 < 0.001) {
        p1 = 0.001;
      }
      tValues.push(t * t0);
      cValues.push(c);
      hValues.push(h);
      pValues.push(p * p0);
      c = c1;
      h = h1;
      p = p1;
      t += dt;
    }
  }

  if (isRenovable)
    renewableSource();
  else unlimitedSource();

  const trace1 = {
    x: tValues,
    y: cValues,
    type: 'scatter',
    name: 'C',
    line: { color: 'blue' }
  };

  const trace2 = {
    x: tValues,
    y: hValues,
    type: 'scatter',
    name: 'H',
    line: { color: 'red' }
  };

  const trace3 = {
    x: tValues,
    y: pValues,
    type: 'scatter',
    name: 'P',
    line: { color: 'green' }
  };

  return [trace1, trace2, trace3];
}

export function Oscillat() {
  const data = calculateData();

  const layout = {
    title: 'Oscilación Presa-Depredador',
    xaxis: { title: 'Tiempo (t)' },
    yaxis: { title: 'Población (Q)' },
  };

  drawPlot({ data, layout });
}
