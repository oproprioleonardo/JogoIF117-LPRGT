class Ivaldo extends EntidadeViva {
    constructor() {
        super({
            posicao: {
                x: canvas.width +  80,
                y: canvas.height - 140 - 60
            },
            skinSource: "./assets/imgs/Ivaldo/ivaldo",
            largura: 100,
            altura: 140,
            estado: 'andando',
            rate: 15,
            frames: 2,
            direcao: 'e',
            imortal: true
        })
    }
    
    //andar ao derrotar o perri, falta travar ao chegar no ponto desejado
    andar(){
        this.vetorVelocidade.x = -2
    }
}