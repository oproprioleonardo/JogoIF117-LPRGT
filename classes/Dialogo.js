const balao = new Image();
balao.src = "./img/info/dialogo.png";

class Dialogo {
    constructor(pessoa, fala) {
        this.pessoa = pessoa;
        this.fala = fala;
        this.caractere = 0;
     
    }

    exibirDialogo(caixa = true) {
        if (gameframe % 3 == 0) this.caractere++;
        

        ctx.font = '25px Georgia'
        max.vetorVelocidade.x = 0

        if (caixa) ctx.drawImage(balao, 30, 10, canvas.width - 170, 165);
        ctx.fillStyle = "white";
        ctx.fillText(
            this.fala.substr(0, this.caractere),
            canvas.width / 15,
            caixa ? 90 : canvas.height / 2,
            canvas.width - 250
        );
        ctx.font = "20pt sans-serif";
        ctx.fillText(this.pessoa, canvas.width / 9, caixa ? 39 : canvas.height / 2 - 60, canvas.width - 30);
        ctx.font = "10pt sans-serif";
        ctx.fillText("E", (canvas.width / 17) * 14, caixa ? 160 : canvas.height / 2 + 70, canvas.width - 30);

    }
}