import Plotly from "plotly.js-dist";

export const $in = (id: string) => document.getElementById(id) as HTMLInputElement

export const drawPlot = ({ data, layout }) =>
  Plotly.newPlot('plot', data, layout, { responsive: true });
