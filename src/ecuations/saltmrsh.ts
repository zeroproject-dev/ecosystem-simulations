import { drawPlot, $in } from "src/lib";

function calculateData() {
  let Q3 = parseFloat($in("Q3").value);
  let x = parseInt($in("X").value);
  let y = parseInt($in("Y").value);
  let z = parseInt($in("Z").value);

  let i0 = 200;
  let m = 7;
  let n = 6.5;
  let j0 = 0.002;
  let q1 = 0.2;
  let q2 = 10;
  let j = 0.02;
  let e = 1;
  let p1 = 0.05;
  let p2 = 30;
  let p3 = 30;
  let k0 = 20;
  let k1 = 0.02;
  let k2 = 0.0004;
  let k3 = 4e-07;
  let k4 = 0.05;
  let k5 = 2e-05;
  let k6 = 4e-05;
  let k7 = 0.0036;
  let k8 = 6.000001e-04;
  let k9 = 3.2e-09;
  let t = 0;
  let ti = 0;
  let ji = 0;
  let ii = 0;

  let tiempo = [];
  let valorQ1 = [];
  let valorJ = [];
  let valorQ2 = [];
  let valorI = [];
  let valorQ3 = [];

  while ((t / n) < 320) {
    let i = (2000 + (1 + Math.sin(t / 58)) * 2000) * y;
    j = (0.02 * (1 + Math.cos(t / 58))) * z;
    e = (2 + Math.sin(t / 27)) * x;
    let r = i / (1 + k0 * q1);
    let d1 = j - k5 * q1 * r + k3 * q2 + k9 * Q3 - k4 * q1 * e;
    let d2 = k1 * q1 * r - k7 * q2 - k2 * q2;
    let d3 = k7 * q2 - k8 * Q3 - k6 * Q3 * e;
    q1 = q1 + m * d1;
    let qi1 = q1;
    if (q1 < 0.01) {
      q1 = 0.01;
    }
    q2 = q2 + m * d2;
    let qi2 = q2;
    Q3 = Q3 + m * d3;
    let qi3 = Q3;

    // Agregar los valores al arreglo
    tiempo.push(t / n);
    valorQ1.push(qi1 / p1);
    valorJ.push(ji / j0);
    valorQ2.push(qi2 / p2);
    valorI.push(ii / i0);
    valorQ3.push(qi3 / p3);

    ji = j;
    ii = i;

    ti = t;
    t += m;
  }

  return [
    { x: tiempo, y: valorQ1, mode: 'lines', name: 'Q1' },
    { x: tiempo, y: valorJ, mode: 'lines', name: 'J' },
    { x: tiempo, y: valorQ2, mode: 'lines', name: 'Q2' },
    { x: tiempo, y: valorI, mode: 'lines', name: 'I' },
    { x: tiempo, y: valorQ3, mode: 'lines', name: 'Q3' }
  ];
}

export function Saltmrsh() {
  const data = calculateData();

  const layout = {
    title: 'Pantano salino',
    xaxis: { title: 'Tiempo' },
    yaxis: { title: 'Valor' },
  };

  drawPlot({ data, layout });
}
