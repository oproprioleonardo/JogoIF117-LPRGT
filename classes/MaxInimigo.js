class MaxInimigo extends Inimigo {
    constructor({
        skinSource = "./assets/imgs/max/max",
        rate = 10,
        frames = 2,
        estado = "parado",
        direcao = "e",
        resistencia = 10,
        imortal = true
    }) {
        super({
            skinSource,
            rate,
            frames,
            estado,
            direcao,
            largura: 120,
            altura: 140,
            resistencia,
            imortal
        })
        this.loop = true
        this.resistencia = 0.7
        this.posicao = {
            x: 900,
            y: canvas.height - 65 - 200
        };
    }

    renderizar() {
        if (this.vida <= 0) {
            cenarioManager.cenario.removerEntidade(this);
            this.matar();
            return;
        }

        this.exibirVida()

        if (
            max.posicao.x + max.largura >= this.posicao.x &&
            max.posicao.x <= this.posicao.x + this.largura &&
            max.posicao.y + max.altura >= this.posicao.y &&
            max.posicao.y <= this.posicao.y + this.altura
        ) max.aplicarDano(0.2);


        ctx.drawImage(this.image, this.posicao.x, this.posicao.y, this.largura, this.altura)

        if (!this.autoplay) return;

        if (gameframe % this.rate == 0) {
            if (this.frameatual == this.frames && !this.loop) return
            this.carregarNovaImagem();
        }
        this.dinamica()
    }

    dinamica() {
        this.posicao.x += this.vetorVelocidade.x;
        this.posicao.y += this.vetorVelocidade.y;
        this.vetorVelocidade.y += gravidade;
        if (this.posicao.x + this.largura >= canvas.width || this.posicao.x <= 0) {
            this.posicao.x = this.posicao.x <= 0 ? 0 : canvas.width - this.largura;
        }
        if (this.posicao.y + this.altura >= canvas.height - 65) {
            this.vetorVelocidade.y = 0
        }
    }

    matar() {
        this.vida = 0;
        this.vivo = false;
        this.mudarEstado("morto");
    }


    movimentar(teclas) {
        this.vetorVelocidade.x = 0;
        if (this.estado == "morto") return;
        if (this.estado != "atirando") this.mudarEstado("parado");
        else return;

        if (teclas.direita.press) {
            this.vetorVelocidade.dir = "e"
            this.mudarEstado("andando")
            this.vetorVelocidade.x = -7
        } else if (teclas.esquerda.press) {
            this.vetorVelocidade.dir = "d"
            this.mudarEstado("andando")
            this.vetorVelocidade.x = 7
        }
        if (teclas.cima.press && this.vetorVelocidade.y == 0)
            this.vetorVelocidade.y = -15
        /*         if (teclas.espaco.press)
                    this.mudarEstado("atirando") */
        if (this.vetorVelocidade.y != 0) this.mudarEstado("pulando")
    }
}