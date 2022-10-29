const letras = ["A", "B", "C"]
class Alternativa {
    constructor(letra, descricao) {
        this.letra = letras[letra];
        this.descricao = descricao;
    }
}

class Pergunta {
    constructor(pergunta, alternativas, resposta) {
        this.pergunta = pergunta;
        let alt = shuffleArray(alternativas);

        this.alternativas = alt.map(descricao => new Alternativa(alt.indexOf(descricao), descricao));

        this.resposta = resposta;

    }

    exibirPergunta() {
        const folha = new Image();
        folha.src = "./assets/imgs/perri/Prova.png"
        const xInicial = canvas.width / 2 - 165;
        const yInicial = canvas.height / 2 - 215;
        let acumulador = yInicial + 325;
        ctx.font = '600 20px Georgia'
        max.vetorVelocidade.x = 0
        ctx.drawImage(folha, xInicial, yInicial, 330, 430)
        const lineHeight = 25;
        const lines = this.pergunta.split("\n");
        ctx.fillStyle = "black";
        for (let i = 0; i < lines.length; i++) {
            
            ctx.fillText(
                lines[i],
                xInicial + 30,
                yInicial + 100 + i*lineHeight,
                240
            );
        }

        ctx.fillStyle = "black";
        this.alternativas.forEach(alt => {
            ctx.fillText(
                alt.letra + ") " + alt.descricao,
                xInicial + 40,
                acumulador,
                canvas.width - 250
            );

            acumulador += lineHeight
        });

    }

  
}