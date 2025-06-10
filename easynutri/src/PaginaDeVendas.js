import React from "react";

// Função para calcular o IMC
function calcularIMC(peso, altura) {
  // Trata valores nulos, vazios, "Não informado", "null", "undefined"
  if (
    !peso ||
    !altura ||
    peso === "Não informado" ||
    altura === "Não informado" ||
    peso === "null" ||
    altura === "null" ||
    peso === "undefined" ||
    altura === "undefined"
  ) {
    return "Dados insuficientes";
  }
  const pesoNum = parseFloat(String(peso).replace(",", ".").replace("kg", "").trim());
  let alturaNum = parseFloat(String(altura).replace(",", ".").replace("m", "").trim());
  if (isNaN(pesoNum) || isNaN(alturaNum) || pesoNum <= 0 || alturaNum <= 0) return "Dados insuficientes";
  // Se altura for maior que 3, provavelmente está em centímetros, converte para metros
  if (alturaNum > 3) alturaNum = alturaNum / 100;
  const imc = pesoNum / (alturaNum * alturaNum);
  return imc ? imc.toFixed(2) : "Dados insuficientes";
}

// Função para escolher o gif de acordo com o objetivo
function gifPorObjetivo(objetivo) {
  switch ((objetivo || "").toLowerCase()) {
    case "emagrecimento":
      return "/imagens/Animation - 1749211936355.gif";
    case "hipertrofia":
      return "/imagens/Animation - 1749212342747.gif";
  }
}

function txtPorObjetivo(objetivo) {
  switch ((objetivo || "").toLowerCase()) {
    case "emagrecimento":
      return "Emagrecimento";
    case "hipertrofia":
      return "Hipertrofia";
  }
}
export default function PaginaFinalVenda({ prevStep, nextStep, userData }) {
  const dados =
    userData ||
    JSON.parse(localStorage.getItem("userData") || "{}");

  return (
    <div className="divfinalvenda">
      <div className="divlogocentral">
        <img className="logocentral" src="/imagens/logogrande.svg" alt="Logo" />
      </div>
      <h2 className="Titulo">Seu plano está pronto!</h2>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <img
          src={gifPorObjetivo(dados.objetivo)}
          style={{ width: 180, height: 180, marginBottom: 16 }}
        />
        <div>
            <h1>
                Para {txtPorObjetivo(dados.objetivo)}
            </h1>
        </div>
        <div className="grid2">
            <div className="imc">
                <p className="imcc"><strong>IMC</strong></p>
                <p className="vimc">{calcularIMC(dados.peso, dados.altura)}</p>
            </div>
            <div className="dadosusuario">
                <p className="d1"><strong>Peso:</strong> {dados.peso || "Não informado"} kg</p>
                <p className="d1"><strong>Altura:</strong> {dados.altura || "Não informado"} m</p>
                <p className="d1"><strong>Idade:</strong> {dados.idade || "Não informado"} anos</p>
                <p className="d1"><strong>Dieta:</strong> {dados.dieta || "Não informado"}</p>
            </div>
        </div>
      </div>
      <div className="botoesirevir">
        <button className="btnirevir" onClick={prevStep}>Voltar</button>
        <button
          className="btnirevir"
          onClick={nextStep}
          style={{ marginLeft: 10 }}
        >
          Ir para o checkout
        </button>
      </div>
      <p className="rodape">Todos os direitos Reservados | EasyNutri™</p>
    </div>
  );
}