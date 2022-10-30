var musicafundo = document.getElementById("musicatema");
var mscfundo = false;
var musicadiv = document.querySelector(".musicadiv");
var volumemusica = document.querySelector(".volumemusica");
let todosbotoes = document.querySelectorAll(`.botao`)
let telacreditos = document.querySelector(`.creditos`)
var guardamusica = 40;

function musica() {
    if (!mscfundo) {
        musicadiv.style.backgroundImage = 'url("./assets/imgs/menuinicial/musicaligada.png")';
        musicafundo.play();
        musicafundo.volume = guardamusica / 100;
        volumemusica.value = guardamusica;
    }
    else {
        musicadiv.style.backgroundImage = 'url("./assets/imgs/menuinicial/musicadesligada.png")';
        musicafundo.volume = 0;
        volumemusica.value = 0;
    }
    mscfundo = !mscfundo
}

function volmusica() {
    guardamusica = volumemusica.value;
    musicafundo.volume = guardamusica / 100;
}

function iniciarJogo() {
    let carregamento = document.querySelector('.carregamento');
    carregamento.style.transform = "translateY(0%)"
    setTimeout(() => {
        window.location.replace("./index.html");
    }, 5000);
}

function mostrarCreditos() {
    telacreditos.classList.add("creditosativado")
    
}

function voltar() {
    telacreditos.classList.remove("creditosativado")
}

