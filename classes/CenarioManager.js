class CenarioManager {

    constructor() {
        this.cenarios = []
        this.posicao = 0
        this.transicionando = true;
        this.brilho = 1;

        this.registrarCenarios();
        this.cenario = this.cenarios[this.posicao];
    }

    corrigirBrilho() {
        ctx.fillStyle = "rgba(0, 0, 0, " + this.brilho + ")"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        if (this.transicionando && this.brilho <= 1.5) this.brilho += .1
        else if (this.brilho >= 0) this.brilho -= .1
    }

    proximoCenario() {
        this.posicao++;
        setTimeout(() => {
            this.transicionando = true
        }, 400);
        setTimeout(() => {
            max.entidadesColididas = []
            this.cenario = this.cenarios[this.posicao];
            
        }, 1100);
        setTimeout(() => {
            this.transicionando = false
        }, 1200);
    }

    registrarCenarios() {
        this.cenarios = [new Cenario({
                dialogos: [new Dialogo("...", "..."),
                    new Dialogo("...", "..."),
                    new Dialogo("Max", "Que sonho doido..."),
                    new Dialogo("Max", "O que foi tudo isso?"),
                    new Dialogo("Voz desconhecida", "Max, acorda!"),
                    new Dialogo("Max", "Alguém ta me chamando.."),
                    new Dialogo("Max", "Preciso me levantar...")
                ]
            }),

            // cenario inicial
            new Cenario({
                imgsrc: "./img/cenario/cenario0",
                entidades: [
                    Porta.portaTipo0(),
                    new Entidade({
                        largura: 100,
                        altura: 280,
                        posicao: {
                            x: 960,
                            y: 128
                        },
                        skinSource: "./img/cenario/animados/bolhas",
                        rate: 8,
                        frames: 4
                    }),
                    new Entidade({
                        largura: 80,
                        altura: 200,
                        posicao: {
                            x: 700,
                            y: 270
                        },
                        skinSource: "./img/cenario/animados/marciel",
                        temInteracao: true,
                        rate: 15,
                        frames: 2
                    }),
                    new Entidade({
                        largura: 60,
                        altura: 60,
                        posicao: {
                            x: 840,
                            y: canvas.height - 130
                        },
                        skinSource: "./img/cenario/animados/gatinho",
                        temInteracao: true,
                        rate: 10,
                        frames: 2
                    }),
                    new Inimigo({
                        skinSource: "./img/cenario/animados/espantalho/robo",
                        largura: 70,
                        altura: 150,
                        frames: 1,
                        direcao: "e",
                        lado: 1,
                        y: 250
                    })
                ],
                dialogos: [new Dialogo("Max", "Professor? O que você está fazendo aqui?"),
                    new Dialogo("Marciel",
                        "Você ficou com notas ruins em matemática e prática de laboratório"),
                    new Dialogo("Marciel", "Precisa compensar isso"),
                    new Dialogo("Max", "Mas você deveria mesmo ta aqui?"),
                    new Dialogo("Max", "Você é professor de física, afinal"),
                    new Dialogo("Marciel", "Continue assim e no próximo bimestre, será em física"),
                    new Dialogo("Marciel", "Já que com vocês eu posso avançar mais"),
                    new Dialogo("Max", "..."),
                    new Dialogo("Max", "Não faça isso."),
                    new Dialogo("Max", "Por favor."),
                    new Dialogo("Marciel", "De qualquer forma, você precisa lutar"),
                    new Dialogo("Marciel", "Não será fácil ganhar essa nota"),
                    new Dialogo("Marciel", "Procure pelo Perri e Ivaldo e salve seu boletim!"),
                    new Dialogo("Marciel", "Vai ser moleza!"),
                    new Dialogo("Max", "..."),
                    new Dialogo("Marciel", "..."),
                    new Dialogo("Marciel", "Vou sair de fininho..."),
                    new Dialogo("Marciel", "Antes de eu sair..."),
                    new Dialogo("Marciel", "LUTE COM O ROBÔ"),
                    new Dialogo("Marciel", "PS: Espaço atira"),
                    new Dialogo("ROBÔ SHEIPADO", "VOCÊ VAI MORRER!!!")
                ]
            }),


            //cenario na sala de aula
            new Cenario({
                imgsrc: "./img/cenario/cenario1",
                entidades: [
                    Porta.portaTipo1(),
                    new Entidade({
                        largura: 220,
                        altura: 320,
                        posicao: {
                            x: 760,
                            y: -50
                        },
                        skinSource: "./img/cenario/animados/ventilador",
                        rate: 7,
                        frames: 2
                    }),
                    new Entidade({
                        largura: 60,
                        altura: 60,
                        posicao: {
                            x: 230,
                            y: canvas.height - 220
                        },
                        skinSource: "./img/cenario/animados/gatinho",
                        temInteracao: true,
                        rate: 10,
                        frames: 2
                    })
                ],
                iniciar: (cenario) => {
                    for (let i = 1; i < 5; i++) {
                        cenario.gerarInimigo(i);
                    } 
                }
            }),

            //cenario no corredor
            new Cenario({
                imgsrc: "./img/cenario/cenario2",
                entidades: [
                    new Entidade({
                        largura: 60,
                        altura: 60,
                        posicao: {
                            x: 270,
                            y: 340
                        },
                        skinSource: "./img/cenario/animados/gatinho",
                        temInteracao: true,
                        rate: 10,
                        frames: 2
                    })
                ]
            })
        ];
    }
}