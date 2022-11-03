class Ivaldo extends EntidadeViva {
    constructor({ }) {
        super({
            posicao: {
                x: canvas.width + 80,
                y: canvas.height - 140 - 60
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

    //andar ao derrotar o perri, falta travar ao chegar no ponto desejado
    andar() {
        this.vetorVelocidade.x = -2
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