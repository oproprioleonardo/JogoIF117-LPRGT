class Porta extends Entidade {

// terminar a parte das portas
// e montar relação CENARIO-PORTA-TRANSICAO

    constructor({ largura = 140, altura, skinSource, posicao, rate = 8, frames }) {
        super({ largura, posicao, altura, skinSource, rate, frames, autoplay: false, loop: false })
        this.aberta = false;
    }

    // Quando é aberta uma porta, ocorre a transição para o novo cenário
    abrir() {
        if (this.aberta) return
        this.autoplay = true;
        max.vetorVelocidade.y = -10
        max.vetorVelocidade.x = 0

    }

    // retorna um novo objeto de Porta Tipo 0
    static portaTipo0() {
        return new Porta({
            altura: 180,
            posicao: {
                x: 95,
                y: 280
            },
            skinSource: "./img/cenario/salvar/Porta0",
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
            skinSource: "./img/cenario/animados/porta",
            frames: 2
        })

    }

}