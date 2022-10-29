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
        this.resistencia = 0.7
        this.perguntaAtual = 0
        this.perguntando = false
        this.perguntas = [
            new Pergunta("1 - O que acontece se\nvocê transferir R$3,14", ["Não Sei", "Uma transferência né", "Você vai ter feito um πx"], "Você vai ter feito um πx"),
            new Pergunta("2 - Quanto é 1 + 1?", ["3", "11", "2"], "2"),
            new Pergunta("3 - Quanto é 30 x 30", ["900", "600", "300"], "900"),
            new Pergunta("4 - Quanto é 2 + 2", ["4", "22", "Não sei"], "4"),
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
            cenarioManager.cenario.getEntidadeByName('ivaldo').vetorVelocidade.x = -2
            cenarioManager.cenario.adicionarDialogo([
                new Dialogo("Ivaldo", "Caramba, você venceu"),
                new Dialogo("Ivaldo", "Estava aguardando a sua chegada."),
                new Dialogo("Ivaldo", "Fiquei sabendo, que você quer sua nota alterada"),
                new Dialogo("Ivaldo", "Você provou para mim, que é capacitado"),
                new Dialogo("Ivaldo", "Você é uma boa pessoa."),
                new Dialogo("Ivaldo", "Você ultrapassou seus limites, como sempre."),
                new Dialogo("Ivaldo", "Não sinta raiva de mim ou do Perri, pela sua nota."),
                new Dialogo("Ivaldo", "As vezes, a vida da um golpe tão forte"),
                new Dialogo("Ivaldo", "que achamos que não conseguimos continuar"),
                new Dialogo("Ivaldo", "Você provou para si mesmo que consegue."),
                new Dialogo("Ivaldo", "Seu inimigo nessa jornada, não somos nós."),
                new Dialogo("Ivaldo", "Eu vou alterar sua nota, porém terá que realizar 2 coisas."),
                new Dialogo("Max", "Quais?"),
                new Dialogo("Ivaldo", "1 - Não usar Go Two, por ter usado você ficou com 5 na minha matéria."),
                new Dialogo("Ivaldo", "2 - Lutar contra você mesmo, sempre."),
                new Dialogo("Ivaldo", "Você vai ser sempre seu maior inimigo"),
                new Dialogo("Max", "De agora em diante não usarei Go Two e"),
                new Dialogo("Max", "sempre vencerei de mim mesmo."),
                new Dialogo("Ivaldo", "Maravilhoso. Então vai lutar agora, boa sorte."),
                new Dialogo("Max", "Agora???"),
                new Dialogo("Ivaldo", "Sim, ou fica com 5 na média. Você consegue."),
                new Dialogo("Max", "Eu consigo, essa é minha última luta.")
            ]);
            cenarioManager.cenario.iniciarDialogos();
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
                    for (let i = 0; i < 15; i++) {
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
            this.mudarEstado('parado')
        }
        window.addEventListener('keydown', evento)
    }

    //sincronizar sprite da prova com o Perri atacando prova
    provaVoando() {

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