class Pasillo {
  constructor(app, x, y, espacio) {
    this.app = app;
    this.x = x;
    this.y = y;
    this.espacio = espacio;
    this.largo = 0;
    this.cuadricula = new Array();
    this.enemigos = new Array();
    this.personajes = new Array();
    this.hardcore = null;
    this.en1;
    this.en2;
    this.en3;

    this.time = Math.round(this.app.random(10, 20));

    this.hilo = new Hilo(this);

    this.urlEnemigos = [
      "src/img/enemigo1.png",
      "src/img/enemigo2.png",
      "src/img/enemigo3.png"
    ];

    for (let i = 0; i < 9; i++) {
      this.generarBloque();
    }
  }

  setTime(min, max){
    this.time = Math.round(this.app.random(min, max));
  }

  start() {
    let time = Math.round(this.app.random(10, 20));
    this.hilo.start(time * 1000);
  }

  pintar() {

    this.hardcore = this.espacio.log.contador;
    for (let i = 0; i < this.cuadricula.length; i++) {
      let c = this.cuadricula[i];
      c.pintar();
    }

    for (let i = 0; i < this.enemigos.length; i++) {
      let e = this.enemigos[i];
      e.pintar();
    }

    for (let i = 0; i < this.enemigos.length; i++) {
      let e = this.enemigos[i];
      if (e.vivo <= 0) {
        this.enemigos.splice(i, 1);
      }
    }

    for (let i = 0; i < this.personajes.length; i++) {
      let p = this.personajes[i];
      p.pintar();
    }
  }

  pintarArmas(){
    for (let i = 0; i < this.cuadricula.length; i++) {
      let c = this.cuadricula[i];
      c.pintarArma();
    }
  }

  limpiar(){
    for (let i = 0; i < this.enemigos.length; i++) {
      let e = this.enemigos[i];
      e.eliminar();
    }
    while(this.enemigos.length) {
      this.enemigos.pop();
    }
  }

  mouseReleased() {
    for (let i = 0; i < this.cuadricula.length; i++) {
      let c = this.cuadricula[i];
      c.mouseReleased();
    }
  }

  generarBloque() {
    let bloque = new Bloque(this.app, "", this.x + this.largo, this.y, this);
    this.largo += bloque.width;
    this.cuadricula.push(bloque);
  }

  generarEnemigo() {

    if(this.espacio.log.contador < 40){
     this.en1 = 2;
     this.en2 = 3;
     this.en3 = 4;
    }
    if(this.espacio.log.contador > 40){
      this.en1 = 6;
      this.en2 = 8;
       this.en3 = 10;
    } else if(this.espacio.log.contador > 80){
      this.en1 = 9;
      this.en2 = 12;
      this.en3 = 16;
    }

    let ramdon = Math.round(this.app.random(0, 2));
    let vida = [this.en1, this.en2, this.en3];

    let url = this.urlEnemigos[ramdon];
    let vital = vida[ramdon];
    let enemigo = new Enemigo(
      this.app,
      url,
      this.x + this.largo+200,
      this.y,
      this.espacio,vital 
    );
    enemigo.start();
    this.enemigos.push(enemigo);
  }

  run() {
    this.generarEnemigo();
    this.hilo.stop();

    this.hilo.start(this.time * 3000);
  }
}

class Bloque extends Elemento {
  constructor(app, url, x, y, pasillo) {
    super(app, url, x, y);
    this.app = app;
    this.pasillo = pasillo;
    this.espacio = this.pasillo.espacio;
    this.arma;
    this.x = x;
    this.y = y;
    this.height = 80;
    this.width = 80;
  }

  pintar() {
    this.app.rectMode(this.app.CENTER);
    //this.app.fill(255, 95, 197);
    this.app.noFill()
    if(this.espacio.sel == true){
    this.app.rect(this.x, this.y, this.width, this.height);
    }
  }

  pintarArma() {
    if (this.arma != null) {
      this.arma.pintar();
    }
    this.colision();
  }

  colision() {
    if (this.arma != null) {
      for (let i = 0; i < this.pasillo.enemigos.length; i++) {
        let e = this.pasillo.enemigos[i];
        if (this.isSobreElemento(e)) {
          e.velocidad = e.velocidad / 2;
          this.arma = null;
        }
      }
    }
  }

  mouseReleased() {
    if (this.arma == null && this.espacio.seleccion != null && this.isSobre()) {
      if (this.espacio.seleccion == this.espacio.armaA) {
        this.arma = new Arma(
          this.app,
          "src/img/arma1.png",
          this.pos.x,
          this.pos.y,
          this.width,
          this.height,
          this.pasillo, 1
        );
        this.espacio.money -= 100;
        this.money -100;
      } else if (true) {
        this.arma = new Arma(
          this.app,
          "src/img/arma2.png",
          this.pos.x,
          this.pos.y,
          this.width,
          this.height,
          this.pasillo, 3
        );
        this.espacio.money -= 200;

      }
    }
  }
}
