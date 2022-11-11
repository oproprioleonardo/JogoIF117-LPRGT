class Prova {
    constructor() {
        this.folha = new Image();
        this.folha.src = "./assets/imgs/perri/Prova.png"
        this.perguntaAtual = 0;
        this.exibindo = false;
        this.finalizada = false;
        this.perguntas = [
            new Pergunta("1 - O que acontece se\nvocê transferir R$3,14", ["Não Sei", "Uma transferência né", "Você vai ter feito um πx"], "Você vai ter feito um πx"),
            new Pergunta("2 - Se x representa um \ndígito na base 10: \nquem é x?\n x11 + 11x + 1x1", ["3", "5", "2"], "5"),
            new Pergunta("3 - Quando somamos um \nmúltiplo de 4 com um \nmúltiplo de 6, \nobtemos necessariamente \num múltiplo de:", ["2", "6", "8"], "2"),
            new Pergunta("4 - Quanto é 30 x 30?", ["900", "1150", "Não sei"], "900"),
            new Pergunta("5 - Quanto é 60 x 9", ["540", "480", "600"], "540"),
            new Pergunta("6 - Quanto é 20 x 80", ["1400", "1620", "1600"], "1600")
        ]
    }

    get pergunta() {
        return this.perguntas[this.perguntaAtual];
    }

    renderizar() {
        if (!this.exibindo || this.finalizada) return;
        const xInicial = canvas.width / 2 - 165;
        const yInicial = canvas.height / 2 - 215;
        this.desenharFolha(xInicial, yInicial);
        this.pergunta.exibirPergunta(xInicial, yInicial, 25);
        max.reduzirPoder(0.02);
    }

    responderPergunta(callIfRight, callIfWrong) {
        if (this.pergunta.altSelected.descricao == this.pergunta.resposta) callIfRight();
        else callIfWrong();
        this.pergunta.reset();
        this.exibindo = false;
        this.perguntaAtual == this.perguntas.length - 1 ? this.perguntaAtual = 0 : this.perguntaAtual++;
    }

    desenharFolha(x, y) {
        ctx.drawImage(this.folha, x, y, 330, 430)
    }


}