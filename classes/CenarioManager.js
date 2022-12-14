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
        this.cenario.adicionarDialogo([new Dialogo("Caxumbinha", "Voc?? n??o fez carinho em mim, miau :(")], true);

        for (let i = 0; i < 80; i++)
            this.cenario.novoTiro(Projetil.chuvaInimiga('./assets/imgs/cenario/animados/gatinho', 90, 60, 60, 1))
    }

    finalPadrao() {
        this.cenario.adicionarDialogo([new Dialogo("Caxumbinha", "Miau miau, obrigado pela ajuda!")], true);
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

    transicaoCenario(passaCenario = true, callback = () => { }) {
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
                dialogos: [new Dialogo("...", "Ol??, pessoal, sou o Max"),
                new Dialogo("Max", "Vou contar o sonho que tive..."),
                new Dialogo("Max", "Sempre tive dificuldade com notas :("),
                new Dialogo("Max", "Agora ver??o como tudo come??ou e acabou"),
                new Dialogo("Max", "Acredite em voc?? mesmo.")
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
                            new Dialogo("Marciel", "O que voc?? est?? fazendo aqui ainda?"),
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
                dialogos: [new Dialogo("Max", "Professor? O que voc?? est?? fazendo aqui?"),
                new Dialogo("Marciel",
                    "Voc?? ficou com notas ruins em matem??tica e pr??tica de laborat??rio"),
                new Dialogo("Marciel", "Precisa compensar isso"),
                new Dialogo("Marciel", "J?? que com voc??s eu posso avan??ar mais"),
                new Dialogo("Max", "..."),
                new Dialogo("Max", "N??o fa??a isso."),
                new Dialogo("Max", "Por favor."),
                new Dialogo("Marciel", "De qualquer forma, voc?? precisa lutar"),
                new Dialogo("Marciel", "Procure pelo Perri e Ivaldo e salve seu boletim!"),
                new Dialogo("Marciel", "..."),
                new Dialogo("Marciel", "Vou sair de fininho..."),
                new Dialogo("Marciel", "Antes de eu sair..."),
                new Dialogo("Marciel", "LUTE COM O ROB??"),
                new Dialogo("Marciel", "PS: Espa??o atira e, caso tenha energia necess??ria, G para especial"),
                new Dialogo("ROB?? SHEIPADO", "VOC?? VAI MORRER!!!")
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
                dialogos: [new Dialogo("Max", "Professor? O que voc?? est?? fazendo aqui?"),
                new Dialogo("Perri", "Eu estava te esperando. Marciel me disse que voc?? queria falar comigo."),
                new Dialogo("Max", "Eu preciso que voc?? altere minha nota, eu n??o sou capaz de recuperar..."),
                new Dialogo("Perri", "N??o posso fazer isso, Max. Essas notas n??o dizem nada sobre voc??."),
                new Dialogo("Max", "Eu n??o consigo acreditar que sou capaz..."),
                new Dialogo("Perri", "Se voc?? n??o acredita em voc??, acredite em mim que acredito em voc??"),
                new Dialogo("Perri", "Nota se recupera, Max. Eu sei que voc?? ?? capaz."),
                new Dialogo("Max", "Eu quero acreditar em mim, como voc?? acredita..."),
                new Dialogo("Perri", "Max, voc?? ?? capaz, eu terei que te testar pra voc?? cair na real."),
                new Dialogo("Perri", "Feche os olhos."),
                new Dialogo("Perri", "Agora batalhe com meus discipulos, voc?? ?? capaz de ganhar. Te vejo na outra sala")
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
                    new Dialogo("Perri", "Voc?? conseguiu chegar aqui, parab??ns."),
                    new Dialogo("Perri", "Eu sabia que voc?? conseguiria, Max."),
                    new Dialogo("Perri", "Passe pela prova e pelos seus obstac??los e alterarei sua nota."),
                    new Dialogo("Max", "N??o tem como voc?? me dar a nota magicamente?"),
                    new Dialogo("Perri", "T?? doido? Faz a prova ai"),
                    new Dialogo("Max", "Ok, eu vou tentar."),
                    new Dialogo("Max", "Como vai funcionar essa prova?"),
                    new Dialogo("Perri", "Ser??o quest??es de alternativa."),
                    new Dialogo("Perri", "A cada quest??o que voc?? acertar, voc?? podera jogar mandioca em mim."),
                    new Dialogo("Perri", "Voc?? vai ter 3 segundos para jogar mandioca em mim quando acertar,"),
                    new Dialogo("Perri", "ap??s acabar o tempo, farei outras quest??es."),
                    new Dialogo("Max", "O que acontece se eu errar as quest??es?"),
                    new Dialogo("Perri", "Voc?? acerta a quest??o e me joga mandioca, voc?? erra e eu jogo caneta em voc??"),
                    new Dialogo("Max", "Justo."),
                    new Dialogo("Max", "S?? mais uma coisa, professor. Quando acaba a prova?"),
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
                    new Dialogo("Caxumbinha", "Miau miau, voc?? precisa parar!"),
                    new Dialogo("Caxumbinha", "Desistir ago..."),
                    new Dialogo("Caxumbinha", "Miau, miau!"),
                    new Dialogo("Caxumbinha", "Max, voc?? chegou!"),
                    new Dialogo("Caxumbinha", "Voc?? est?? na sua mente agora, miau miau"),
                    new Dialogo("Caxumbinha", "E esse ?? o seu eu que te joga para baixo, miau miau"),
                    new Dialogo("Caxumbinha", "Derrote-o!"),
                    new Dialogo("Max", "Voc?? precisa parar!"),
                ],
                iniciar: (cenario) => {
                    cenario.maxInimigo.imortal = false
                    if (this.carinhos >= 3) {
                        this.cenario.adicionarDialogo(
                            [
                                new Dialogo("Caxumbinha", "Miau miau, voc?? fez muito carinho em mim, vou te ajudar!")
                            ],
                            true);
                        for (let i = 0; i < 40; i++) this.cenario.novoTiro(Projetil.chuvaInimiga('./assets/imgs/cenario/animados/gatinhod', 30, 60, 60, 1, "inimigos"))
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
                            new Dialogo("Marciel", "Parab??ns, Max"),
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
                            new Dialogo("Perri", "Voc?? me derrotou de jeito..."),
                        ], true);
                    };

                    let ivaldo = this.pegarEntidadePrincipal("ivaldo");
                    ivaldo.temInteracao = true;
                    ivaldo.interagir = () => {
                        this.cenario.adicionarDialogo([
                            new Dialogo("Ivaldo", "Parab??ns, Max"),
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
                dialogos: [
                    new Dialogo("Max", "Professor? Acabou?"),
                    new Dialogo("Marciel", "Sim, Max. Voc?? recuperou"),
                    new Dialogo("Perri", "Estamos todos aqui por voc??"),
                    new Dialogo("Ivaldo", "Viu, cara, conseguiu"),
                ]
            }),


        ];
    }
}