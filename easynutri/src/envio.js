// Função para enviar os dados do usuário para a API de pagamento

// Substitua pela URL real da sua API de backend
const API_URL = "nutrifacil-back.azurewebsites.net";

export async function enviarUserDataParaPagamento(userData) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      throw new Error("Erro ao enviar dados para o pagamento");
    }

    // Supondo que a resposta da API traga informações do pagamento
    const resultado = await response.json();
    return resultado;
  } catch (error) {
    console.error("Erro no envio para pagamento:", error);
      }
}