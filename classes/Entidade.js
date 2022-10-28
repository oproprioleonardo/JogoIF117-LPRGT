class Entidade {
    constructor({
        posicao = {
            x: 0,
            y: 0
        },
        skinSource = "./assets/imgs/erro/erro.png",
        frameatual = 1,
        largura = 240,
        altura = 100,
        rate = 1,
        frames = 1,
        loop = true,
        autoplay = true,
        estado = "",
        direcao = "",
        temInteracao = false
    }) {
        this.posicao = posicao;
        this.skinSource = skinSource;
        this.largura = largura;
        this.altura = altura;
        this.vetorVelocidade = {
            x: 0,
            y: 0,
            dir: direcao
        }

        this.temInteracao = temInteracao;
        this.frameatual = frameatual;
        this.rate = rate
        this.frames = frames

        this.loop = loop
        this.autoplay = autoplay

        this.estado = estado

        this.image = new Image();
        this.carregarNovaImagem(true);

    }

    teleport(x, y) {
        this.posicao.x = x;
        this.posicao.y = y;
    }

    teleportX(x) {
        this.posicao.x = x;
    }

    teleportY(y) {
        this.posicao.y = y;
    }

    // Esta função apenas define internamente a imagem que vai ser renderizada
    carregarNovaImagem(first) {
        if (!first) this.frameatual == this.frames ? this.frameatual = 1 : this.frameatual++
        this.image.src = this.skinSource + this.estado + this.vetorVelocidade.dir + this.frameatual + ".png"
    }

    renderizar() {
        ctx.drawImage(this.image, this.posicao.x, this.posicao.y, this.largura, this.altura)

        if (!this.autoplay) return;

        if (gameframe % this.rate == 0) {
            if (this.frameatual == this.frames && !this.loop) return
            this.carregarNovaImagem();
        }

    }

    mudarEstado(estado) {
        switch (estado) {
            case "andando":
                if (this.frameatual > 2) this.frameatual = 1
                this.frames = 2
                break;
            case "pulando":
                this.frameatual = 1
                this.frames = 1
                break;
            case "parado":
                if (this.frameatual > 2) this.frameatual = 1
                this.frames = 2
                break
            case "morto":
                if (this.frameatual > 1) this.frameatual = 1
                this.frames = 1
                break
            case "atirando":
                this.frames = 2
                break
            case "pararAtirar":
                this.estado = "atirando";
                this.frames = 4;
                setTimeout(() => {
                    this.mudarEstado("parado")
                }, 150);
                return
        }
        this.estado = estado
    }

    getClassName() {
        return this.constructor.name;
    }
}