class Porta extends Entidade {

    // terminar a parte das portas
    // e montar relação CENARIO-PORTA-TRANSICAO

    constructor({ largura = 140, altura, skinSource, posicao, rate = 8, frames, temSprite }) {
        super({ largura, posicao, altura, skinSource, rate, frames, temInteracao: true, autoplay: false, loop: false, temSprite })

    }

    // Quando é aberta uma porta, ocorre a transição para o novo cenário
    abrir(callback) {
        if (!this.temInteracao) return
        this.autoplay = true;
        this.temInteracao = false;
        max.vetorVelocidade.y = -10
        max.vetorVelocidade.x = 0
        callback();
    }

    // retorna um novo objeto de Porta Tipo 0
    static portaTipo0() {
        return new Porta({
            altura: 180,
            posicao: {
                x: 95,
                y: 280
            },
            skinSource: "./assets/imgs/cenario/salvar/Porta0",
            frames: 4
        })

    }

    // retorna um novo objeto de Porta Tipo 1
    static portaTipo1() {
        return new Porta({
            altura: 320,
            posicao: {
                x: 0,
                y: 200
            },
            skinSource: "./assets/imgs/cenario/animados/porta",
            frames: 2
        })
    }

    static portaTipo2() {
        return new Porta({
            altura: 320,
            posicao: {
                x: canvas.width - 120,
                y: 200
            },
            temSprite: false
        })
    }
}