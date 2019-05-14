class Arma extends Elemento {


  constructor(app, url, x, y, width, height, pasillo, potencia, bala) {
    super(app, url, x, y, width, height);
    this.pasillo = pasillo;
    this.bala = bala;
    this.disparos = new Array();
    this.hilo = new Hilo(this);
    this.hilo.start(3500);
    this.potencia = potencia;
  }

  draw(){
    for (let i = 0; i < this.disparos.length; i++) {
      let d = this.disparos[i];
      d.pintar();
    }

    for (let i = 0; i < this.disparos.length; i++) {
      let d = this.disparos[i];
      if(d.vivo <= 0){
        this.disparos.splice(i, 1);
      }
    }

    
  }

  disparar(){
    let b = new Bala(this.app, "src/img/disparoarma1.png", this.pos.x+30, this.pos.y-13, 0, 0, this, this.potencia);
    this.disparos.push(b);
  }

  run(){
    this.disparar();

  }

}

class Bala extends Elemento{

  constructor(app, url, x, y, width, height, arma, potencia) {
    super(app, url, x, y, width, height);
    this.arma = arma;
    this.enemigos = this.arma.pasillo.enemigos;
    this.hilo = new Hilo(this);
    this.hilo.start(60);
    this.velocidad = 4;
    this.vivo = true;
    this.potencia = potencia;
  }


  run(){
    this.pos.x += this.velocidad;


    for (let i = 0; i < this.enemigos.length; i++) {
      let e = this.enemigos[i];
      if(this.isSobreElemento(e)){
        e.vivo-= this.potencia;
        if(e.vivo <=0){
          this.arma.pasillo.espacio.money += 70;
          if(this.arma.pasillo.espacio.ultimate <100){
          this.arma.pasillo.espacio.ultimate +=5;
          }
        }

        this.vivo = false;
        this.hilo.stop();

      }
     
    }
    if(this.pos.x >= 1070){
      this.vivo = false;
      this.hilo.stop();
    }
  }
}
