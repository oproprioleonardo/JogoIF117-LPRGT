class VidaE extends Entidade {
    constructor({
        x
    }) {
        super({
            largura: 25,
            altura: 25,
            skinSource: "./img/inimigos/vidainimigodrop",
            posicao: {
                x,
                y: 435
            },
            autoplay: false,
            loop: false
        })
        this.balanco = .5;
        setInterval(() => this.balanco = -this.balanco, 300);
    }

    aplicarBalanco() {
        this.posicao.y += this.balanco;
    }
}