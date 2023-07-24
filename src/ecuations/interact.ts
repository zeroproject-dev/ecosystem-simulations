import { drawPlot, $in } from "src/lib";

function calculateData() {
  const E = parseInt($in("E").value);
  const K5 = parseFloat($in("K5").value) / 1000;
  const K6 = parseFloat($in("K6").value) / 1000;

  const maxTime = parseInt($in("T").value);

  let t = 0;
  let Evalue = E / 100;
  let K1 = 0.07;
  let K2 = 0.08;
  let K3 = 0.002;
  let K4 = 0.001;
  let Q1 = 3;
  let Q2 = 3;

  const pointsQ1 = [];
  const pointsQ2 = [];

  while (t <= maxTime) {
    const ti = t + 1;
    const D1 = K1 * Evalue * Q1 - K3 * Q1 * Q1 - K5 * Q1 * Q2;
    const D2 = K2 * Evalue * Q2 - K4 * Q2 * Q2 - K6 * Q1 * Q2;
    const Q1i = Q1 + D1;
    const Q2i = Q2 + D2;

    pointsQ1.push([t, 270 - Q1]);
    pointsQ2.push([t, 270 - Q2]);

    t = ti;
    Q1 = Q1i;
    Q2 = Q2i;
  }

  return [
    {
      x: pointsQ1.map((point) => point[0]),
      y: pointsQ1.map((point) => point[1]),
      mode: "lines",
      name: "Población 1",
      line: { color: "blue" },
    },
    {
      x: pointsQ2.map((point) => point[0]),
      y: pointsQ2.map((point) => point[1]),
      mode: "lines",
      name: "Población 2",
      line: { color: "green" },
    },
  ];
}

export function Interact() {
  const data = calculateData();

  const layout = {
    title: 'Dos poblaciones con interacciones competitivas',
    xaxis: { title: 'Tiempo (t)' },
    yaxis: { title: 'Población (Q)' },
  };

  drawPlot({ data, layout });
}
