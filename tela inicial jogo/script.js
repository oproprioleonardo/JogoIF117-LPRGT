                           var musicafundo = document.getElementById("musicatema");
var mscfundo = false;
var musicadiv = document.querySelector(".musicadiv");

function musica() {
    if (!mscfundo) {
        musicadiv.style.backgroundImage = 'url("musicaligada.png")';
        musicafundo.play();
    }
    else {
        musicadiv.style.backgroundImage = 'url("musicadesligada.png")';
        musicafundo.pause();
    }

    mscfundo = !mscfundo
}

function volmusica() {
    var volumemusica = document.querySelector(".volumemusica");
    musicafundo.volume = volumemusica.value / 100;
}

function iniciarjogo() {
    var menu = document.querySelector(".telamenu");
    var jogo = document.querySelector(".jogo");
    menu.style.display = 'none';
    jogo.style.display = 'block';
}


function opcoes() {
    var menu = document.querySelector(".telamenu");
    var telaopcoes = document.querySelector(".opcoes");
    menu.style.display = 'none';
    telaopcoes.style.display = 'block';
}


function creditos() {
    var menu = document.querySelector(".telamenu");
    var telacreditos = document.querySelector(".creditos");
    menu.style.display = 'none';
    telacreditos.style.display = 'block';
}









function sair() {
    window.close();
}