class Espacio {
  constructor(log, enemigo) {
    this.log = log;
    this.app = log.app;
    this.enemigo = enemigo;
    this.armaA = new Elemento(this.app, "src/img/armaicon1.png", 883, 640);
    this.armaB = new Elemento(this.app, "src/img/armaicon2.png", 1012, 640);
    this.vida = new Elemento(this.app, "src/img/vidas.png", 215, 648);
    this.seleccion;
    this.vidas = 3;
    this.money = 300;
    this.ultimate = 0;
    this.sel = false;

    this.pasillos = new Array();
    for (let i = 0; i < 4; i++) {
      this.pasillos.push(new Pasillo(this.app, 390, 310 + 80 * i, this));
    }


    this.ult = {};
    this.ult.ultimateon = new Elemento(
      this.app,
      "src/img/ultion.png",
      600,
      645
    );
    this.ult.ultimateoff = new Elemento(
      this.app,
      "src/img/ultioff.png",
      600,
      645
    );


  }

  start() {
    this.pasillos.forEach(function(p) {
      p.start();
    });
  }

  setTime(min, max){
    for (let i = 0; i < this.pasillos.length; i++) {
      let p = this.pasillos[i];
      p.setTime(min, max);
    }
  }

  pintar() {
    this.app.text(this.money, 772,659);
    this.app.text(this.ultimate+"%", 506, 659);
    for (let i = 0; i < this.pasillos.length; i++) {
      let p = this.pasillos[i];
      p.pintar();
    }

    for (let i = 0; i < this.pasillos.length; i++) {
      let p = this.pasillos[i];
      p.pintarArmas();
    }
    this.armaA.pintar();
    this.armaB.pintar();

    this.pintarVidar();

    if (this.ultimate == 100) {
      this.app.imageMode(this.app.CENTER);
      this.ult.ultimateon.pintar();
    } else {
      this.ult.ultimateoff.pintar();
    }
  }

  limpiar() {
    for (let i = 0; i < this.pasillos.length; i++) {
      let p = this.pasillos[i];
      p.limpiar();
    }
  }

  pintarVidar() {
    let distancia = 0;
    for (let i = 0; i < this.vidas; i++) {
      this.vida.pintar();
      this.vida.setposx(239 + (i * 50));
    }
    if(this.vidas<=0){
     this.log.pantalla = 4;
     this.limpiar();

    }
  }

  mousePressed() {
    if (this.armaA.isSobre() && this.money >= 100) {
      this.seleccion = this.armaA;
      this.sel = true;
    } else if (this.armaB.isSobre() && this.money >= 200) {
      this.seleccion = this.armaB;
      this.sel = true;

    }

    if(this.ult.ultimateon.isSobre() && this.ultimate == 100){
      this.limpiar();
      this.ultimate -= 100;
      //this.enemigo.vivo == 0;
    }
    
  }

  mouseReleased() {
    this.sel = false;

    for (let i = 0; i < this.pasillos.length; i++) {
      let p = this.pasillos[i];
      p.mouseReleased();
    }
    if (this.seleccion != null) {
      this.seleccion.resetPosicion();
      this.seleccion = null;
    }
  }

  mouseDragged() {
    if (this.seleccion != null) {
      this.seleccion.arrastrar();
    }
  }


  
}
