class Projetil extends Entidade {
    constructor({ skinSource = "img/tiromax/TiroMandioca", rate = 6, frames = 4 }) {
        super({ skinSource, rate, frames })
        this.posicao = {
            x: max.vetorVelocidade.dir == "e" ? max.posicao.x : max.posicao.x + max.largura,
            y: max.posicao.y + 60
        };
        this.vetorVelocidade = {
            x: max.vetorVelocidade.dir == "e" ? -8 : 8,
            y: 0,
            dir: ""
        };
        this.largura = 30;
        this.altura = 30;
    }


    captarColisoes() {
        const inimigosAtingidos = cenarioManager.cenario.inimigos.filter(
            (inimigo) =>
                inimigo.posicao.x + inimigo.largura >= this.posicao.x &&
                inimigo.posicao.x <= this.posicao.x + this.largura &&
                inimigo.posicao.y <= this.posicao.y + this.altura &&
                inimigo.posicao.y + inimigo.altura >= this.posicao.y
        );
        if (inimigosAtingidos.length > 0) {
            cenarioManager.cenario.removerEntidade(this);
            inimigosAtingidos.forEach((inimigo) => (inimigo.vida -= 10));
        }

        if (
            this.posicao.x + this.largura >= canvas.width ||
            this.posicao.x <= 0
        ) {
            cenarioManager.cenario.removerEntidade(this);
        }
    }

    renderizar() {
        this.captarColisoes();

        ctx.drawImage(this.image, this.posicao.x, this.posicao.y, this.largura, this.altura)

        if (!this.autoplay) return;

        if (gameframe % this.rate == 0) {
            if (this.frameatual == this.frames && !this.loop) return
            this.carregarNovaImagem();
        }

        this.posicao.x += this.vetorVelocidade.x;

    }
}
