class Projetil extends Entidade {
    constructor({ skinSource, rate, frames }) {
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


    captarColisoes(removerTiros) {
        const inimigosAtingidos = inimigos.filter(
            (inimigo) =>
                inimigo.posicao.x + inimigo.largura >= this.posicao.x &&
                inimigo.posicao.x <= this.posicao.x + this.largura &&
                inimigo.posicao.y <= this.posicao.y + this.altura &&
                inimigo.posicao.y + inimigo.altura >= this.posicao.y
        );
        if (inimigosAtingidos.length > 0) {
            removerTiros(this);
            inimigosAtingidos.forEach((inimigo) => (inimigo.vida -= 10));
        }

        if (
            this.posicao.x + this.largura >= canvas.width ||
            this.posicao.x <= 0
        ) {
            removerTiros(this);
        }
    }

    dinamica(removerTiros) {
        this.captarColisoes(removerTiros);
        this.renderizar()
        
        //mov do tiro
        this.posicao.x += this.vetorVelocidade.x;
    }
}
