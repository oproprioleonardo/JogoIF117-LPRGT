class MusicaManager {
    constructor() {
        this.musica = 0;
        this.tocando = false;
        this.podePassar = false;
        this.musicas = ["cutsceneinicial", "labsound", "saladeaula", "batalhadiscipulos"/* , "fightsound" */]
    }

    get volumeMusica() {
        return document.querySelector('.volumemusica')
    }

    get atual() {
        return document.getElementById(this.musicas[Math.min(this.musica, this.musicas.length - 1)]);
    }

    volmusica() {
        this.atual.volume = this.volumeMusica.value / 100;
    }

    playMusic() {
        if (this.tocando) return;
        this.tocando = true;
        this.atual.play();
    }

    stopMusic() {
        if (!this.tocando) return;
        this.tocando = false;
        this.atual.pause();
    }

    nextMusic() {
        this.podePassar = false;
        this.stopMusic()
        this.musica++;
        this.atual.volume = this.volumeMusica.value / 100;
        this.playMusic()
    }
}