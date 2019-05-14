class Logica {
  constructor(app) {
    this.app = app;
    this.pantalla = 0;
    this.contador = 0;
    this.run = this.run.bind(this);
    this.iden = null;
    this.username = new String();
    this.mapa = new Espacio(this);
    this.notificacion = false

    this.fuente = app.loadFont("src/font/DS-DIGI.TTF");
    this.inicio = {};

    this.inicio.background = app.loadImage("src/img/inicio.png", 0, 0);
    this.inicio.instrucciones = app.loadImage(
      "src/img/instrucciones.png",
      0,
      0
    );
    this.inicio.login = app.loadImage("src/img/login.png", 0, 0);

    this.inicio.start = new Elemento(this.app, "src/img/start.png", 600, 300);
    this.inicio.start.hover = new Elemento(
      this.app,
      "src/img/start2.png",
      600,
      300
    );
    this.inicio.next = new Elemento(this.app, "src/img/next.png", 600, 492);
    this.inicio.next.hover = new Elemento(
      this.app,
      "src/img/next2.png",
      600,
      492
    );
    this.inicio.comenzar = new Elemento(
      this.app,
      "src/img/comenzar.png",
      600,
      492
    );
    this.inicio.comenzar.hover = new Elemento(
      this.app,
      "src/img/comenzar2.png",
      600,
      492
    );
      this.lateral = app.loadImage("src/img/lateral.png")
    this.gameover = {};
    this.gameover.fin = app.loadImage("src/img/gameover.png", 0, 0);

    this.ingame = {};
    this.ingame.interfaz = app.loadImage("src/img/interfaz.png", 0, 0);
    this.ingame.ultimateon = new Elemento(
      this.app,
      "src/img/ultion.png",
      600,
      645
    );
    this.ingame.ultimateoff = new Elemento(
      this.app,
      "src/img/ultioff.png",
      600,
      645
    );
  }

  pintar() {
    //this.app.background(0);
    switch (this.pantalla) {
      case 0:
        this.app.imageMode(this.app.CORNER);
        this.app.image(this.inicio.background, 0, 0);
        this.app.imageMode(this.app.CENTER);
        if (this.inicio.start.isSobre() == false) {
          this.inicio.start.pintar();
        } else {
          this.inicio.start.hover.pintar();
        }
        this.app.imageMode(this.app.CORNER);

        break;
      case 1:
        this.app.imageMode(this.app.CORNER);
        this.app.image(this.inicio.instrucciones, 0, 0);
        this.app.imageMode(this.app.CENTER);
        if (this.inicio.next.isSobre() == false) {
          this.inicio.next.pintar();
        } else {
          this.inicio.next.hover.pintar();
        }
        this.app.imageMode(this.app.CORNER);
        break;
      case 2:
        this.app.imageMode(this.app.CORNER);
        this.app.image(this.inicio.login, 0, 0);
        this.app.text(this.username,600,357);
        this.app.imageMode(this.app.CENTER);
        if (this.inicio.comenzar.isSobre() == false) {
          this.inicio.comenzar.pintar();
        } else {
          this.inicio.comenzar.hover.pintar();
        }
        this.app.imageMode(this.app.CORNER);
        if(this.notificacion == true){
          this.app.fill(255);
        this.app.text("Por favor ingresar un nombre de usuario", 600, 410);
        }
        break;

      case 3:
        this.app.imageMode(this.app.CORNER);
        this.app.image(this.ingame.interfaz, 0, 0);

        

        this.app.fill(200, 87, 10);
        this.app.textAlign(this.app.CENTER);
        this.app.textFont(this.fuente);
        this.app.textSize(20);
        this.app.text('100',882,674);
        this.app.text('200',1011,674);
        this.app.textSize(38);
        this.app.text(this.contador, 600, 52);
        

        if(this.contador < 10){
          this.mapa.setTime(10, 20)
        }else if(this.contador < 40){
          this.mapa.setTime(5, 10);
        }
        else if(this.contador < 80){
          this.mapa.setTime(3, 6);
        }
        else if(this.contador < 120){
          this.mapa.setTime(1, 2);
        }

        this.mapa.pintar();
        this.app.imageMode(this.app.CORNER);
        this.app.image(this.lateral, 1152, 28);

        break;

      case 4:
      this.stop();
        this.app.imageMode(this.app.CORNER);
        this.app.image(this.gameover.fin,0,0);

        this.app.textSize(60);
        this.app.fill(255);


        this.app.text(this.username + ": " + this.contador + " - puntos " ,600,357);


      break;

      default:
        break;
    }

    this.app.fill(0);
    this.app.textSize(25);
    this.app.textAlign(this.app.CENTER);
    this.app.textFont(this.fuente);
    //this.app.text("X: " + this.app.mouseX + " Y: " + this.app.mouseY, this.app.mouseX, this.app.mouseY);
  }

  mousePressed() {
    
    switch (this.pantalla) {
      case 0:
        if (this.inicio.start.isSobre()) {
          this.pantalla = 1;
        }
        break;
      case 1:
        if (this.inicio.next.isSobre()) {
          this.pantalla = 2;
        }
        break;

      case 2:
        if(this.inicio.comenzar.isSobre()){
          if(this.username == ""){
            this.notificacion = true;
          }
        }
        if (this.inicio.comenzar.isSobre() && this.username != "") {

          this.mapa.start();
          this.pantalla = 3;
          if (this.iden == null) {
            this.start();
          } else {
            clearInterval(this.iden);
            this.iden = null;
          }
        }

        break;

      case 3:
        this.mapa.mousePressed();
 
        break;

      default:
        break;
    }
  }

  mouseReleased() {
    switch (this.pantalla) {
      case 3:
        this.mapa.mouseReleased();
        break;
    }
  }

  mouseDragged() {
    switch (this.pantalla) {
      case 3:
        this.mapa.mouseDragged();
        break;
    }
  }

  start() {
    this.iden = setInterval(this.run, 1000);
    
    this.tiempo++;
  }

  run() {
   // console.log(this);
    this.contador++;
   // console.log(this.contador);
  }

  stop(){
    clearInterval(this.run);
    clearInterval(this.iden);
}

  backspace(){
    if(this.app.keyCode == this.app.BACKSPACE){
      this.username = this.username.substring(0, this.username.length-1);
      
    }

  }

teclado(){
  if (this.pantalla == 2){
    if (this.app.keyPressed != this.app.keyCode) {
      this.username += this.app.key;      
    }

}
  
}

}
