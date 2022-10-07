const balao = new Image();
balao.src = "./img/info/dialogo.png";

class Cenario {
    constructor({ entidades, imgsrc, nivel, dialogos }) {
        this.largura = canvas.width;
        this.altura = canvas.height;
        this.entidades = entidades;
        this.imgsrc = imgsrc;
        this.nivel = nivel;
        this.dialogos = dialogos;

        this.dialogoPos = 0;

    }

    get entidadesVivas() {
        return this.entidades.filter(entidade => typeof entidade == EntidadeViva);
    }

    get dialogoAtual() {
        return this.dialogos[this.dialogoPos];
    }

    exibirDialogo(caixa = true) {
        let dialogo = this.dialogoAtual;
        let pessoa = dialogo.pessoa;
        let fala = dialogo.fala;

        let caractere = 0;

        ctx.font = '25px Georgia'
        if (this.dialogoPos >= fala.length) return;
        max.vetorVelocidade.x = 0
        if (caixa) ctx.drawImage(balao, 30, 10, canvas.width - 170, 165);
        ctx.fillStyle = "white";
        ctx.fillText(
            fala.substr(0, caractere),
            canvas.width / 15,
            caixa ? 90 : canvas.height / 2,
            canvas.width - 250
        );
        ctx.font = "20pt sans-serif";
        ctx.fillText(pessoa, canvas.width / 9, caixa ? 39 : canvas.height / 2 - 60, canvas.width - 30);
        ctx.font = "10pt sans-serif";
        ctx.fillText("E", (canvas.width / 17) * 14, caixa ? 160 : canvas.height / 2 + 70, canvas.width - 30);
        if (gameframe % 3 == 0) caractere++;
        if (caractere < fala.length) return;

        document.onkeypress = function (e) {
            if (e.key !== "e" && e.key !== "E") return;
            caractere = 0;
            this.dialogoPos++;
        };
        ctx.font = '20px Arial'
    }

}