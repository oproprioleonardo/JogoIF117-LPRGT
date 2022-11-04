class CenarioManager {

    constructor() {
        this.cenarios = []
        this.posicao = 0
        this.transicionando = true;
        this.brilho = 1;

        this.max = new Jogador({});
        this.registrarCenarios();
        this.cenario = this.cenarios[this.posicao];

        this.wImg = new Image()
        this.wImg.src = "./assets/imgs/info/teclaw.png"
        this.balasInfoImg = new Image();
        this.coracaoImg = new Image()
        this.coracaoImg.src = "./assets/imgs/info/coracao.png"
    }

    corrigirBrilho() {
        ctx.fillStyle = "rgba(0, 0, 0, " + this.brilho + ")"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        if (this.transicionando && this.brilho <= 1.5) this.brilho += .1
        else if (this.brilho >= 0) this.brilho -= .1
    }

    exibirInfo() {
        this.cenario.portas.forEach(porta => {
            if (verificacolisao(1, porta, this.max)) {
                ctx.drawImage(this.wImg, porta.posicao.x + (porta.largura / 2) - 25, porta.posicao.y - 60, 50, 50)
            }
        });

        if (this.max.algumaEntidadeColidida) {
            const eColidida = this.max.entidadesColididas[0];
            if (!eColidida.temInteracao) return;
            if (eColidida.skinSource == "./assets/imgs/cenario/animados/gatinho") {
                ctx.drawImage(this.coracaoImg, eColidida.posicao.x + eColidida.largura /
                    4, eColidida.posicao.y - 45, 32, 32)
            } else if (eColidida.skinSource == "./assets/imgs/cenario/animados/marciel") {
                eColidida.temInteracao = false;
                this.cenario.adicionarDialogo([
                    new Dialogo("Marciel", "O que você está fazendo aqui ainda?"),
                    new Dialogo("Marciel", "*encara fixamente")
                ]);
                this.cenario.iniciarDialogos();
            } else if (eColidida.skinSource == "./assets/imgs/Ivaldo/ivaldo") {
                eColidida.temInteracao = false;
                this.cenario.adicionarDialogo([
                    new Dialogo("Ivaldo", "VAI LOGO!"),
                ]);
                this.cenario.iniciarDialogos();
            }
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
                this.cenario.iniciarDialogos();
            }
        }, 1100);
        setTimeout(() => {
            this.transicionando = false
            callback(this.cenario);
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
            imgsrc: "./assets/imgs/cenario/cenario0",
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
                new Entidade({
                    largura: 80,
                    altura: 200,
                    posicao: {
                        x: 700,
                        y: 270
                    },
                    skinSource: "./assets/imgs/cenario/animados/marciel",
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
                    skinSource: "./assets/imgs/cenario/animados/gatinho",
                    temInteracao: true,
                    rate: 10,
                    frames: 2
                }),
                new Inimigo({
                    skinSource: "./assets/imgs/cenario/animados/espantalho/robo",
                    largura: 70,
                    altura: 150,
                    frames: 1,
                    direcao: "e",
                    lado: 1,
                    y: 250
                }),
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
            ],
            iniciar: (cenario) => {

            }
        }),

        //cenario na sala de aula
        new Cenario({
            imgsrc: "./assets/imgs/cenario/cenario1",
            entidades: [
                new Entidade({
                    largura: 110,
                    altura: 200,
                    posicao: {
                        x: 700,
                        y: 270
                    },
                    skinSource: "./assets/imgs/perri/perriparadoe",
                    rate: 15,
                    frames: 1
                }),
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
                new Entidade({
                    largura: 60,
                    altura: 60,
                    posicao: {
                        x: 230,
                        y: canvas.height - 220
                    },
                    skinSource: "./assets/imgs/cenario/animados/gatinho",
                    temInteracao: true,
                    rate: 10,
                    frames: 2
                }),
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
                nextMusic();
                for (let i = 1; i < 5; i++) {
                    cenario.gerarInimigo(i);
                }
            }
        }),

        //cenario no corredor
        new Cenario({
            imgsrc: "./assets/imgs/cenario/cenario2",
            entidades: [
                new Entidade({
                    largura: 60,
                    altura: 60,
                    posicao: {
                        x: 270,
                        y: 340
                    },
                    skinSource: "./assets/imgs/cenario/animados/gatinho",
                    temInteracao: true,
                    rate: 10,
                    frames: 2
                }),
                new Ivaldo({}),
                this.max,
                new Perri({}),
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
                new Dialogo("Perri", "Se você errar muito em sequência, tocarei uma música para te acalmar."),
                new Dialogo("Perri", "Tome cuidado com as notas musicais que sairem da minha música."),
                new Dialogo("Max", "Isso foi estranho mas tudo bem."),
                new Dialogo("Max", "Só mais uma coisa, professor. Quando acaba a prova?"),
                new Dialogo("Perri", "Quando eu ficar de buchin chei"),
                new Dialogo("Max", "Ok, pode lançar as questões.")


            ],
            iniciar: (cenario) => {
                cenario.getEntidadeByName("perri").ataqueProva();
            }
        })

        ];
    }
}