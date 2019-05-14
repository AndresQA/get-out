class Enemigo extends Elemento {

  constructor(app, url, x, y, espacio, vida) {
    super(app, url, x, y);
    this.hilo = new Hilo(this);
    this.espacio = espacio;
    this.vivo = vida;
    
    this.velocidad = Math.round(this.app.random(2, 4));
  }

  start(){
    this.hilo.start(40);
  }
  eliminar(){
    this.vivo = 0;
  }

  run(){


    if( this.vivo<=0){
      this.hilo.stop();
    }

    this.pos.x -= this.velocidad;
    
    if(this.pos.x < 300){
        this.espacio.vidas--;
        this.hilo.stop(); 
        this.eliminar();
    }

    
  }

 

  setVelocidad(veloc){
    this.velocidad = veloc;
  }
}


