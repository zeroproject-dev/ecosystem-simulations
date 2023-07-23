import Plotly from "plotly.js-dist";

export function DrainingTank() {
  const $k = document.getElementById("K") as HTMLInputElement;
  const $q0 = document.getElementById("Q0") as HTMLInputElement;

  const draw = (K: number, Q: number) => {
    let Q0 = Q;

    function calculateData() {
      let data = [];
      let t = [];
      let Q = [];

      let i = 0;
      while (Q0 > 1) {
        let DQ = -K * Q0;
        Q0 = Q0 + DQ;
        t.push(i++);
        Q.push(Q0);
      }

      data.push({
        x: t,
        y: Q,
        type: "scatter",
        mode: "lines",
        name: "Drain Plot",
        line: { color: "blue" },
      });

      return data;
    }

    let data = calculateData();

    let layout = {
      title: "Tanque de drenaje",
      xaxis: {
        title: "Tiempo (t)",
        zeroline: false,
      },
      yaxis: {
        title: "Nivel del liquido (Q)",
        zeroline: false,
      },
    };

    Plotly.newPlot("plot", data, layout, { responsive: true });
    data = null;
  };

  draw(parseFloat($k.value), parseFloat($q0.value));
}
