class Inimigo extends EntidadeViva {
    constructor({
        skinSource,
        frames,
        largura,
        altura,
        direcao = "d",
        lado = 0,
        y
    }) {
        super({
            skinSource,
            frames,
            direcao,
            largura,
            altura
        })

        this.posicao = {
            x: lado == 0 ? Math.floor(Math.random() * 70) + 80 : Math.floor(Math.random() * 100) + 800,
            y: y
        };

    }

    dinamica(removerInimigo) {
        if (this.vida <= 0) {
            removerInimigo(this);
            this.matar();
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
                max.aplicarDano(0.5);
        } else {
            if (guardadial < dialogo.length) return
            this.vetorVelocidade.x = max.posicao.x < this.posicao.x ? -4 : 4;
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
        this.renderizar();
    }



}