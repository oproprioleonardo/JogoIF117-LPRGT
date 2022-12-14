class Jogador extends EntidadeViva {
    constructor() {
        super({
            skinSource: "./assets/imgs/max/max",
            rate: 10,
            frames: 2,
            estado: "parado",
            direcao: "d",
            largura: 120,
            altura: 140
        })
        this.posicao = {
            x: canvas.width / 2 - (140 / 2),
            y: canvas.height - 65 - this.altura
        };
        this.entidadesColididas = [];

        this.barraPoder = 0
    }

    reduzirPoder(a) {
        if (this.barraPoder <= 0) return;
        else if (this.barraPoder - a < 0) this.barraPoder = 0;
        else this.barraPoder -= a;
    }

    aumentarPoder(a) {
        if (this.barraPoder >= 100) return;
        else if (this.barraPoder + a > 100) this.barraPoder = 100;
        else this.barraPoder += a;
    }

    get algumaEntidadeColidida() {
        return this.entidadesColididas.length > 0;
    }

    exibirVida() {
        ctx.beginPath();
        const life = new Image()
        life.src = "./assets/imgs/info/vida.png"
        var degrade = ctx.createLinearGradient(0, 0, 200, 0);
        degrade.addColorStop(0, "DarkRed");
        degrade.addColorStop(1, "red");
        ctx.fillStyle = degrade;
        ctx.fillRect(75, 29, Math.max(0, (180 * this.vida) / 100), 33);
        ctx.closePath();
        ctx.drawImage(life, 50, 22, 210, 50);
    }

    exibirBarraPoder() {
        ctx.beginPath();
        const barra = new Image()
        barra.src = "./assets/imgs/info/barrapoder.png"
        var degrade = ctx.createLinearGradient(0, 0, 200, 0);
        degrade.addColorStop(0, "black");
        degrade.addColorStop(1, "#286eff");
        ctx.fillStyle = degrade;
        ctx.fillRect(76, 90, 180 * this.barraPoder / 100, 20);
        ctx.closePath();
        ctx.drawImage(barra, 50, 73, 210, 50);
    }

    renderizar() {
        this.exibirBarraPoder()
        this.exibirVida()
        ctx.drawImage(this.image, this.posicao.x, this.posicao.y, this.largura, this.altura)

        if (!this.autoplay) return;

        if (gameframe % this.rate == 0) {
            if (this.frameatual == this.frames && !this.loop) return
            this.carregarNovaImagem();
        }
        this.dinamica()
    }

    dinamica() {
        const vidasTocadas = cenarioManager.cenario.vidas.filter(
            (locVida) =>

                locVida.posicao.x + locVida.largura >= this.posicao.x &&
                locVida.posicao.x <= this.posicao.x + this.largura &&
                locVida.posicao.y <= this.posicao.y + this.altura &&
                locVida.posicao.y + locVida.altura >= this.posicao.y
        );
        if (vidasTocadas.length > 0) {
            vidasTocadas.forEach((locVida) => {
                cenarioManager.cenario.removerEntidade(locVida);
                this.vida = Math.min(100, this.vida + 5);
            });
        }

        this.posicao.x += this.vetorVelocidade.x;
        this.posicao.y += this.vetorVelocidade.y;
        this.vetorVelocidade.y += gravidade;

        if (this.posicao.y + this.altura >= canvas.height - 65) {
            this.vetorVelocidade.y = 0
        }
        if (this.posicao.x + this.largura >= canvas.width || this.posicao.x <= 0) {
            this.posicao.x = this.posicao.x <= 0 ? 0 : canvas.width - this.largura;
        }
    }

    matar() {
        if(!this.vivo) return;
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
            this.vetorVelocidade.dir = "d"
            this.mudarEstado("andando")
            this.vetorVelocidade.x = 7
        } else if (teclas.esquerda.press) {
            this.vetorVelocidade.dir = "e"
            this.mudarEstado("andando")
            this.vetorVelocidade.x = -7
        }
        if (teclas.cima.press && this.vetorVelocidade.y == 0)
            this.vetorVelocidade.y = -15
        if (teclas.espaco.press)
            this.mudarEstado("atirando")
        if (this.vetorVelocidade.y != 0) this.mudarEstado("pulando")

    }



}