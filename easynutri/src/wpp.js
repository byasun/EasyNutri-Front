import React, { useRef, useEffect, useState } from "react";
import './Quiz.css';
import { enviarUserDataParaPagamento } from "./envio";

function formatWhatsapp(numbers) {
    if (numbers.length === 0) return "";
    if (numbers.length < 3) {
        return `(${numbers}`;
    } else if (numbers.length < 7) {
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else {
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    }
}

function isValidWhatsapp(numbers) {
    numbers = numbers.replace(/\D/g, "");
    return numbers.length === 11 && numbers[2] === "9";
}

export default function Wpp({ nextStep, prevStep, userData, handleChange }) {
    const inputRef = useRef(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("userData atualizado em Wpp:", userData);
    }, [userData]);

    const handleInputChange = (e) => {
        let numbers = e.target.value.replace(/\D/g, "").slice(0, 11);
        handleChange("celular", formatWhatsapp(numbers));
    };

    const handleKeyDown = (e) => {
        if (
            e.key === "Backspace" &&
            inputRef.current
        ) {
            const value = inputRef.current.value;
            const selectionStart = inputRef.current.selectionStart;
            if (
                value[selectionStart - 1] === "-" &&
                selectionStart === value.indexOf("-") + 1
            ) {
                e.preventDefault();
                inputRef.current.setSelectionRange(selectionStart - 1, selectionStart - 1);
            }
        }
    };

    // Função para enviar os dados e avançar
    const handleContinuar = async () => {
        setLoading(true);
        try {
            const resposta = await enviarUserDataParaPagamento(userData);
            console.log("Resposta da API:", resposta);
            nextStep();
        } catch (error) {
            alert("Erro ao enviar dados para pagamento.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="divquestion2">
            <div className="divlogocentral">
                <img className="logo" src="/imagens/logogrande.svg" alt="Logo" />
            </div>
            <h2 className="Titulo">Primeiro WhatsApp</h2>
            <p className="Subtitulo2">
                Digite seu número de WhatsApp para receber o plano nutricional personalizado.
            </p>
            <input
                ref={inputRef}
                className="placeholder"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={16}
                placeholder="(11) 99999-9999"
                value={userData.celular || ""}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                autoComplete="off"
            />
            <div className="botoesirevir">
                {prevStep && (
                    <button className="btnirevir" onClick={prevStep}>
                        Voltar
                    </button>
                )}
                <button
                    className="btnirevir"
                    onClick={handleContinuar}
                    disabled={!isValidWhatsapp(userData.celular || "") || loading}
                    style={{ marginLeft: 10 }}
                >
                    {loading ? "Enviando..." : "Continuar"}
                </button>
            </div>
            <p className="rodape">Todos os direitos Reservados | EasyNutri™</p>
        </div>
    );
}