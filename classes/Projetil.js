class Projetil extends Entidade {
    constructor({ frameatual, atinge, vetorVelocidade, posicao, dano = 10, skinSource = "./assets/imgs/tiromax/TiroMandioca", rate = 6, frames = 4, largura, altura }) {
        super({ skinSource, rate, frames, frameatual })
        this.posicao = posicao || {
            x: max.vetorVelocidade.dir == "e" ? max.posicao.x : max.posicao.x + max.largura,
            y: max.posicao.y + 60
        };
        this.vetorVelocidade = vetorVelocidade || {
            x: max.vetorVelocidade.dir == "e" ? -8 : 8,
            y: 0,
            dir: ""

        };
        this.dano = dano
        this.largura = largura || 30;
        this.altura = altura || 30;
        this.atinge = atinge || "inimigos"
    }

    static novoTiroEspecial1() {
        return new Projetil({
            vetorVelocidade: {
                x: 0,
                y: Math.floor(Math.random() * 5) + 5,
                dir: ``
            },
            posicao: {
                x: Math.floor(Math.random() * canvas.width),
                y: -100
            },
            skinSource: `./assets/imgs/tiromax/TiroMandioca`,
            frames: 4,
            largura: 30,
            altura: 30,
            atinge: "inimigos",
            dano: 20
        })
    }

    static novoTiroEspecial2() {
        return new Projetil({
            vetorVelocidade: {
                x: max.vetorVelocidade.dir == "e" ? -2 : 2,
                y: 0,
                dir: ``
            },
            posicao: {
                x: max.vetorVelocidade.dir == "e" ? max.posicao.x : max.posicao.x + max.largura,
                y: max.posicao.y - 200
            },
            skinSource: `./assets/imgs/tiromax/TiroMandioca`,
            frames: 4,
            largura: 400,
            altura: 400,
            atinge: "inimigos",
            dano: 220
        })
    }

    static caneta() {
        return new Projetil({
            vetorVelocidade: {
                x: 0,
                y: Math.floor(Math.random() * 5) + 5,
                dir: ``
            },
            posicao: {
                x: Math.floor(Math.random() * canvas.width),
                y: -100
            },
            skinSource: `./assets/imgs/perri/Especiais/Canetada/caneta`,
            frameatual: Math.floor(Math.random() * 2) + 1,
            frames: 3,
            loop: false,
            autoplay: false,
            largura: 20,
            altura: 40,
            atinge: "max",
            dano: 4
        });
    }

    static chuvaMandiocaVermelha() {
        return new Projetil({
            vetorVelocidade: {
                x: 0,
                y: Math.floor(Math.random() * 5) + 5,
                dir: ``
            },
            posicao: {
                x: Math.floor(Math.random() * canvas.width),
                y: -100
            },
            skinSource: `./assets/imgs/max/maxinimigo/tiro/TiroMandioca`,
            frameatual: Math.floor(Math.random() * 2) + 1,
            frames: 3,
            loop: false,
            autoplay: false,
            largura: 40,
            altura: 40,
            atinge: "max",
            dano: 4
        });
    }

    static tiroMaxInimigo() {
        return new Projetil({
            vetorVelocidade: {
                x: cenarioManager.cenario.maxInimigo.vetorVelocidade.dir == "e" ? -8 : 8,
                y: 0,
                dir: ``
            },
            posicao: {
                x: cenarioManager.cenario.maxInimigo.posicao.x,
                y: cenarioManager.cenario.maxInimigo.posicao.y + 60,
            },
            skinSource: `./assets/imgs/max/maxinimigo/tiro/TiroMandioca`,
            frameatual: 1,
            frames: 4,
            largura: 40,
            altura: 40,
            atinge: "max",
            dano: 30
        });
    }

    captarColisoes(entidadeViva) {
        let atingidos = [];
        try {
            atingidos = atingidos.concat(cenarioManager.cenario[entidadeViva].filter(
                (entidade) =>
                    entidade.posicao.x + entidade.largura >= this.posicao.x &&
                    entidade.posicao.x <= this.posicao.x + this.largura &&
                    entidade.posicao.y <= this.posicao.y + this.altura &&
                    entidade.posicao.y + entidade.altura >= this.posicao.y
            ));

        } catch {
            const entidade = cenarioManager.cenario[entidadeViva];

            if (entidade.posicao.x + entidade.largura >= this.posicao.x &&
                entidade.posicao.x <= this.posicao.x + this.largura &&
                entidade.posicao.y <= this.posicao.y + this.altura &&
                entidade.posicao.y + entidade.altura >= this.posicao.y)
                atingidos.push(entidade)
        }



        if (atingidos.length > 0) {
            cenarioManager.cenario.removerEntidade(this);
            atingidos.forEach((entidade) => {
                if (entidade.imortal) return
                entidade.aplicarDano(this.dano)
            })
        }

        if (
            (this.posicao.x + this.largura >= canvas.width ||
                this.posicao.x <= 0) || (this.posicao.y + this.altura >= canvas.height)
        ) {
            cenarioManager.cenario.removerEntidade(this);
        }
    }

    renderizar() {
        this.captarColisoes(this.atinge);

        ctx.drawImage(this.image, this.posicao.x, this.posicao.y, this.largura, this.altura)

        if (!this.autoplay) return;

        if (gameframe % this.rate == 0) {
            if (this.frameatual == this.frames && !this.loop) return
            this.carregarNovaImagem();
        }

        this.posicao.x += this.vetorVelocidade.x;
        this.posicao.y += this.vetorVelocidade.y;

    }
}
