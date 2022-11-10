class Ivaldo extends EntidadeViva {
    constructor() {
        super({
            posicao: {
                x: canvas.width + 80,
                y: canvas.height - 200
            },
            skinSource: "./assets/imgs/Ivaldo/ivaldo",
            largura: 100,
            altura: 140,
            estado: 'andando',
            rate: 15,
            frames: 2,
            direcao: 'e',
            imortal: true,
            temInteracao: true
        })
    }
    andar() {
        this.vetorVelocidade.x = -2
        cenarioManager.cenario.adicionarDialogo([
            new Dialogo("Ivaldo", "Caramba, cara, você venceu"),
            new Dialogo("Ivaldo", "Você provou para mim que é capacitado"),
            new Dialogo("Ivaldo", "Você é uma boa pessoa."),
            new Dialogo("Ivaldo", "Você ultrapassou seus limites, como sempre."),
            new Dialogo("Ivaldo", "Não sinta raiva de mim ou do Perri, pela sua nota."),
            new Dialogo("Ivaldo", "Você provou para si mesmo que consegue."),
            new Dialogo("Ivaldo", "Eu vou alterar sua nota, porém terá que realizar 2 coisas."),
            new Dialogo("Max", "Quais?"),
            new Dialogo("Ivaldo", "1 - Não usar Go To, por ter usado você ficou com 5 na minha matéria."),
            new Dialogo("Ivaldo", "2 - Lutar contra você mesmo, sempre."),
            new Dialogo("Ivaldo", "Você vai ser sempre seu maior inimigo"),
            new Dialogo("Max", "De agora em diante não usarei Go To e"),
            new Dialogo("Max", "sempre vencerei de mim mesmo."),
            new Dialogo("Ivaldo", "Maravilhoso. Então vai lutar agora, boa sorte."),
            new Dialogo("Ivaldo", "Continue andando pelo corredor. Siga a direita."),
            new Dialogo("Max", "Agora???"),
            new Dialogo("Ivaldo", "Sim, ou fica com 5 na média. Você consegue."),
            new Dialogo("Max", "Eu consigo, essa é minha última luta.")
        ]);
        cenarioManager.cenario.iniciarDialogos();
    }

    renderizar() {
        ctx.drawImage(this.image, this.posicao.x, this.posicao.y, this.largura, this.altura)
        this.posicao.x += this.vetorVelocidade.x;
        this.posicao.y += this.vetorVelocidade.y;

        if (!this.autoplay) return;

        if (gameframe % this.rate == 0) {
            if (this.frameatual == this.frames && !this.loop) return
            this.carregarNovaImagem();
        }

        if (this.posicao.x <= 700) {
            this.frameatual = 1
            this.frames = 1
            this.vetorVelocidade.x = 0
            this.estado = ''
        }
    }
}