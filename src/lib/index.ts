import Plotly from "plotly.js-dist";

export const $in = (id: string) => document.getElementById(id) as HTMLInputElement

export const drawPlot = ({ data, layout }) => {
  layout = {
    ...layout, legend: {
      x: 0,
      y: 1,
    }
  };

  Plotly.newPlot('plot', data, layout, { responsive: true });
}
