import { drawPlot, $in } from "src/lib";

function calculateData() {
  var TM = parseFloat($in("TM").value);
  var K2 = 0.01 * parseFloat($in("K2").value);
  var K4 = 0.01 * parseFloat($in("K4").value);

  var t = 0;
  var ti = 0;
  var e = 1;
  var q = 2;
  var c = 2;
  var k1 = 0.02;
  var k3 = 0.0003;
  var f1 = 0.05;
  var f2 = 0.1;
  var q0 = 1;
  var c0 = 1;
  var t0 = 2;
  var dt = 0.5;

  var tiempo = [];
  var valorQ = [];
  var valorC = [];

  do {
    var m = TM - f1 * q - f2 * c;
    var dq = k1 * e * m - K2 * q - k3 * c * c * q;
    var dc = K2 * q + k3 * q * c * c - K4 * c;
    var qi = q + dq * dt;
    var ci = c + dc * dt;
    var t1 = t + dt;

    tiempo.push(t * t0);
    valorQ.push(q * q0);
    valorC.push(c * c0);

    t = t1;
    q = qi;
    c = ci;

  } while ((t * t0) <= 320);

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
