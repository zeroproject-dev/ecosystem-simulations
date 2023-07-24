import { drawPlot, $in } from "src/lib";

function calculateData() {
  const tn = parseFloat($in("TN").value);
  const g2 = parseFloat($in("G2").value);
  let a = $in("A").checked;
  const maxTime = parseInt($in("T").value);

  let i = 10;
  let q = 1000;
  const g1 = 5000;
  const k = 0.9;
  const k1 = 8;
  const k2 = 0.01;
  const f = 0.01;
  const n0 = 0.9;
  let n = tn - f * q;

  let tiempo = [];
  let valorQ = [];
  let valorN = [];
  let t = 0;

  while (t < maxTime) {
    const r = i / (1 + k * n);
    if (q > g1 && !a) {
      const tnMinusFg1 = tn - f * g1;
      const tnMinusFg2 = tn - f * g2;
      tiempo.push(t);
      valorQ.push(g1 / 100);
      valorN.push(tnMinusFg1 * n0);
      tiempo.push(t);
      valorQ.push(g2 / 100);
      valorN.push(tnMinusFg2 * n0);
      q = g2;
    }
    const dq = k1 * n * r - k2 * q;
    const qi = q + dq;
    const ni = tn - f * qi;

    tiempo.push(t);
    valorQ.push(q / 100);
    valorN.push(n * n0);

    t += 1;
    q = qi;
    n = ni;
  }

  return [
    { x: tiempo, y: valorQ, mode: 'lines', name: 'Q (Incendio)', line: { color: 'green' } },
    { x: tiempo, y: valorN, mode: 'lines', name: 'N (Nutrientes)', line: { color: 'blue' } }
  ];
}

export function Fire() {
  const data = calculateData();

  const layout = {
    title: 'Incendio',
    xaxis: { title: 'Tiempo' },
    yaxis: { title: 'Valor' },
  };

  drawPlot({ data, layout });
}
