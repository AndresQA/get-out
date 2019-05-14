new p5(function(app) {

    var log;
  
    app.setup = function() {
      const canvas = app.createCanvas(1200, 700);
      canvas.parent("skeche");
      log = new Logica(app);
    };
  
    app.draw = function() {
      log.pintar();
    };
  
    app.mousePressed = function() {
      log.mousePressed();
     
      
    };
  
    app.mouseReleased = function() {
      log.mouseReleased();
    };
  
    app.mouseDragged = function(){
      log.mouseDragged();
    }

    app.keyPressed = function(){
      log.backspace();
    }

    app.keyTyped = function(){
      log.teclado();
    }


  
  });
  