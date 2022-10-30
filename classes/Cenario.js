class Cenario {
    constructor({
        entidades = [],
        imgsrc = "",
        estado = 1,
        dialogos = [],
        iniciar = () => { }
    }) {
        this.largura = canvas.width;
        this.altura = canvas.height;
        this.entidades = entidades;
        this.imgsrc = imgsrc;
        this.estado = estado;
        this.dialogos = dialogos;
        this.podeAvancarDialogo = true;
        this.dialogoPos = 0;
        this.dialogando = false;
        this.callback = iniciar;
        this.iniciado = false;
        if (imgsrc.length > 0) {
            this.image = new Image();
            this.carregarNovaImagem()
        }
        


    }

    adicionarEntidade(entidade) {
        this.entidades.push(entidade)
    }

    removerEntidade(entidade) {
        this.entidades = this.entidades.filter(ent => ent != entidade);
    }

    removerEntidadeByImg(endereco) {
        this.entidades = this.entidades.filter(ent => !ent.skinSource.includes(endereco));
    }

    acabouDialogo() {
        return this.dialogoPos == this.dialogos.length;
    }

    get entidadesComInteracao() {
        return this.entidades.filter(entidade => entidade.temInteracao);
    }

    get vidas() {
        return this.entidades.filter(entidade => entidade.getClassName() == "VidaE");
    }

    get portas() {
        return this.entidades.filter(entidade => entidade.getClassName() == "Porta");
    }

    get inimigos() {
        return this.entidades.filter(entidade => entidade.getClassName() == "Inimigo" || entidade.getClassName() == "Perri");
    }

    get tiros() {
        return this.entidades.filter(entidade => entidade.getClassName() == "Projetil");
    }

    get entidadesVivas() {
        return this.entidades.filter(entidade => entidade.getClassName() == "EntidadeViva");
    }

    get dialogoAtual() {
        return this.dialogos[this.dialogoPos];
    }

    get max() {
        return this.entidades.find(entidade => entidade.getClassName() == "Jogador");
    }

    getEntidadeByName(nome) {
        return this.entidades.find(entidade => entidade.skinSource.includes(nome));
    }

    adicionarDialogo(dialogos) {
        dialogos.forEach(d => this.dialogos.push(d));
    }

    iniciar() {
        if (this.iniciado) return;
        this.callback(this);
        this.iniciado = true;
    }

    iniciarDialogos() {
        if (this.dialogando) return;
        if (this.dialogos.length == 0) this.iniciar();
        else {
            this.dialogando = true;
            document.onkeypress = function (e) {
                let cen = cenarioManager.cenario;
                if (e.key.toLocaleUpperCase() !== "E") return;
                cen.dialogoPos++;
                if (cen.dialogoPos == cen.dialogos.length) {
                    document.onkeypress = function () { }
                    cen.dialogando = false;
                    cen.iniciar()
                    return;
                }
            };
        }
    }

    exibirDialogo(caixa = true) {
        if (this.dialogoAtual != undefined && this.dialogando)
            this.dialogoAtual.exibirDialogo(caixa);

    }

    novoTiro(tiro = new Projetil({})) {
        this.entidades.push(tiro);
    }

    gerarInimigo(sprite = 1) {
        let altura = 100;
        let largura = 60;
        let lado = 0;
        switch (sprite) {
            case 1:
                largura = 80;
                break;
            case 2:
                altura = 80;
                break;
            case 3:
                largura = 70;
                lado = 1;
                break;
            case 4:
                altura = 80;
                lado = 1;
                break;
        }
        let inimigo = new Inimigo({
            skinSource: "./assets/imgs/inimigos/inimigo" + sprite,
            largura,
            altura,
            direcao: "d",
            lado,
            y: -140
        });
        this.entidades.push(inimigo)
        return inimigo;
    }

    proximoEstado() {
        this.estado++;
        this.carregarNovaImagem();
    }

    carregarNovaImagem() {
        if (this.image != null) this.image.src = this.imgsrc + this.estado + ".png"
    }

    renderizar() {
        if (this.image != null) {
            ctx.drawImage(this.image, 0, 0, this.largura, this.altura)
            this.vidas.forEach(vida => vida.aplicarBalanco());
            this.entidades.forEach(entidade => entidade.renderizar());
            this.max.movimentar(teclas)
        }

    }
}