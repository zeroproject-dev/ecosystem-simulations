import Plotly from "plotly.js-dist";

export function LogisticGrowth() {
  const $k0 = document.getElementById("K0") as HTMLInputElement;
  const $q0 = document.getElementById("Q0") as HTMLInputElement;
  const $e0 = document.getElementById("E0") as HTMLInputElement;

  function draw() {
    let ee = 0.1 * parseFloat($e0.value);
    let q = parseFloat($q0.value);
    let k4 = 0.0001 * parseFloat($k0.value);
    let k1 = 0.04;

    let tValues = [];
    let QValues = [];

    while (tValues.length <= 320) {
      let dq = k1 * ee * q - k4 * q * q;
      q += dq;
      tValues.push(tValues.length);
      QValues.push(q);
    }

    const trace1 = {
      x: tValues,
      y: QValues,
      type: 'scatter',
      mode: 'lines',
      line: { color: 'orange' }
    };

    const data = [trace1];
    const layout = {
      title: 'Crecimiento logístico',
      xaxis: { title: 'Tiempo (t)' },
      yaxis: { title: 'Población (Q)' }
    };

    Plotly.newPlot('plot', data, layout, { responsive: true });
  }

  draw();
}
