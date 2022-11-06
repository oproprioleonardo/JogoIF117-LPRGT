class Projetil extends Entidade {
    constructor({ frameatual, atinge, vetorVelocidade, posicao, skinSource = "./assets/imgs/tiromax/TiroMandioca", rate = 6, frames = 4, largura, altura }) {
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
        this.largura = largura || 30;
        this.altura = altura || 30;
        this.atinge = atinge || "inimigos"
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
            atinge: "max"
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
                entidade == max ? entidade.aplicarDano(4) : entidade.aplicarDano(10);
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
