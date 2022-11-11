class CenarioManager {

    constructor() {
        this.cenarios = []

        this.posicao = 0
        this.transicionando = true;
        this.brilho = 1;
        this.max = new Jogador();
        this.carinhos = 0;
        this.entidadesPrincipais = [{
                name: "gatinho",
                ent: new EntidadeViva({
                    largura: 60,
                    altura: 60,
                    skinSource: "./assets/imgs/cenario/animados/gatinho",
                    temInteracao: true,
                    direcao: "e",
                    interagir: (ent) => {
                        this.carinhos++;
                        ctx.drawImage(this.coracaoImg, ent.posicao.x + ent.largura /
                            4, ent.posicao.y - 45, 32, 32);
                        ent.temInteracao = true
                    },
                    imortal: true,
                    rate: 10,
                    frames: 2
                })
            },
            {
                name: "marciel",
                ent: new EntidadeViva({
                    largura: 80,
                    altura: 200,
                    skinSource: "./assets/imgs/cenario/animados/marciel",
                    temInteracao: true,
                    imortal: true,
                    rate: 15,
                    frames: 2
                })
            },
            {
                name: "ivaldo",
                ent: new Ivaldo()
            },
            {
                name: "perri",
                ent: new Perri()
            }
        ];


        this.registrarCenarios();
        this.cenario = this.cenarios[this.posicao];

        this.wImg = new Image()
        this.wImg.src = "./assets/imgs/info/teclaw.png"
        this.balasInfoImg = new Image();
        this.coracaoImg = new Image()
        this.coracaoImg.src = "./assets/imgs/info/coracao.png"
        this.coracaoMauImg = new Image()
        this.coracaoMauImg.src = "./assets/imgs/info/coracaomau.png"


    }

    pegarEntidadePrincipal(name) {
        return this.entidadesPrincipais.find(ent => ent.name == name).ent;
    }

    corrigirBrilho() {
        ctx.fillStyle = "rgba(0, 0, 0, " + this.brilho + ")"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        if (this.transicionando && this.brilho <= 1.5) this.brilho += .1
        else if (this.brilho >= 0) this.brilho -= .1
    }

    finalSemCaxumba() {
        this.cenario.adicionarDialogo([new Dialogo("Caxumbinha", "você não fez carinho em mim :(")], true);

        for (let i = 0; i < 40; i++)
            this.cenario.novoTiro(Projetil.chuvaInimiga('./assets/imgs/cenario/animados/gatinho', 80, 60, 60, 1))
    }

    finalPadrao() {
        this.cenario.adicionarDialogo([new Dialogo("Caxumbinha", "Obrigado pela ajuda!")], true);
    }

    exibirInfo() {
        this.cenario.portas.forEach(porta => {
            if (verificacolisao(1, porta, this.max)) {
                ctx.drawImage(this.wImg, porta.posicao.x + (porta.largura / 2) - 25, porta.posicao.y - 60, 50, 50)
            }
        });

        if (this.max.algumaEntidadeColidida) {
            const eColidida = this.max.entidadesColididas[0];
            if (!eColidida.temInteracao || eColidida.getClassName() == "Porta") return;
            eColidida.temInteracao = false;
            eColidida.interagir(eColidida);
        }

        this.balasInfoImg.src = "./assets/imgs/info/balas/" + limiteTiros + " balas.png"
        ctx.drawImage(this.balasInfoImg, 900, 0, 150, 80)
    }

    transicaoCenario(passaCenario = true, callback = () => {}) {
        if (passaCenario) this.posicao++;
        setTimeout(() => {
            this.transicionando = true
        }, 400);
        setTimeout(() => {
            if (passaCenario) {
                this.max.entidadesColididas = []
                this.cenario = this.cenarios[this.posicao];
                this.cenario.carregar();
            }
        }, 1100);
        setTimeout(() => {
            this.transicionando = false
            callback(this.cenario);
        }, 1200);
    }

    registrarCenarios() {
        this.cenarios = [
            new Cenario({
                dialogos: [new Dialogo("...", "..."),
                    new Dialogo("Max", "Que sonho doido..."),
                    new Dialogo("Max", "O que foi tudo isso?"),
                    new Dialogo("Voz desconhecida", "Max, acorda!"),
                    new Dialogo("Max", "Alguém ta me chamando.."),
                    new Dialogo("Max", "Preciso me levantar...")
                ]
            }),

            // cenario inicial
            new Cenario({
                imgsrc: "./assets/imgs/cenario/cenario0",
                carregar: () => {

                    let marciel = this.pegarEntidadePrincipal("marciel");
                    marciel.teleport(700, 270);
                    marciel.interagir = () => {
                        this.cenario.adicionarDialogo([
                            new Dialogo("Marciel", "O que você está fazendo aqui ainda?"),
                            new Dialogo("Marciel", "*encara fixamente")
                        ], true);
                    };

                    this.pegarEntidadePrincipal("gatinho").teleport(840, canvas.height - 130);

                    this.cenario.iniciarDialogos();
                },
                entidades: [
                    Porta.portaTipo0(),
                    new Entidade({
                        largura: 100,
                        altura: 280,
                        posicao: {
                            x: 960,
                            y: 128
                        },
                        skinSource: "./assets/imgs/cenario/animados/bolhas",
                        rate: 8,
                        frames: 4
                    }),
                    this.pegarEntidadePrincipal("marciel"),
                    this.pegarEntidadePrincipal("gatinho"),
                    this.max,
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
                    new Dialogo("Marciel", "Procure pelo Perri e Ivaldo e salve seu boletim!"),
                    new Dialogo("Marciel", "Vai ser moleza!"),
                    new Dialogo("Max", "..."),
                    new Dialogo("Marciel", "..."),
                    new Dialogo("Marciel", "Vou sair de fininho..."),
                    new Dialogo("Marciel", "Antes de eu sair..."),
                    new Dialogo("Marciel", "LUTE COM O ROBÔ"),
                    new Dialogo("Marciel", "PS: Espaço atira e, caso tenha energia necessária, G para especial"),
                    new Dialogo("ROBÔ SHEIPADO", "VOCÊ VAI MORRER!!!")
                ],
                iniciar: (cenario) => {
                    cenario.entidades.push(
                        new Inimigo({
                            skinSource: "./assets/imgs/cenario/animados/espantalho/robo",
                            largura: 70,
                            altura: 150,
                            frames: 1,
                            direcao: "e",
                            lado: 1,
                            y: 250
                        }))
                }
            }),

            //cenario na sala de aula
            new Cenario({
                imgsrc: "./assets/imgs/cenario/cenario1",
                carregar: () => {


                    this.pegarEntidadePrincipal("perri").teleport(700, 270);
                    this.pegarEntidadePrincipal("gatinho").teleport(230, canvas.height - 220);

                    this.cenario.iniciarDialogos();
                },
                entidades: [
                    this.pegarEntidadePrincipal("perri"),
                    Porta.portaTipo1(),
                    new Entidade({
                        largura: 220,
                        altura: 320,
                        posicao: {
                            x: 760,
                            y: -50
                        },
                        skinSource: "./assets/imgs/cenario/animados/ventilador",
                        rate: 7,
                        frames: 2
                    }),
                    this.pegarEntidadePrincipal("gatinho"),
                    this.max
                ],
                dialogos: [new Dialogo("Max", "Professor? O que você está fazendo aqui?"),
                    new Dialogo("Perri", "Eu estava te esperando. Marciel me disse que você queria falar comigo."),
                    new Dialogo("Max", "Eu preciso que você altere minha nota, eu não sou capaz de recuperar..."),
                    new Dialogo("Perri", "Não posso fazer isso, Max. Essas notas não dizem nada sobre você."),
                    new Dialogo("Max", "Dizem sim, dizem que eu não sou bom o suficiente."),
                    new Dialogo("Max", "Eu não consigo acreditar que sou capaz..."),
                    new Dialogo("Perri", "Se você não acredita em você, acredite em mim que acredito em você"),
                    new Dialogo("Perri", "Nota se recupera, Max. Eu sei que você é capaz."),
                    new Dialogo("Max", "Eu quero acreditar em mim, como você acredita..."),
                    new Dialogo("Perri", "Max, você é capaz, eu terei que te testar pra você cair na real."),
                    new Dialogo("Perri", "Feche os olhos."),
                    new Dialogo("Perri", "Agora batalhe com meus discipulos, você é capaz de ganhar. Te vejo na outra sala")
                ],
                iniciar: (cenario) => {

                    for (let i = 1; i < 5; i++) {
                        cenario.gerarInimigo(i);
                    }
                }
            }),

            //cenario no corredor
            new Cenario({
                imgsrc: "./assets/imgs/cenario/cenario2",
                carregar: () => {


                    this.pegarEntidadePrincipal("gatinho").teleport(270, 340);
                    this.pegarEntidadePrincipal("perri").teleport(900, canvas.height - 265);

                    let ivaldo = this.pegarEntidadePrincipal("ivaldo");
                    ivaldo.interagir = () => {
                        this.cenario.adicionarDialogo([
                            new Dialogo("Ivaldo", "VAI LOGO!"),
                        ], true);
                    };

                    this.cenario.iniciarDialogos();
                },
                entidades: [
                    this.pegarEntidadePrincipal("gatinho"),
                    this.pegarEntidadePrincipal("ivaldo"),
                    Porta.portaTipo2(),
                    this.max,
                    this.pegarEntidadePrincipal("perri"),
                ],
                dialogos: [
                    new Dialogo("Perri", "Você conseguiu chegar aqui, parabéns."),
                    new Dialogo("Perri", "Eu sabia que você conseguiria, Max."),
                    new Dialogo("Perri", "Alterarei sua nota, mas você terá que provar seu valor para você mesmo."),
                    new Dialogo("Perri", "Passe pela prova e pelos seus obstacúlos, você é capaz."),
                    new Dialogo("Max", "..."),
                    new Dialogo("Max", "Não tem como você me dar a nota magicamente?"),
                    new Dialogo("Perri", "Sim, só você acreditar em você mesmo e tentar fazer a prova. Você consegue"),
                    new Dialogo("Max", "Ok, eu vou tentar."),
                    new Dialogo("Max", "Como vai funcionar essa prova?"),
                    new Dialogo("Perri", "Serão questões de alternativa."),
                    new Dialogo("Perri", "A cada questão que você acertar, você podera jogar mandioca em mim."),
                    new Dialogo("Perri", "Você vai ter 3 segundos para jogar mandioca em mim quando acertar,"),
                    new Dialogo("Perri", "após acabar o tempo, farei outras questões."),
                    new Dialogo("Max", "O que acontece se eu errar as questões?"),
                    new Dialogo("Perri", "Você acerta a questão e me joga mandioca, você erra e eu jogo caneta em você"),
                    new Dialogo("Max", "Justo."),
                    new Dialogo("Max", "Só mais uma coisa, professor. Quando acaba a prova?"),
                    new Dialogo("Perri", "Quando eu ficar de buchin chei"),
                    new Dialogo("Perri", "Agora quieto e responda!")
                ],
                iniciar: (cenario) => {
                    cenario.getEntidadeByName("perri").ataqueProva();
                }
            }),
            //cenario max vs max
            new Cenario({
                imgsrc: "./assets/imgs/cenario/cenario3",
                carregar: () => {
                    let gatinho = this.pegarEntidadePrincipal("gatinho");
                    gatinho.teleport(180, 147);
                    gatinho.vetorVelocidade.dir = "d";

                    this.cenario.iniciarDialogos();
                },
                entidades: [
                    new Entidade({
                        largura: canvas.width,
                        altura: canvas.height + 150,
                        posicao: {
                            x: 0,
                            y: 70
                        },
                        skinSource: "./assets/imgs/cenario/animados/nuvem",
                        rate: 7,
                        frames: 8
                    }),
                    this.pegarEntidadePrincipal("gatinho"),
                    new Entidade({
                        largura: 70,
                        altura: 70,
                        posicao: {
                            x: 770,
                            y: 210
                        },
                        skinSource: "./assets/imgs/cenario/animados/gatinhomal",
                        temInteracao: true,
                        interagir: (ent) => {
                            ctx.drawImage(this.coracaoMauImg, ent.posicao.x + ent.largura /
                                4, ent.posicao.y - 45, 32, 32);
                            ent.temInteracao = true;
                        },
                        rate: 6,
                        frames: 4
                    }),
                    Porta.portaTipo2(),
                    new MaxInimigo(),
                    this.max,
                ],
                dialogos: [
                    new Dialogo("Max", "Que mer..."),
                    new Dialogo("Caxumbinha", "Você precisa parar!"),
                    new Dialogo("Caxumbinha", "Desistir ago..."),
                    new Dialogo("Caxumbinha", "Miau, miau!"),
                    new Dialogo("Caxumbinha", "Max, você chegou!"),
                    new Dialogo("Caxumbinha", "Você está na sua mente agora"),
                    new Dialogo("Caxumbinha", "E esse é o seu eu que te joga para baixo"),
                    new Dialogo("Caxumbinha", "Derrote-o!"),
                    new Dialogo("Max", "Você precisa parar!"),
                ],
                iniciar: (cenario) => {
                    cenario.maxInimigo.imortal = false
                    if (this.carinhos >= 3) {
                        this.cenario.adicionarDialogo(
                            [
                                new Dialogo("Caxumbinha", "Miau, miau!"),
                                new Dialogo("Caxumbinha", "Você fez muito carinho em mim, vou te ajudar!")
                            ],
                            true);
                        for (let i = 0; i < 20; i++) this.cenario.novoTiro(Projetil.chuvaInimiga('./assets/imgs/cenario/animados/gatinhod', 10, 60, 60, 1, "inimigos"))
                    }
                }
            }),


            new Cenario({
                imgsrc: "./assets/imgs/cenario/cenario4",
                carregar: () => {

                    let marciel = this.pegarEntidadePrincipal("marciel");
                    marciel.temInteracao = true;
                    marciel.interagir = () => {
                        this.cenario.adicionarDialogo([
                            new Dialogo("Marciel", "Parabéns, Max"),
                        ], true);
                    }

                    let perri = this.pegarEntidadePrincipal("perri");
                    perri.ressucitar();
                    perri.mudarEstado("parado");
                    perri.passivo = true;
                    perri.temInteracao = true;
                    perri.imortal = true;
                    perri.teleport(570, 270);
                    perri.interagir = () => {
                        this.cenario.adicionarDialogo([
                            new Dialogo("Perri", "Você me derrotou de jeito..."),
                        ], true);
                    };

                    let ivaldo = this.pegarEntidadePrincipal("ivaldo");
                    ivaldo.temInteracao = true;
                    ivaldo.interagir = () => {
                        this.cenario.adicionarDialogo([
                            new Dialogo("Ivaldo", "Parabéns, Max"),
                        ], true);
                    };
                    ivaldo.teleport(460, canvas.height - 205)

                    let gatinho = this.pegarEntidadePrincipal("gatinho");
                    gatinho.teleport(840, canvas.height - 130);
                    gatinho.vetorVelocidade.dir = "e";

                    this.cenario.iniciarDialogos();
                },
                entidades: [
                    new Entidade({
                        largura: 100,
                        altura: 280,
                        posicao: {
                            x: 960,
                            y: 128
                        },
                        skinSource: "./assets/imgs/cenario/animados/bolhas",
                        rate: 8,
                        frames: 4
                    }),
                    this.pegarEntidadePrincipal("marciel"),
                    this.pegarEntidadePrincipal("perri"),
                    this.pegarEntidadePrincipal("ivaldo"),
                    Porta.portaTipo0(),
                    this.pegarEntidadePrincipal("gatinho"),
                    this.max,
                ],
                dialogos: [new Dialogo("Max", "Professor? Acabou?"), ]
            }),


        ];
    }
}