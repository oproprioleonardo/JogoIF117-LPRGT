let guardadial = 0;
let caractere = 0;

const balao = new Image();
balao.src = "./img/info/dialogo.png";



function dialogos(dialogo, pessoa, caixa = true) {
    ctx.font = '25px Georgia'
    if (guardadial >= dialogo.length) return;
    max.vetorVelocidade.x = 0
    if(caixa)ctx.drawImage(balao, 30, 10, canvas.width - 170, 165);
    ctx.fillStyle = "white";
    ctx.fillText(
        dialogo[guardadial].substr(0, caractere),
        canvas.width / 15,
        caixa ? 90 : canvas.height/2,
        canvas.width - 250
    );
    ctx.font = "20pt sans-serif";
    ctx.fillText(pessoa[guardadial], canvas.width / 9, caixa ? 39 : canvas.height/2 - 60, canvas.width - 30);
    ctx.font = "10pt sans-serif";
    ctx.fillText("E", (canvas.width / 17) * 14, caixa ? 160 : canvas.height / 2 + 70, canvas.width - 30);
    if (gameframe % 3 == 0) caractere++;
    if (caractere < dialogo[guardadial].length) return;

    document.onkeypress = function (e) {
        if (e.key !== "e" && e.key !== "E") return;
        caractere = 0;
        guardadial++;
    };
    ctx.font = '20px Arial'
}

