import { drawPlot, $in } from "src/lib";

function calculateData() {
  let T = 0;
  let DT = 0.01;
  let S = 0;
  let DQ = 0;
  let N = 0;
  let R = 0;
  let DX = 0;
  let X = 6;
  let P = 0;
  let T0 = 3;
  let S0 = 30;
  let Q0 = 15;
  let N0 = 10;
  let X0 = 3;
  let P0 = 30;

  let Q = parseFloat($in("Q").value);
  let NT = parseFloat($in("NT").value);
  let F = parseFloat($in("F").value);
  let Z = parseFloat($in("Z").value);
  let XS = parseFloat($in("Xs").value);
  let K0 = parseFloat($in("K0").value);
  let K1 = parseFloat($in("K1").value);
  let K2 = parseFloat($in("K2").value);
  let K3 = parseFloat($in("K3").value);
  let K4 = parseFloat($in("K4").value);
  let K5 = parseFloat($in("K5").value);

  let tiempo = [];
  let valorS = [];
  let valorN = [];
  let valorX = [];
  let valorDQ = [];
  let valorP = [];

  do {
    S = Math.sin(T / 3.78);
    if (S < 0) S = 0;

    N = ((NT - F * Q) / Z);
    if (N < 0.000001) N = 0.000001;

    R = S / (1 + K0 * N);
    DQ = K2 * R * N - K4 * X * Q;
    DX = K1 * R * N - K3 * X * Q + K5 * ((XS - X) / XS) * DT / Z;
    Q = Q + DQ * DT;
    X = X + DX * DT / Z;
    P = K1 * R * N;
    R = K3 * X * Q;
    T = T + DT;

    tiempo.push(T * T0);
    valorS.push(S * S0);
    valorN.push(N * N0);
    valorX.push(X * X0);
    valorDQ.push(DQ * Q0);
    valorP.push(P * P0);

  } while ((T * T0) <= 320);

  return [
    { x: tiempo, y: valorS, mode: 'lines', name: 'E. solar' },
    { x: tiempo, y: valorN, mode: 'lines', name: 'Nutrientes' },
    { x: tiempo, y: valorX, mode: 'lines', name: 'Oxígeno' },
    { x: tiempo, y: valorDQ, mode: 'lines', name: 'P. líquida' },
    { x: tiempo, y: valorP, mode: 'lines', name: 'Producción' },
    { x: tiempo, y: valorP.map((value, index) => value - valorDQ[index]), mode: 'lines', name: 'Producción Neta' },
  ];
}

export function OpenAq() {
  const data = calculateData();

  const layout = {
    title: 'Simulación de un acuario abierto con intercambio de oxígeno',
    xaxis: { title: 'Tiempo (t)' },
    yaxis: { title: 'Valor' },
  };

  drawPlot({ data, layout });
}
