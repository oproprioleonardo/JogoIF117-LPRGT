class Perri extends Inimigo {
    constructor({ }) {
        super({
            skinSource: "./assets/imgs/perri/perri",
            frames: 1,
            direcao: "e",
            largura: 110,
            altura: 200,
            estado: 'parado',
            rate: 4
        })

        this.prova = new Image()
        this.prova.src = './assets/imgs/perri/Especiais/Prova/Provavoando' + this.frameatual + '.png'
        this.loop = true
        this.resistencia = 0.7
        this.perguntaAtual = 0
        this.perguntando = false
        this.perguntas = [
            new Pergunta("1 - O que acontece se\nvocê transferir R$3,14", ["Não Sei", "Uma transferência né", "Você vai ter feito um πx"], "Você vai ter feito um πx"),
            new Pergunta("2 - Se x representa um \ndígito na base 10: \nquem é x?\n x11 + 11x + 1x1", ["3", "5", "2"], "5"),
            new Pergunta("3 - Quando somamos um \nmúltiplo de 4 com um \nmúltiplo de 6, \nobtemos necessariamente \num múltiplo de:", ["2", "6", "8"], "2"),
            new Pergunta("4 - Quanto é 30 x 30?", ["900", "1150", "Não sei"], "900"),
            new Pergunta("5 - Quanto é 60 x 9", ["540", "480", "600"], "540"),
            new Pergunta("6 - Quanto é 20 x 80", ["1400", "1620", "1600"], "1600")
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

        if (this.perguntando) {
            this.pergunta.exibirPergunta()
            this.provaVoando();
        }
        if (this.vida <= 0) {
            cenarioManager.cenario.removerEntidade(this);
            this.matar();
            cenarioManager.cenario.getEntidadeByName('ivaldo').andar()
            
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
        if (this.perguntando || this.vida <= 0) return
        this.perguntando = true;
        this.mudarEstado('prova')
        this.imortal = true;
        let evento = e => {
            const key = e.key.toUpperCase();
            if (key != 'A' && key != 'B' && key != "C") return
            const alternativa = this.pergunta.alternativas.find(alt => alt.letra == key)
            if (this.pergunta.resposta == alternativa.descricao) {
                cenarioManager.cenario.adicionarDialogo([
                    new Dialogo("Perri", "Jogue toda essa mandioca em mim...")
                ]);
                cenarioManager.cenario.iniciarDialogos();
                this.imortal = false;
                setTimeout(() => {
                    this.ataqueProva()
                }, 4000);
            }
            else {
                cenarioManager.cenario.adicionarDialogo([
                    new Dialogo("Perri", "CANETADAAAAA!")
                ]);
                cenarioManager.cenario.iniciarDialogos();
                setTimeout(() => {
                    for (let i = 0; i < 25; i++) {
                        cenarioManager.cenario.novoTiro(Projetil.caneta())
                    }
                }, 1000);
                setTimeout(() => {
                    this.ataqueProva();
                }, 3500);
            }
            window.removeEventListener('keydown', evento)
            this.mudarEstado("parado");
            this.perguntando = false
            this.perguntaAtual == this.perguntas.length - 1 ? this.perguntaAtual = 0 : this.perguntaAtual++
        }
        window.addEventListener('keydown', evento)
    }

    provaVoando() {
        ctx.drawImage(this.prova, this.posicao.x - 100, this.posicao.y - 10, this.largura, this.altura)
        this.prova.src = './assets/imgs/perri/Especiais/Prova/Provavoando' + this.frameatual + '.png'
    }

    mudarEstado(estado) {
        this.estado = estado;
        this.frameatual = 1;
        if (estado == "prova") {
            this.frames = 15;
            this.loop = false
        } else if (estado == "parado") {
            this.frames = 1;
        }
    }
}