let transicionando = true
let brilho = 1
function transicaoprog() {
    ctx.fillStyle = "rgba(0, 0, 0, " + brilho + ")"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    if (transicionando && brilho <= 1.5) brilho += .1
    else if (brilho >= 0) brilho -= .1
}

function transicao() {
    setTimeout(() => {
        transicionando = true
    }, 400);
    setTimeout(() => {
		colisaocomobjeto = false
        level++
        cenarios[level].iniciar()
		guardadial = 0
    }, 1100);
    setTimeout(() => {
        transicionando = false
        naoclica = false
    }, 1200);
}
