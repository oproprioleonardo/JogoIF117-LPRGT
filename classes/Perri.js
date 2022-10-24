class Perri extends EntidadeViva {
    constructor({
        estado = "parado",
        rate = 6
    }) {
        super({
            skinSource: "./img/perri/perri",
            frames: 1,
            direcao: "e",
            largura: 80,
            altura: 200,
            estado,
            rate
        })

        this.perguntaAtual = 0
        this.perguntando = true
        this.perguntas = [
            {
                pergunta: "rafael é gay?",
                correta: "sim",
                errada: "não",
                resposta: 'q'
            },
            {
                pergunta: "thiago é gay?",
                correta: "sim",
                errada: "não",
                resposta: 'q'
            }
        ]
        this.posicao = {
            x: 900,
            y: canvas.height - 65 - 200
        };
    }

    renderizar() {
        ctx.drawImage(
            this.image,
            this.posicao.x,
            this.posicao.y,
            this.largura,
            this.altura)
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
        if (this.estado == "prova") this.renderizarPergunta();

        this.exibirVida();


        if (!this.autoplay) return;

        if (gameframe % this.rate == 0) {
            if (this.frameatual == this.frames && !this.loop) return
            this.carregarNovaImagem();
        }
    }

    responderPergunta() {
        let resposta = this.perguntas[this.perguntaAtual].resposta;
        let evento = e => {
            if (e.key != 'q' && e.key != 'r') return
            if (e.key == resposta) {
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
        }
        window.addEventListener('keydown', evento)
    }

    ataqueProva() {
        if (!this.perguntando) return
        this.mudarEstado('prova')
        this.imortal = true;
        this.responderPergunta()
    }

    renderizarPergunta() {
        let pergunta = this.perguntas[this.perguntaAtual];
        ctx.fillStyle = 'black';
        ctx.fillText(pergunta.pergunta, canvas.width / 2, 80, 100)
        ctx.fillText(pergunta.resposta == 'q' ?
            "q-" + pergunta.correta + ' r-' + pergunta.errada :
            "q-" + pergunta.errada + ' r-' + pergunta.correta, canvas.width / 2, 100, 100)
        max.vetorVelocidade.x = 0
    }

    mudarEstado(estado) {
        this.estado = estado;
        this.frameatual = 1;
        if (estado == "prova") {

            this.frames = 20;
        } else if (estado == "parado") {
            this.frames = 1;

        }
    }
}