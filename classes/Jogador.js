class Jogador extends EntidadeViva {

    constructor({
        skinSource,
        rate,
        frames,
        estado,
        direcao
    }) {
        super({
            skinSource,
            rate,
            frames,
            estado,
            direcao,
            largura: 120,
            altura: 140
        })
        this.posicao = {
            x: canvas.width / 2 - (140 / 2),
            y: canvas.height - 65 - 140
        }

    }

    exibirVida() {
        ctx.beginPath();
        const life = new Image()
        life.src = "./img/info/vida.png"
        var degrade = ctx.createLinearGradient(0, 0, 200, 0);
        degrade.addColorStop(0, "DarkRed");
        degrade.addColorStop(1, "red");
        ctx.fillStyle = degrade;
        ctx.fillRect(75, 29, Math.max(0, (180 * this.vida) / 100), 33);
        ctx.closePath();
        ctx.drawImage(life, 50, 22, 210, 50);
    }

    dinamica(removerVidaAnimada) {
        this.exibirVida()
        this.renderizar()

        const vidasTocadas = locVidas.filter(
            (locVida) =>

            locVida.x + locVida.largura >= this.posicao.x &&
            locVida.x <= this.posicao.x + this.largura &&
            locVida.y <= this.posicao.y + this.altura &&
            locVida.y + locVida.altura >= this.posicao.y
        );
        if (vidasTocadas.length > 0) {
            vidasTocadas.forEach((locVida) => {
                removerVidaAnimada(locVida);
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