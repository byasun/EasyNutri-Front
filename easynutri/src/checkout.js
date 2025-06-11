import React, { useEffect } from "react";

export default function Checkout({ prevStep }) {
  useEffect(() => {
    if (!window.MercadoPago) {
      console.error("MercadoPago SDK não carregado!");
      return;
    }
    const mp = new window.MercadoPago("SUA_PUBLIC_KEY_AQUI", {
      locale: "pt-BR"
    });

    mp.bricks().create("cardPayment", "paymentBrick_container", {
      initialization: {
        amount: 100,
      },
      callbacks: {
        onReady: () => {},
        onSubmit: (cardFormData) => {},
        onError: (error) => {
          alert("Erro no pagamento: " + error.message);
        }
      }
    });
  }, []);

  return (
    <div className="divcase9">
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
        <div id="paymentBrick_container" style={{ margin: "30px 0" }}></div>
        <div className="botoesirevir">
          <button className="btnirevir" onClick={prevStep}>Voltar</button>
        </div>
        <p className="rodape">Todos os direitos Reservados | EasyNutri™</p>
      </div>
    </div>
  );
}