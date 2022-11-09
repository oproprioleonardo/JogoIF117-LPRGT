class Perri extends Inimigo {
    constructor({ }) {
        super({
            skinSource: "./assets/imgs/perri/perri",
            frames: 1,
            direcao: "e",
            largura: 110,
            altura: 200,
            estado: 'parado',
            rate: 4,
            imortal: true
        })
        this.prova = new Image()
        this.prova.src = './assets/imgs/perri/Especiais/Prova/Provavoando' + this.frameatual + '.png'
        this.loop = true
        this.resistencia = 0
        this.atividade = new Prova();
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

        if (this.atividade.exibindo) {
            this.atividade.renderizar();
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
            max.posicao.x <= this.posicao.x + this.largura &&
            max.posicao.y + max.altura >= this.posicao.y &&
            max.posicao.y <= this.posicao.y + this.altura
        )
            max.aplicarDano(100);

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
        this.mudarEstado('prova')
        this.imortal = true;
        this.atividade.exibindo = true;
        let respondendo = e => {
            const key = e.key.toLowerCase();
            switch (key) {
                case "arrowup":
                    this.atividade.pergunta.upAlt();
                    break;
                case "arrowdown":
                    this.atividade.pergunta.downAlt();
                    break;
                case "enter":
                    this.atividade.responderPergunta(() => {
                        cenarioManager.cenario.adicionarDialogo([
                            new Dialogo("Perri", "Jogue toda essa mandioca em mim...")
                        ], true);
                        this.imortal = false;
                        setTimeout(() => {
                            this.ataqueProva()
                        }, 4000);
                    }, () => {
                        cenarioManager.cenario.adicionarDialogo([
                            new Dialogo("Perri", "CANETADAAAAA!")
                        ], true);
                        setTimeout(() => {
                            this.ataqueCaneta()
                        }, 1000);
                        setTimeout(() => {
                            this.ataqueProva();
                        }, 3500);
                    });

                    window.removeEventListener('keydown', respondendo);
                    this.mudarEstado("parado");
                    break;
            }
        }

        window.addEventListener('keydown', respondendo)
    }

    ataqueCaneta() {
        for (let i = 0; i < 25; i++) {
            cenarioManager.cenario.novoTiro(Projetil.chuvaInimiga('./assets/imgs/perri/Especiais/Canetada/caneta', 4,
                40, 20, 3))
        }
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