class Elemento {
  constructor(app, url, x, y, width, height) {
    this.app = app;
    this.url = url;
    this.width = 0;
    this.height = 0;

    if(width != null){
      this.width = width;
    }
  
    if(height != null){
      this.height = height;
    }


    if (url != "") {
      this.parte = this.app.loadImage(url);
      this.width = this.parte.width;
      this.height = this.parte.height;
    }
   
    
   
   
    this.pos = { x: x, y: y, inicial: { x: x, y: y } };
    this.block = false;
  }

  draw() {}



  setposx(x){
    this.pos.x = x;

  }

  pintar() {
    if (this.url != "") {
      this.app.imageMode(this.app.CENTER);
      this.app.image(this.parte, this.pos.x, this.pos.y);
    }
    this.draw();
    
  }

  resetPosicion(){
    this.pos.x = this.pos.inicial.x;
    this.pos.y = this.pos.inicial.y;
  }

  isSobre() {
    if(this.parte != null){
      this.width = this.parte.width;
      this.height = this.parte.height;
    }
 
    //Circulo
    /* if (
        this.app.dist(
          this.app.mouseX,
          this.app.mouseY,
          this.pos.x,
          this.pos.y
        ) <
        ((this.width / 2)+(this.height / 2))/2
      ) {
        return true;
      }
      return false;*/

    //Cuadrados
    if (
      this.app.mouseX > this.pos.x - this.width / 2 &&
      this.app.mouseX < this.pos.x + this.width / 2 &&
      this.app.mouseY > this.pos.y - this.height / 2 &&
      this.app.mouseY < this.pos.y + this.height / 2
    ) {
      return true;
    }
    return false;
  }

  isSobreElemento(elemento) {
    if(this.parte != null){
      this.width = this.parte.width;
      this.height = this.parte.height;
    }
    if (
      this.app.dist(elemento.pos.x, elemento.pos.y, this.pos.x, this.pos.y) <
      (this.width / 2 + this.height / 2) / 2
    ) {
      return true;
    }
    return false;
    /*
        //Cuadrados
        if(this.app.mouseX > (elemento.pos.x - (this.width/2)) && this.app.mouseX < (elemento.pos.x + (this.width/2)) && 
        this.app.mouseY > (elemento.pos.y - (this.height/2)) && this.app.mouseY < (elemento.pos.y + (this.height/2))) {
          return true;
        }
        return false;*/
  }

  arrastrar() {
    if (this.block == false) {
      this.pos.x = this.app.mouseX;
      this.pos.y = this.app.mouseY;
    }
  }
}
