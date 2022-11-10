const letras = ["A", "B", "C"]
class Alternativa {
    constructor(letra, descricao) {
        this.letra = letras[letra];
        this.descricao = descricao;
    }
}

class Pergunta {
    constructor(pergunta, alternativas, resposta) {
        let alts = shuffleArray(alternativas);
        this.pergunta = pergunta;
        this.alternativas = alts.map(descricao => new Alternativa(alts.indexOf(descricao), descricao));
        this.selecionada = 0;
        this.resposta = resposta;

    }

    reset() {
        this.selecionada = 0;
        let alts = shuffleArray(this.alternativas.map(alt => alt.descricao));
        this.alternativas = alts.map(descricao => new Alternativa(alts.indexOf(descricao), descricao));
    }

    get altSelected() {
        return this.alternativas[this.selecionada];
    }

    get lines() {
        return this.pergunta.split("\n");
    }

    exibirPergunta(x, y, lineHeight) {
        ctx.font = '600 20px Georgia'
        ctx.fillStyle = "black";
        for (let i = 0; i < this.lines.length; i++) {
            ctx.fillText(
                this.lines[i],
                x + 30,
                y + 100 + i * lineHeight,
                240
            );
        }

        let acumulador = y + 325;

        this.alternativas.forEach(alt => {
            if (alt == this.altSelected) ctx.fillStyle = "green"
            ctx.fillText(
                alt.letra + ") " + alt.descricao,
                x + 40,
                acumulador,
                canvas.width - 250
            );
            ctx.fillStyle = "black"
            acumulador += lineHeight
        });

    }

    upAlt() {
        this.selecionada = (this.selecionada == 0) ? this.alternativas.length - 1 : this.selecionada - 1
    }

    downAlt() {
        this.selecionada = (this.selecionada == this.alternativas.length - 1) ? 0 : this.selecionada + 1
    }


}