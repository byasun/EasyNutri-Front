import React, { useState, useEffect } from "react";
import './Quiz.css';
import { FaChevronRight } from "react-icons/fa";
import { ImGift } from "react-icons/im";
export default function QuizPage({ onFinish }) {
  const [userData, setUserData] = useState({
    dieta: "",
    peso: "",
    altura: "",
    idade: "",
    sexo: "",
    objetivo: "",
    preferencia: "",
    alergias: "",
  });

  const [step, setStep] = useState(() => {
  const savedStep = localStorage.getItem("quizStep");
  return savedStep ? parseInt(savedStep) : 0;
  });

  useEffect(() => {
    localStorage.setItem("quizStep", step);
  }, [step]);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleChange = (field, value) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div id="divhomepai">
            <div className="divlogo">
              <img className="logo" src="/imagens/logogrande.svg" alt="Logo" />
              </div>
            <div id="divheadline">
              <h2 className="Titulo">PLANO DE NUTRIÇÃO PERSONALIZADO</h2>
              <h3 className="Subtitulo">Segundo seus objetivos e metas de saúde, de acordo com seus dados e necessidades.</h3>
              <h3 className="tempo">Menos de 5 minutos</h3>
              <div className="barrinha">
                <div className="b1"></div>
                <div className="b2"></div>
                <div className="b3"></div>
                <div className="b4"></div>

              </div>
              <h2 className="Titulo">SELECIONE SEU GÊNERO</h2>
            </div>
            <div id="divbotao">
              <button className="botaosexomen" onClick={() => { handleChange("sexo", "homem"); nextStep(); }}>
                <img className="pessoabotao" src="/imagens/botaohomem.svg" />
                 <div className="linha-botao">
                  <span className="textobotao">Masculino</span>
                  <FaChevronRight className="iconseta" />
                </div>
              </button>
              <button className="botaosexwoman" onClick={() => { handleChange("sexo", "mulher"); nextStep(); }}>
                <img className="pessoabotao" src="/imagens/botaomuie.svg" />
                 <div className="linha-botao">
                  <span className="textobotao">Feminino</span>
                  <FaChevronRight className="iconseta" />
                </div>
              </button>
            </div>
            <div className="textoexp">
              <div>
                <div className="linhaexp">
                  <img className="gift" src="/imagens/Animation - 1749040562880.gif"  />
                  <h3 className="explicacao">A EasyNutri™ Acaba de Resolver o Seu Problema</h3>
                </div>
                <p className="explicacao2">Com o nosso plano de nutrição personalizado, você terá acesso a um cardápio adaptado, planejado por nutricionistas, para atender às suas necessidades e objetivos, tudo isso em menos de 5 minutos!</p>
                <p className="rodape">Todos os direitos Reservados | EasyNutri™</p>
              </div>
            </div>
          </div>
        );

      case 1:
  return (
    <div className="divquestion1">
      <div className="divlogocentral">
        <img className="logocentral" src="/imagens/logogrande.svg" alt="Logo" />
      </div>
      <div className="barrinha">
          <div className="b1c1"></div>
          <div className="b2"></div>
          <div className="b3"></div>
          <div className="b4"></div>

      </div>
      <div className="titulonrml">
        <h2>Qual tipo de dieta você prefere?</h2>
        <div className="dietabtns">
  {[
    {
      img: "/imagens/botaohomem.svg",
      nome: "Low Carb",
      descricao: "Reduz carboidratos para acelerar a queima de gordura.",
    },
    {
      img: "/imagens/botaohomem.svg",
      nome: "Cetogênica",
      descricao: "Alta em gorduras e muito baixa em carboidratos.",
    },
    {
      img: "/imagens/botaohomem.svg",
      nome: "Mediterrânea",
      descricao: "Baseada em alimentos frescos, azeite e peixes.",
    },
    {
      img: "/imagens/botaohomem.svg",
      nome: "Vegetariana",
      descricao: "Exclui carnes, focando em vegetais e grãos, inclui ovos e derivados de leite.",
    },
    {
      img: "/imagens/botaohomem.svg",
      nome: "Vegana",
      descricao: "Sem qualquer produto de origem animal.",
    },
    {
      img: "/imagens/botaohomem.svg",
      nome: "Dieta Flexível",
      descricao: "Permite variedade com foco em equilíbrio calórico.",
    },
    {
      img: "/imagens/botaohomem.svg",
      nome: "Paleolítica",
      descricao: "Inspirada na alimentação dos nossos ancestrais.",
    },
    {
      img: "/imagens/botaohomem.svg",
      nome: "DASH",
      descricao: "Focada na redução da pressão arterial.",
    },
    {
      img: "/imagens/botaohomem.svg",
      nome: "Não tenho certeza",
      descricao: "Ajude-me a escolher com base no meu perfil.",
    },
  ].map(({ nome, descricao, img }) => (
    <button
      className="btndieta"
      key={nome}
      onClick={() => {
        handleChange("dieta", nome);
        console.log("Dados atuais do usuário:", { ...userData, dieta: nome });
        nextStep();
      }}
    >
      <div className="tituloedesc">
        <img className="imagemdieta" src={img}></img>
        <div className="desctitu">
          <div className="titulo-dieta">{nome}</div>
          <div className="descricao-dieta">{descricao}</div>
        </div>
      </div>
    </button>
  ))}
</div>

      </div>
    </div>
  );

      case 2:
        return (
          <div>
            <h2>Qual seu peso? (kg)</h2>
            <input
              type="number"
              placeholder="Digite seu peso"
              value={userData.peso}
              onChange={(e) => handleChange("peso", e.target.value)}
            />
            <div style={{ marginTop: 20 }}>
              <button onClick={prevStep}>Voltar</button>
              <button
                onClick={nextStep}
                disabled={!userData.peso.trim()}
                style={{ marginLeft: 10 }}
              >
                Próximo
              </button>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div>
            <h2>Qual sua altura? (cm)</h2>
            <input
              type="number"
              placeholder="Digite sua altura"
              value={userData.altura}
              onChange={(e) => handleChange("altura", e.target.value)}
            />
            <div style={{ marginTop: 20 }}>
              <button onClick={prevStep}>Voltar</button>
              <button
                onClick={nextStep}
                disabled={!userData.altura.trim()}
                style={{ marginLeft: 10 }}
              >
                Próximo
              </button>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div>
            <h2>Qual sua idade?</h2>
            <input
              type="number"
              placeholder="Digite sua idade"
              value={userData.idade}
              onChange={(e) => handleChange("idade", e.target.value)}
            />
            <div style={{ marginTop: 20 }}>
              <button onClick={prevStep}>Voltar</button>
              <button
                onClick={nextStep}
                disabled={!userData.idade.trim()}
                style={{ marginLeft: 10 }}
              >
                Próximo
              </button>
            </div>
          </div>
        );
      
      case 5:
        return (
          <div>
            <h2>Qual seu objetivo?</h2>
            <input
              type="text"
              placeholder="Digite seu objetivo"
              value={userData.objetivo}
              onChange={(e) => handleChange("objetivo", e.target.value)}
            />
            <div style={{ marginTop: 20 }}>
              <button onClick={prevStep}>Voltar</button>
              <button
                onClick={nextStep}
                disabled={!userData.objetivo.trim()}
                style={{ marginLeft: 10 }}
              >
                Próximo
              </button>
            </div>
          </div>
        );

      case 6:
        return (
          <div>
            <h2>Qual sua preferência alimentar?</h2>
            <input
              type="text"
              placeholder="Digite sua preferência alimentar"
              value={userData.preferencia}
              onChange={(e) => handleChange("preferencia", e.target.value)}
            />
            <div style={{ marginTop: 20 }}>
              <button onClick={prevStep}>Voltar</button>
              <button
                onClick={nextStep}
                disabled={!userData.preferencia.trim()}
                style={{ marginLeft: 10 }}
              >
                Próximo
              </button>
            </div>
          </div>
        );

      case 7:
        return (
          <div>
            <h2>Tem alguma alergia?</h2>
            <input
              type="text"
              placeholder="Digite suas alergias (ou deixe vazio)"
              value={userData.alergias}
              onChange={(e) => handleChange("alergias", e.target.value)}
            />
            <div style={{ marginTop: 20 }}>
              <button onClick={prevStep}>Voltar</button>
              <button
                onClick={() => onFinish(userData)}
                style={{ marginLeft: 10 }}
              >
                Finalizar
              </button>
            </div>
          </div>
        );

      default:
        return <div>Erro: etapa desconhecida.</div>;
    }
  };

  return <div className="quiz-container">{renderStepContent()}</div>;
}
