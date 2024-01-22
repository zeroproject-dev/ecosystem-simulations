import { drawPlot, $in } from "src/lib";

function calculateData() {
  const k4 = parseFloat($in("K4").value) * 0.000001;
  const i = parseFloat($in("I").value) * 0.01;
  let a = $in("A").checked;
  const maxTime = parseInt($in("T").value);

  let s = a ? 0 : 1;

  let b = 100;
  let d = 1;
  let k0 = 0.027;
  let k1 = 0.0002;
  let k2 = 2;
  let k3 = 0.00417;
  let k5 = 0.01;
  let k6 = 0.000175;
  let k7 = 0.00004;
  let k8 = 0.000005;
  let k9 = 0.002;
  let b0 = 0.003;
  let g0 = 3;
  let p0 = 3.2;
  let d0 = 3;
  let dt = 10;

  let tiempo = [];
  let valorD = [];
  let valorB = [];
  let valorPG = [];
  let valorDB = [];
  let t = 0, r = 0, dd = 0, pg = 0, db = 0, bi = 0, di = 0, pgi = 0, dbi = 0, ti = 0;

  while ((t / 15) < maxTime) {
    r = i / (1 + k0 * d + k1 * b);
    dd = k8 * b * s - k9 * d - k7 * d * d;
    pg = k2 * r * d + k3 * r * b;
    db = pg - k6 * b - k4 * b - k5 * d * d;
    bi = b + db * dt;
    di = d + dd * dt;
    pgi = k2 * r * di + k3 * r * bi;
    dbi = pgi - k6 * bi - k4 * bi - k5 * di * di;
    ti = t + dt;

    tiempo.push(t / 15);
    valorD.push(d * d0);
    valorB.push(b * b0);
    valorPG.push(pg * p0);
    valorDB.push(db * g0);

    t = ti;
    d = di;
    b = bi;
  }

  return [
    { x: tiempo, y: valorD, mode: 'lines', name: 'D (Decompositores)', line: { color: 'blue' } },
    { x: tiempo, y: valorB, mode: 'lines', name: 'B (Biomasa)', line: { color: 'green' } },
    { x: tiempo, y: valorPG, mode: 'lines', name: 'PG (Producción Bruta)', line: { color: 'orange' } },
    { x: tiempo, y: valorDB, mode: 'lines', name: 'DB (Decomposición Bruta)', line: { color: 'pink' } }
  ];
}

export function Climax() {
  const data = calculateData();

  const layout = {
    title: 'Sucesión y  climax',
    xaxis: { title: 'Tiempo' },
    yaxis: { title: 'Valor' },
  };

  drawPlot({ data, layout });
}

