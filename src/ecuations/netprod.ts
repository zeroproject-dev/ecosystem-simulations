import { drawPlot, $in } from "src/lib";

function calculateData() {
  let q = 0.1 * parseFloat($in('Q').value);
  let k1 = 0.01 * parseFloat($in('K1').value);
  let k2 = 0.01 * parseFloat($in('K2').value);

  let t = 0;
  let t1 = 0.001;
  let n = 1;
  let d0 = 300;
  let q0 = 300;
  let dq1 = 0.001;

  const tValues = [];
  const sValues = [];
  const pValues = [];
  const dqValues = [];
  const qValues = [];

  while (t < 320) {
    let s: number;
    switch (n) {
      case 1:
        s = 200000;
        break;
      case 2:
        s = 350000;
        break;
      case 3:
        s = 450000;
        break;
      case 4:
        s = 350000;
        break;
      default:
        n = 1;
        s = 200000;
        break;
    }
    n += 1;
    let p = k1 * s;
    let c = k2 * q;
    let dq = p - c;
    q += dq;

    if (t > 0) {
      tValues.push(t1 * 10);
      sValues.push(s / 10000);
      pValues.push(p / d0);
      dqValues.push(dq / d0);
      qValues.push(q / q0);
    }

    dq1 = dq;
    t1 = t;
    t += 1;
  }

  const trace1 = {
    x: tValues,
    y: sValues,
    type: 'scatter',
    name: 'Fuente S',
    line: { color: 'red' }
  };

  const trace2 = {
    x: tValues,
    y: pValues,
    type: 'scatter',
    name: 'Producción bruta P',
    line: { color: 'blue' }
  };

  const trace3 = {
    x: tValues,
    y: dqValues,
    type: 'scatter',
    name: 'Producción neta P-C',
    line: { color: 'green' }
  };

  const trace4 = {
    x: tValues,
    y: qValues,
    type: 'scatter',
    name: 'Almacenamiento Q',
    line: { color: 'blue' }
  };

  return [trace1, trace2, trace3, trace4];
}

export function NetProd() {
  const data = calculateData();

  const layout = {
    title: 'Producción neta',
    xaxis: { title: 'Tiempo (t)' },
    yaxis: { title: 'Valor' },
  };

  drawPlot({ data, layout });
}
