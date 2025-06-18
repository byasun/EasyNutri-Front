/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react"; // ✅ Adiciona useState aqui
import './Quiz.css';

export default function Checkout() {
  const brickController = useRef(null);

  // ✅ useState movido para dentro do componente
  const [userData, setUserData] = useState({
    dieta: "",
    peso: "",
    altura: "",
    idade: "",
    sexo: "",
    objetivo: "",
    preferencia: "",
    alergias: "",
    celular: "", // Adicione se for necessário para o pagamento
  });

  useEffect(() => {
    let destroyed = false;

    const fetchPreferenceId = async () => {
      const response = await fetch('https://nutrifacil-back.azurewebsites.net/api/payments/create_preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ celular: userData.celular })
      });
      const data = await response.json();
      console.log("Dados da preferência:", data);
      return data.preferenceId;
    };

    const initializeBrick = (preferenceId) => {
      if (!window.MercadoPago) return;
      const mp = new window.MercadoPago('APP_USR-486df697-f288-44e6-b23a-6ff1de540186', { locale: 'pt-BR' });
      mp.bricks().create("payment", "paymentBrick_container", {
        initialization: { preferenceId },
        callbacks: {
          onReady: () => { },
          onError: (error) => { console.error(error); },
          onSubmit: () => { },
          onSuccess: (payment) => {
            alert('Pagamento concluído com sucesso!');
            // Se quiser enviar os dados automaticamente após o pagamento:
            // handleSendData();
          },
        }
      }).then(controller => {
        brickController.current = controller;
      });
    };

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

    return () => {
      destroyed = true;
      if (brickController.current && brickController.current.destroy) {
        brickController.current.destroy();
      }
      const container = document.getElementById("paymentBrick_container");
      if (container) container.innerHTML = "";
    };
  }, [userData.celular]); // ✅ Dependência adicionada para garantir que use celular atualizado

  // ✅ Função que envia o userData inteiro como JSON
  const handleSendData = async () => {
    // Formata o userData antes de enviar
    const formattedUserData = {
      ...userData,
      celular: "+55" + userData.celular, // Formato internacional
      alergias: userData.alergias.split(","), // Converte string em array
      preferencia: userData.preferencia.split(",") // Converte string em array
    };

    try {
      const response = await fetch('https://nutrifacil-back.azurewebsites.net/api/diet-plans/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userData: formattedUserData }) // Envia o objeto userData dentro de um objeto
      });

      if (!response.ok) throw new Error('Erro ao enviar dados');
      alert('Dados enviados com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Erro ao enviar os dados');
    }
  };

  return (
    <div className="divquestion2">
      <div className="divlogocentral">
        <img className="logo" src="/imagens/logogrande.svg" alt="Logo" />
      </div>
      <h2 className="Titulo">Checkout</h2>
      <div id="paymentBrick_container"></div>
      <div>
        <button
          className="btnirevir"
          style={{ marginLeft: 10 }}
          onClick={handleSendData}
        >
          Enviar
        </button>
      </div>
      <p className="rodape">Todos os direitos Reservados | EasyNutri™</p>
    </div>
  );
}
