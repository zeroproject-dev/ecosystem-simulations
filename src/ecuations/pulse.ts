import { drawPlot, $in } from "src/lib";

function calculateData() {
  let TM = parseFloat($in("TM").value);
  let K2 = 0.01 * parseFloat($in("K2").value);
  let K4 = 0.01 * parseFloat($in("K4").value);
  const maxTime = parseInt($in('T').value);

  let t = 0;
  let e = 1;
  let q = 2;
  let c = 2;
  let k1 = 0.02;
  let k3 = 0.0003;
  let f1 = 0.05;
  let f2 = 0.1;
  let q0 = 1;
  let c0 = 1;
  let t0 = 2;
  let dt = 0.5;

  let tiempo = [];
  let valorQ = [];
  let valorC = [];

  do {
    let m = TM - f1 * q - f2 * c;
    let dq = k1 * e * m - K2 * q - k3 * c * c * q;
    let dc = K2 * q + k3 * q * c * c - K4 * c;
    let qi = q + dq * dt;
    let ci = c + dc * dt;
    let t1 = t + dt;

    tiempo.push(t * t0);
    valorQ.push(q * q0);
    valorC.push(c * c0);

    t = t1;
    q = qi;
    c = ci;

  } while ((t * t0) <= maxTime);

  return [
    { x: tiempo, y: valorQ, type: 'scatter', name: 'Q', line: { color: 'blue' } },
    { x: tiempo, y: valorC, type: 'scatter', name: 'C', line: { color: 'pink' } },
  ];
}

export function Pulse() {
  const data = calculateData();

  const layout = {
    title: 'Pulso y Reciclaje',
    xaxis: { title: 'Tiempo' },
    yaxis: { title: 'Valor' },
  };

  drawPlot({ data, layout });
}
