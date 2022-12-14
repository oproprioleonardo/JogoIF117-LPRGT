const imgVidaEntidade = new Image();
imgVidaEntidade.src = "./assets/imgs/info/vidainimigo.png";

class EntidadeViva extends Entidade {

    constructor({
        posicao,
        skinSource,
        largura,
        altura,
        frames,
        rate,
        loop,
        autoplay,
        estado,
        direcao,
        passivo = true,
        imortal = false,
        resistencia = 0,
        dropaVida = true,
        temInteracao,
        interagir
    }) {
        super({
            posicao,
            skinSource,
            largura,
            altura,
            frames,
            rate,
            loop,
            autoplay,
            estado,
            direcao,
            temInteracao,
            interagir
        })
        this.passivo = passivo;
        this.imortal = imortal;
        this.vida = 100;
        this.resistencia = resistencia;
        this.dropaVida = dropaVida;
        this.vivo = true;
    }

    exibirVida() {
        if (this.imortal) return;
        ctx.beginPath();
        var degrade = ctx.createLinearGradient(0, 0, 200, 0);
        degrade.addColorStop(0, "DarkRed");
        degrade.addColorStop(1, "red");
        ctx.fillStyle = degrade;
        ctx.fillRect(
            this.posicao.x + this.largura / 2 - 38,
            this.posicao.y - 15,
            Math.max(0, ((75 * this.vida) / 100)),
            10
        );
        ctx.closePath();
        ctx.drawImage(imgVidaEntidade, this.posicao.x + this.largura / 2 - 37.5, this.posicao.y - 15, 75, 10);
    }

    aplicarDano(dano) {
        if (!this.vivo || this.imortal) return;
        if (this != max && max.barraPoder < 100) max.barraPoder++
        this.vida -= dano - (dano * this.resistencia);
        if (this.vida <= 0) this.matar()
    }

    ressucitar() {
        this.vida = 100;
        this.vivo = true;
    }

    droparVida() {
        cenarioManager.cenario.entidades.push(new VidaE({
            x: this.posicao.x + this.largura / 2,

        }));
    }

    matar() {
        if(!this.vivo) return;
        this.vida = 0;
        this.vivo = false;
        if (this.dropaVida) this.droparVida();
    }


}