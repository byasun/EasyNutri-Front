import React, { useEffect, useRef } from "react";
import './Quiz.css';

export default function Checkout() {
  const brickController = useRef(null);

  useEffect(() => {
    let destroyed = false;

    // Função para buscar o preferenceId do backend
    const fetchPreferenceId = async () => {
      const response = await fetch('https://nutrifacil-back.azurewebsites.net/api/payments/create_preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ celular: '11999999999' }) // Substitua pelo número real do usuário se desejar
      });
      const data = await response.json();
      return data.preferenceId;
    };

    // Função para inicializar o Brick
    const initializeBrick = (preferenceId) => {
      if (!window.MercadoPago) return;
      const mp = new window.MercadoPago('APP_USR-486df697-f288-44e6-b23a-6ff1de540186', { locale: 'pt-BR' });
      mp.bricks().create("payment", "paymentBrick_container", {
        initialization: { preferenceId },
        callbacks: {
          onReady: () => {},
          onError: (error) => { console.error(error); },
          onSubmit: () => {},
          onSuccess: (payment) => {
            // Aqui você pode chamar sua função para enviar os dados do usuário + pagamento
            alert('Pagamento concluído com sucesso!');
          },
        }
      }).then(controller => {
        brickController.current = controller;
      });
    };

    // Carregar o script do Mercado Pago e inicializar o Brick
    const loadAndInit = async () => {
      if (!window.MercadoPago) {
        const script = document.createElement('script');
        script.src = "https://sdk.mercadopago.com/js/v2";
        script.async = true;
        script.onload = async () => {
          if (destroyed) return;
          const preferenceId = await fetchPreferenceId();
          initializeBrick(preferenceId);
        };
        document.body.appendChild(script);
      } else {
        const preferenceId = await fetchPreferenceId();
        initializeBrick(preferenceId);
      }
    };

    loadAndInit();

    // Cleanup: destruir o Brick ao desmontar ou atualizar
    return () => {
      destroyed = true;
      if (brickController.current && brickController.current.destroy) {
        brickController.current.destroy();
      }
      const container = document.getElementById("paymentBrick_container");
      if (container) container.innerHTML = "";
    };
  }, []);

  return (
    <div className="divquestion2">
      <div className="divlogocentral">
        <img className="logo" src="/imagens/logogrande.svg" alt="Logo" />
      </div>
      <h2 className="Titulo">Checkout</h2>
      <div id="paymentBrick_container"></div>
      <p className="rodape">Todos os direitos Reservados | EasyNutri™</p>
    </div>
  );
}