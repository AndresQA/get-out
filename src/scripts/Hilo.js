class Hilo{

    constructor(objeto){
        this.intervalo;
        this.enEjecuacion = false;
        this.objeto = objeto;
        if(objeto.run != null){
            this.run = objeto.run;
        }
    }

    start(num){
        let tiempo = num;
        if(tiempo == null){
            tiempo = 1000;
        } 
        if(this.run != null){
            if(this.run != null){
                this.enEjecuacion = true;
                this.intervalo = setInterval(()=>{this.objeto.run()}, tiempo);
            }
        }
    }

    stop(){
        clearInterval(this.intervalo);
        this.enEjecuacion = false;
    }

}
