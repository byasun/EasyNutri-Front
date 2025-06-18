export async function enviarUserDataParaPagamento(userData) {
  try {
    const response = await fetch('https://nutrifacil-back.azurewebsites.net/api/payments/create_preference', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      throw new Error("Erro ao enviar dados para o pagamento");
    }

    const resultado = await response.json();
    return resultado;
  } catch (error) {
    console.error("Erro no envio para pagamento:", error);
  }
}