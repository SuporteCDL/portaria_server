export function calcularPermanencia(data, entrada, saida) {
    const entradaDate = new Date(`${data}T${entrada}`);
    const saidaDate = new Date(`${data}T${saida}`);
    const diffMs = saidaDate.getTime() - entradaDate.getTime();
    if (diffMs < 0) {
        throw new Error('Hora de saída não pode ser menor que entrada');
    }
    return Math.floor(diffMs / 1000);
}
//# sourceMappingURL=functions.js.map