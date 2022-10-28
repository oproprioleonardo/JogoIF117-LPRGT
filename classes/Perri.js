class Perri extends Inimigo {
    constructor({
        estado = "parado",
        rate = 6
    }) {
        super({
            skinSource: "./assets/imgs/perri/perri",
            frames: 1,
            direcao: "e",
            largura: 110,
            altura: 200,
            estado,
            rate
        })

        this.loop = true
        this.resistencia = 0.9
        this.perguntaAtual = 0
        this.perguntando = false
        this.perguntas = [
            new Pergunta("1 - O que acontece se\nvocê transferir R$3,14", ["Não Sei", "Uma transferência né", "Você vai ter feito um πx"], "Você vai ter feito um πx"),
        ]
        this.posicao = {
            x: 900,
            y: canvas.height - 65 - 200
        };
    }

    get pergunta() {
        return this.perguntas[this.perguntaAtual];
    }

    renderizar() {
        ctx.drawImage(
            this.image,
            this.posicao.x,
            this.posicao.y,
            this.largura,
            this.altura)

        if (this.perguntando) this.pergunta.exibirPergunta()
        if (this.vida <= 0) {
            cenarioManager.cenario.removerEntidade(this);
            this.matar();
            return;
        }

        if (
            max.posicao.x + max.largura >= this.posicao.x &&
            max.posicao.x <= this.posicao.x + this.largura
        ) {
            this.vetorVelocidade.x = 0;

            if (
                max.posicao.y + max.altura >= this.posicao.y &&
                max.posicao.y <= this.posicao.y + this.altura
            )
                max.aplicarDano(1.5);
        } else {
            if (cenarioManager.cenario.dialogoPos < cenarioManager.cenario.dialogos.length) return
            // muda a direção da imagem
            this.vetorVelocidade.dir = this.vetorVelocidade.x > 0 ? "d" : "e";

            this.posicao.x += this.vetorVelocidade.x;
        }
        this.posicao.y += this.vetorVelocidade.y;
        this.vetorVelocidade.y += gravidade;

        if (this.posicao.y + this.altura + 70 >= canvas.height) {
            this.vetorVelocidade.y = 0;
            if (this.posicao.y + this.altura > canvas.height)
                this.posicao.y = canvas.height - this.altura;
        }

        this.exibirVida();


        if (!this.autoplay) return;

        if (gameframe % this.rate == 0) {
            if (this.frameatual == this.frames && !this.loop) return
            this.carregarNovaImagem();
        }
    }

    ataqueProva() {
        if (this.perguntando) return
        this.perguntando = true;
        this.mudarEstado('prova')
        this.imortal = true;
        let evento = e => {
            const key = e.key.toUpperCase();
            if (key != 'A' && key != 'B' && key != "C") return

            const alternativa = this.pergunta.alternativas.find(alt => alt.letra == key)
            if (this.pergunta.resposta == alternativa.descricao) {
                console.log('acertou')
            }
            else {
                console.log('errou')
                for (let i = 0; i < 10; i++) {
                    cenarioManager.cenario.novoTiro(Projetil.caneta())
                }
            }
            window.removeEventListener('keydown', evento)
            this.mudarEstado("parado");
            this.imortal = false;
            this.perguntando = false
            this.perguntaAtual++
        }
        window.addEventListener('keydown', evento)
    }

    mudarEstado(estado) {
        this.estado = estado;
        this.frameatual = 1;
        if (estado == "prova") {
            this.frames = 20;
            this.loop = false
        } else if (estado == "parado") {
            this.frames = 1;
        }
    }
}