import React, { useState, useEffect } from "react";
import './Quiz.css';
import { FaChevronRight } from "react-icons/fa";
import PaginaDeVendas from "./PaginaDeVendas";
import Wpp from './wpp';
import Checkout from "./checkout";
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
    celular: "",
  });

  const [step, setStep] = useState(() => {
    const savedStep = localStorage.getItem("quizStep");
    return savedStep ? parseInt(savedStep) : 0;
  });
  const [selecionadas, setSelecionadas] = useState([]);


  useEffect(() => {
    localStorage.setItem("quizStep", step);
  }, [step]);

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleChange = (field, value) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const [alergiasSelecionadas, setAlergiasSelecionadas] = useState(
    userData.alergiasComuns ? userData.alergiasComuns.split(",") : []
  );

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
                <img className="pessoabotao" src="/imagens/botaohomem.svg" alt="Ícone Homem" />
                <div className="linha-botao">
                  <span className="textobotao">Masculino</span>
                  <FaChevronRight className="iconseta" />
                </div>
              </button>
              <button className="botaosexwoman" onClick={() => { handleChange("sexo", "mulher"); nextStep(); }}>
                <img className="pessoabotao" src="/imagens/botaomuie.svg" alt="Ícone Mulher" />
                <div className="linha-botao">
                  <span className="textobotao">Feminino</span>
                  <FaChevronRight className="iconseta" />
                </div>
              </button>
            </div>
            <div className="textoexp">
              <div>
                <div className="linhaexp">
                  <img className="gift" src="/imagens/Animation - 1749040562880.gif" alt="Animação de presente" />
                  <h3 className="explicacao">A NutriFácil™ Acaba de Resolver o Seu Problema</h3>
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
                    img: "/imagens/Animation - 1749142869912.gif",
                    nome: "Low Carb",
                    descricao: "Reduz carboidratos para acelerar a queima de gordura.",
                  },
                  {
                    img: "/imagens/Animation - 1749143230081.gif",
                    nome: "Cetogênica",
                    descricao: "Alta em gorduras e muito baixa em carboidratos.",
                  },
                  {
                    img: "/imagens/Animation - 1749142051509.gif",
                    nome: "Mediterrânea",
                    descricao: "Baseada em alimentos frescos, azeite e peixes.",
                  },
                  {
                    img: "/imagens/Animation - 1749132322980.gif",
                    nome: "Vegetariana",
                    descricao: "Exclui carnes, focando em vegetais e grãos, inclui ovos e derivados de leite.",
                  },
                  {
                    img: "/imagens/embreve.png",
                    nome: "Vegana",
                    descricao: "EM BREVE!! Sem qualquer produto de origem animal.",
                  },
                  {
                    img: "/imagens/embreve.png",
                    nome: "Dieta Flexível",
                    descricao: "EM BREVE!! Permite variedade com foco em equilíbrio calórico.",
                  },
                  {
                    img: "/imagens/embreve.png",
                    nome: "Paleolítica",
                    descricao: "EM BREVE!! Inspirada na alimentação dos nossos ancestrais.",
                  },
                  {
                    img: "/imagens/embreve.png",
                    nome: "DASH",
                    descricao: "EM BREVE!! Dieta para controle de pressão arterial.",
                  },
                  {
                    img: "/imagens/Animation - 1749141808625.gif",
                    nome: "Não tenho certeza",
                    descricao: "Ajude-me a escolher com base no meu perfil.",
                  },
                ].map(({ nome, descricao, img }) => (
                  <button
                    className="btndieta"
                    key={nome}
                    onClick={() => {
                      if (nome !== "Vegana" && nome !== "Dieta Flexível" && nome !== "Paleolítica" && nome !== "DASH") {
                        handleChange("dieta", nome);
                        console.log("Dados atuais do usuário:", { ...userData, dieta: nome });
                        nextStep();
                      }
                    }
                    }
                  >
                    <div className="tituloedesc">
                      <img className="imagemdieta" src={img} alt={`Imagem da dieta ${nome}`}></img>
                      <div className="desctitu">
                        <div className="titulo-dieta">{nome}</div>
                        <div className="descricao-dieta">{descricao}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

            </div>
            <p className="rodape">Todos os direitos Reservados | EasyNutri™</p>
          </div>
        );

      case 2:
        return (
          <div className="divquestion2">
            <div className="divlogocentral">
              <img className="logo" src="/imagens/logogrande.svg" alt="Logo" />
            </div>
            <div className="barrinha">
              <div className="b1c1"></div>
              <div className="b2mp"></div>
              <div className="b3"></div>
              <div className="b4"></div>
            </div>
            <h2 className="Titulo">Qual seu peso? (kg)</h2>
            <input className="placeholder"
              type="number"
              placeholder="Digite seu peso"
              value={userData.peso}
              onChange={(e) => handleChange("peso", Number(e.target.value))}
            />
            <div className="botoesirevir">
              <button className="btnirevir" onClick={prevStep}>Voltar</button>
              <button className="btnirevir"
                onClick={nextStep}
                disabled={!userData.peso || userData.peso <= 0}

              >
                Próximo
              </button>
            </div>
            <p className="rodape">Todos os direitos Reservados | EasyNutri™</p>
          </div>
        );

      case 3:
        return (
          <div className="divquestion2">
            <div className="divlogocentral">
              <img className="logo" src="/imagens/logogrande.svg" alt="Logo" />
            </div>
            <div className="barrinha">
              <div className="b1c1"></div>
              <div className="b2tp"></div>
              <div className="b3"></div>
              <div className="b4"></div>
            </div>
            <h2 className="Titulo">Qual a sua altura? (Cm)</h2>
            <input className="placeholder"
              type="number"
              placeholder="Digite sua altura"
              value={userData.altura}
              onChange={(e) => {
                handleChange("altura", Number(e.target.value))
                console.log("Dados atuais do usuário:", { ...userData, altura: Number(e.target.value) });
              }}
            />
            <div className="botoesirevir">
              <button className="btnirevir" onClick={prevStep}>Voltar</button>
              <button className="btnirevir"
                onClick={nextStep}
                disabled={!userData.altura || userData.altura <= 0}
              >
                Próximo
              </button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="divquestion2">
            <div className="divlogocentral">
              <img className="logo" src="/imagens/logogrande.svg" alt="Logo" />
            </div>
            <div className="barrinha">
              <div className="b1c1"></div>
              <div className="b2tp"></div>
              <div className="b3mp"></div>
              <div className="b4"></div>
            </div>
            <h2 className="Titulo">Qual a sua idade?</h2>
            <h3 className="Subtitulo1">Não vale mentir aqui hein</h3>
            <input className="placeholder"
              type="number"
              placeholder="Digite a sua idade"
              value={userData.idade}
              onChange={(e) => {
                handleChange("idade", Number(e.target.value))
                console.log("Dados atuais do usuário:", { ...userData, idade: Number(e.target.value) });
              }}
            />
            <div className="botoesirevir">
              <button className="btnirevir" onClick={prevStep}>Voltar</button>
              <button className="btnirevir"
                onClick={nextStep}
                disabled={!userData.idade || userData.idade <= 0}

              >
                Próximo
              </button>
            </div>
            <p className="rodape">Todos os direitos Reservados | EasyNutri™</p>
          </div>
        );
      case 5:
        return (
          <div className="divquestion1">
            <div className="divlogocentral">
              <img className="logocentral" src="/imagens/logogrande.svg" alt="Logo" />
            </div>
            <div className="barrinha">
              <div className="b1c1"></div>
              <div className="b2tp"></div>
              <div className="b3tp"></div>
              <div className="b4"></div>

            </div>
            <div className="titulonrml">
              <h2>Qual o seu objetivo?</h2>
              <div className="dietabtns">
                {[
                  {
                    img: "/imagens/Animation - 1749211936355.gif",
                    nome: "Emagrecimento",
                    descricao: "Reduz carboidratos para acelerar a queima de gordura.",
                  },
                  {
                    img: "/imagens/Animation - 1749212342747.gif",
                    nome: "Hipertrofia",
                    descricao: "Alta em gorduras e muito baixa em carboidratos.",
                  },
                ].map(({ nome, descricao, img }) => (
                  <button
                    className="btndieta"
                    key={nome}
                    onClick={() => {
                      handleChange("objetivo", nome);
                      console.log("Dados atuais do usuário:", { ...userData, objetivo: nome });
                      nextStep();
                    }
                    }
                  >
                    <div className="tituloedesc">
                      <img className="imagemdieta" src={img} alt={`Imagem do objetivo ${nome}`}></img>
                      <div className="desctitu">
                        <div className="titulo-dieta">{nome}</div>
                        <div className="descricao-dieta">{descricao}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

            </div>
            <p className="rodape">Todos os direitos Reservados | EasyNutri™</p>
          </div>
        );
      case 6: {
        const proteinas = ["Carne vermelha", "Porco", "Frango", "Peixe", "Frutos do mar", "Ovos",];
        const carboidratos = ["Macarrão", "Feijão", "Pão", "Batata", "Batata-Doce", "Mandioca", "Milho-Verde", "Tapioca", "Inhame", "Abóbora", "Aveia", "Fubá"];
        const frutas = ["Banana", "Maçã", "Laranja", "Mamão", "Abacaxi", "Manga", "Uva", "Melancia", "Melão", "Goiaba", "Morango", "Maracujá"];
        const legumes = ["Cenoura", "Beterraba", "Mandioquinha", "Chuchu", "Abóbora", "Cebola", "Jiló", "Quiabo", "Nabo", "Vagem", "Ervilha", "Maxixe"];
        const verduras = ["Alface", "Couve", "Repolho", "Rúcula", "Espinafre", "Agrião", "Almeirão", "Brócolis", "Escarola", "Taioba", "Chicória", "Couve-flor"];
        const outros = ["Leite", "Queijo", "Iogurte", "Manteiga", "Requeijão", "Café", "Chá", "Sucos", "Achocolatado", "Leite condensado", "Creme de leite", "Chocolate"];


        const togglePreferencia = (opcao) => {
          setSelecionadas((prev) =>
            prev.includes(opcao)
              ? prev.filter((item) => item !== opcao)
              : [...prev, opcao]
          );
        };

        const confirmarPreferencias = () => {
          const preferencias = selecionadas.length > 0 ? selecionadas.join(",") : "sem restrições";
          handleChange("preferencia", preferencias);
          console.log("Dados atuais do usuário:", { ...userData, preferencia: preferencias });
          nextStep();
        };

        return (
          <div className="divquestion1">
            <div className="divlogocentral">
              <img className="logocentral" src="/imagens/logogrande.svg" alt="Logo" />
            </div>
            <div className="barrinha">
              <div className="b1c1"></div>
              <div className="b2tp"></div>
              <div className="b3tp"></div>
              <div className="b4mp"></div>
            </div>
            <div className="titulonrml">
              <h2>O que você🚫não gostaria de comer?</h2>
            </div>

            <div>
              <h3 className="titulodivisoria">Proteínas</h3>
              <div className="grid2">
                {proteinas.map((opcao) => (
                  <button
                    key={opcao}
                    type="button"
                    className={selecionadas.includes(opcao) ? "preferencia-opcao selecionada" : "preferencia-opcao"}
                    onClick={() => togglePreferencia(opcao)}
                    style={{
                      width: "100%",
                      maxWidth: "250px",
                      minWidth: "180px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px",
                      borderRadius: "5px",
                      border: selecionadas.includes(opcao) ? "2px solid #00f2b0" : "1px solid #ccc",
                      background: "#fff",
                      cursor: "pointer"
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: "15px",
                        height: "15px",
                        borderRadius: "50%",
                        border: "2px solid #000",
                        position: "relative",
                        background: "#fff",
                        marginRight: "5px",
                        flexShrink: 0
                      }}
                    >
                      {selecionadas.includes(opcao) && (
                        <span
                          style={{
                            display: "block",
                            width: "9px",
                            height: "9px",
                            background: "#00f2b0",
                            borderRadius: "50%",
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)"
                          }}
                        ></span>
                      )}
                    </span>
                    {opcao}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="titulodivisoria">Carboidratos</h3>
              <div className="grid2">
                {carboidratos.map((opcao) => (
                  <button
                    key={opcao}
                    type="button"
                    className={selecionadas.includes(opcao) ? "preferencia-opcao selecionada" : "preferencia-opcao"}
                    onClick={() => togglePreferencia(opcao)}
                    style={{
                      width: "100%",
                      maxWidth: "250px",
                      minWidth: "180px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px",
                      borderRadius: "5px",
                      border: selecionadas.includes(opcao) ? "2px solid #00f2b0" : "1px solid #ccc",
                      background: "#fff",
                      cursor: "pointer"
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: "15px",
                        height: "15px",
                        borderRadius: "50%",
                        border: "2px solid #000",
                        position: "relative",
                        background: "#fff",
                        marginRight: "5px",
                        flexShrink: 0
                      }}
                    >
                      {selecionadas.includes(opcao) && (
                        <span
                          style={{
                            display: "block",
                            width: "9px",
                            height: "9px",
                            background: "#00f2b0",
                            borderRadius: "50%",
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)"
                          }}
                        ></span>
                      )}
                    </span>
                    {opcao}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="titulodivisoria">Frutas</h3>
              <div className="grid2">
                {frutas.map((opcao) => (
                  <button
                    key={opcao}
                    type="button"
                    className={selecionadas.includes(opcao) ? "preferencia-opcao selecionada" : "preferencia-opcao"}
                    onClick={() => togglePreferencia(opcao)}
                    style={{
                      width: "100%",
                      maxWidth: "250px",
                      minWidth: "180px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px",
                      borderRadius: "5px",
                      border: selecionadas.includes(opcao) ? "2px solid #00f2b0" : "1px solid #ccc",
                      background: "#fff",
                      cursor: "pointer"
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: "15px",
                        height: "15px",
                        borderRadius: "50%",
                        border: "2px solid #000",
                        position: "relative",
                        background: "#fff",
                        marginRight: "5px",
                        flexShrink: 0
                      }}
                    >
                      {selecionadas.includes(opcao) && (
                        <span
                          style={{
                            display: "block",
                            width: "9px",
                            height: "9px",
                            background: "#00f2b0",
                            borderRadius: "50%",
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)"
                          }}
                        ></span>
                      )}
                    </span>
                    {opcao}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="titulodivisoria">Legumes</h3>
              <div className="grid2">
                {legumes.map((opcao) => (
                  <button
                    key={opcao}
                    type="button"
                    className={selecionadas.includes(opcao) ? "preferencia-opcao selecionada" : "preferencia-opcao"}
                    onClick={() => togglePreferencia(opcao)}
                    style={{
                      width: "100%",
                      maxWidth: "250px",
                      minWidth: "180px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px",
                      borderRadius: "5px",
                      border: selecionadas.includes(opcao) ? "2px solid #00f2b0" : "1px solid #ccc",
                      background: "#fff",
                      cursor: "pointer"
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: "15px",
                        height: "15px",
                        borderRadius: "50%",
                        border: "2px solid #000",
                        position: "relative",
                        background: "#fff",
                        marginRight: "5px",
                        flexShrink: 0
                      }}
                    >
                      {selecionadas.includes(opcao) && (
                        <span
                          style={{
                            display: "block",
                            width: "9px",
                            height: "9px",
                            background: "#00f2b0",
                            borderRadius: "50%",
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)"
                          }}
                        ></span>
                      )}
                    </span>
                    {opcao}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="titulodivisoria">Verduras</h3>
              <div className="grid2">
                {verduras.map((opcao) => (
                  <button
                    key={opcao}
                    type="button"
                    className={selecionadas.includes(opcao) ? "preferencia-opcao selecionada" : "preferencia-opcao"}
                    onClick={() => togglePreferencia(opcao)}
                    style={{
                      width: "100%",
                      maxWidth: "250px",
                      minWidth: "180px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px",
                      borderRadius: "5px",
                      border: selecionadas.includes(opcao) ? "2px solid #00f2b0" : "1px solid #ccc",
                      background: "#fff",
                      cursor: "pointer"
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: "15px",
                        height: "15px",
                        borderRadius: "50%",
                        border: "2px solid #000",
                        position: "relative",
                        background: "#fff",
                        marginRight: "5px",
                        flexShrink: 0
                      }}
                    >
                      {selecionadas.includes(opcao) && (
                        <span
                          style={{
                            display: "block",
                            width: "9px",
                            height: "9px",
                            background: "#00f2b0",
                            borderRadius: "50%",
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)"
                          }}
                        ></span>
                      )}
                    </span>
                    {opcao}
                  </button>
                ))}
              </div>
            </div>

            <div className="opcoes">
              <h3 className="titulodivisoria">Outros</h3>
              <div className="grid2">
                {outros.map((opcao) => (
                  <button
                    key={opcao}
                    type="button"
                    className={selecionadas.includes(opcao) ? "preferencia-opcao selecionada" : "preferencia-opcao"}
                    onClick={() => togglePreferencia(opcao)}
                    style={{
                      width: "100%",
                      maxWidth: "250px",
                      minWidth: "180px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px",
                      borderRadius: "5px",
                      border: selecionadas.includes(opcao) ? "2px solid #00f2b0" : "1px solid #ccc",
                      background: "#fff",
                      cursor: "pointer"
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: "15px",
                        height: "15px",
                        borderRadius: "50%",
                        border: "2px solid #000",
                        position: "relative",
                        background: "#fff",
                        marginRight: "5px",
                        flexShrink: 0
                      }}
                    >
                      {selecionadas.includes(opcao) && (
                        <span
                          style={{
                            display: "block",
                            width: "9px",
                            height: "9px",
                            background: "#00f2b0",
                            borderRadius: "50%",
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)"
                          }}
                        ></span>
                      )}
                    </span>
                    {opcao}
                  </button>
                ))}
              </div>
            </div>

            <div className="botoesirevir">
              <button className="btnirevir" onClick={prevStep}>Voltar</button>
              <button className="btnirevir"
                onClick={confirmarPreferencias}
                style={{ marginLeft: 10 }}
              >
                Confirmar
              </button>
            </div>
            <p className="rodape">Todos os direitos Reservados | EasyNutri™</p>
          </div>
        );
      }
      case 7: {
        const alergias = [
          "Leite", "Ovo", "Amendoim",
          "Soja", "Glúten", "Frutos do mar"
        ];

        const toggleAlergia = (opcao) => {
          setAlergiasSelecionadas((prev) =>
            prev.includes(opcao)
              ? prev.filter((item) => item !== opcao)
              : [...prev, opcao]
          );
        };

        const finalizarAlergias = () => {
          // Se nenhum campo for preenchido, salva "null"
          const alergiasSelecionadasStr = alergiasSelecionadas.length > 0 ? alergiasSelecionadas.join(",") : "";
          const alergiasTexto = userData.alergias && userData.alergias.trim() !== "" ? userData.alergias : "";
          let valorFinal = "";

          if (alergiasSelecionadasStr && alergiasTexto) {
            valorFinal = `${alergiasSelecionadasStr},${alergiasTexto}`;
          } else if (alergiasSelecionadasStr) {
            valorFinal = alergiasSelecionadasStr;
          } else if (alergiasTexto) {
            valorFinal = alergiasTexto;
          } else {
            valorFinal = "sem restrições";
          }

          handleChange("alergias", valorFinal)
          console.log("Dados atuais do usuário:", { ...userData, alergias: valorFinal });
          nextStep(); // Vai para o case 8
        };

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
              <h2 className="Titulo">Você possui alguma alergia alimentar?</h2>
              <h3 className="titulodivisoria">Alergias comuns</h3>
              <div className="grid2">
                {alergias.map((opcao) => (
                  <button
                    key={opcao}
                    type="button"
                    className={
                      alergiasSelecionadas.includes(opcao)
                        ? "preferencia-opcao selecionada"
                        : "preferencia-opcao"
                    }
                    onClick={() => toggleAlergia(opcao)}
                    style={{
                      width: "100%",
                      maxWidth: "180px",
                      minWidth: "120px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px",
                      borderRadius: "5px",
                      border: alergiasSelecionadas.includes(opcao)
                        ? "2px solid #00f2b0"
                        : "1px solid #ccc",
                      background: "#fff",
                      cursor: "pointer"
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: "15px",
                        height: "15px",
                        borderRadius: "50%",
                        border: "2px solid #000",
                        position: "relative",
                        background: "#fff",
                        marginRight: "5px",
                        flexShrink: 0
                      }}
                    >
                      {alergiasSelecionadas.includes(opcao) && (
                        <span
                          style={{
                            display: "block",
                            width: "9px",
                            height: "9px",
                            background: "#00f2b0",
                            borderRadius: "50%",
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)"
                          }}
                        ></span>
                      )}
                    </span>
                    {opcao}
                  </button>
                ))}
              </div>

              <h3 className="titulodivisoria" style={{ marginTop: 24 }}>Outras alergias</h3>
              <input
                className="placeholder2"
                type="text"
                placeholder="Digite suas alergias (ou deixe vazio)"
                value={userData.alergias}
                onChange={(e) =>
                  handleChange("alergias", e.target.value)}
              />

              <div className="botoesirevir">
                <button className="btnirevir" onClick={prevStep}>Voltar</button>
                <button
                  className="btnirevir"
                  onClick={finalizarAlergias}
                  style={{ marginLeft: 10 }}
                >
                  Finalizar
                </button>
              </div>
              <p className="rodape">Todos os direitos Reservados | EasyNutri™</p>
            </div>
          </div>
        );
      }

      case 8:
        return (
          <PaginaDeVendas
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );

      case 9:
        return (
          <Wpp
            prevStep={prevStep}
            nextStep={nextStep}
            userData={userData}
            handleChange={handleChange}
          />
        );

      case 10:
        return (
          <Checkout
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );

      default:
        return <div>Erro: etapa desconhecida.</div>;
    }
  };

  return <div className="quiz-container">{renderStepContent()}</div>;
}
