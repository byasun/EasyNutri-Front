import React from "react";

export default function Checkout({ prevStep, nextStep }) {
  return (
    <div className="divcase7">
      <div className="divquestion2">
        <div className="divlogocentral">
          <img className="logo" src="/imagens/logogrande.svg" alt="Logo" />
        </div>
        <div className="barrinha">
          <div className="b1c1"></div>
          <div className="b2tp"></div>
          <div className="b3tp"></div>
          <div className="b4tp"></div>
        </div>
        <h2 className="Titulo">Checkout</h2>
        <p className="Subtitulo1">
          Complete seu pagamento para acessar seu plano personalizado!
        </p>
        {/* Aqui você pode adicionar campos de pagamento futuramente */}
        <div className="botoesirevir">
          <button className="btnirevir" onClick={prevStep}>Voltar</button>
          <button
            className="btnirevir"
            onClick={nextStep}
            style={{ marginLeft: 10 }}
          >
            Finalizar compra
          </button>
        </div>
        <p className="rodape">Todos os direitos Reservados | EasyNutri™</p>
      </div>
    </div>
  );
}