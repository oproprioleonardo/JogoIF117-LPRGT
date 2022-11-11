class MusicaManager {
    constructor() {
        this.musica = 0;
        this.tocando = false;
        this.musicas = ["cutsceneinicial", "labsound", "saladeaula", "batalhadiscipulos", "fightsound"]
    }

    get volumeMusica() {
        return document.querySelector('.volumemusica')
    }

    get atual() {
        return document.getElementById(this.musicas[Math.min(this.musica, this.musicas.length - 1)]);
    }

    changeVolume() {
        this.atual.volume = this.volumeMusica.value / 100;
    }

    playMusic() {
        if (this.tocando) return;
        this.atual.play();
        this.tocando = true;
    }

    changeMusic(name) {
        this.stopMusic()
        this.musica = this.musicas.indexOf(name);
        this.atual.volume = this.volumeMusica.value / 100;
        this.playMusic()
    }

    stopMusic() {
        if (!this.tocando) return;
        this.tocando = false;
        this.atual.pause();
    }

    nextMusic() {
        this.stopMusic()
        this.musica++;
        this.atual.volume = this.volumeMusica.value / 100;
        this.playMusic()
    }
}