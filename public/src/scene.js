class SceneCreator {
    constructor(screen = document.getElementById("tela")) {

        this.screen = screen     
        this.camera = new Camera(this.screen.offsetWidth, this.screen.offsetHeight)

        // Configuração da cena
        this.cena = new THREE.Scene();
        this.cena.background = new THREE.Color(0x0000000);

        // Configuração do renderizador da cena
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.screen.offsetWidth, this.screen.offsetHeight);
        this.screen.appendChild(this.renderer.domElement);


        // Ligações de métodos
        this.atualizar = this.atualizar.bind(this);

        this.myCube = new Cube()
        this.r = 0;
        this.adicionarNaCena(this.myCube.getObject())
        this.adicionarNaCena(new Cube(1,1,-4).getObject())


        this.lightScene = new Light()
        this.adicionarNaCena(this.lightScene.getObject())
    }

    atualizar() {
        this.renderer.render(this.cena, this.camera.getObject());

        this.camera.getObject().position.z = 5
        
       
        this.r += 0.02
        this.myCube.setRotation(this.r,this.r,this.r)
        this.lightScene.setRotation(this.r,this.r,this.r)



    }

    adicionarNaCena(object){
        this.cena.add(object);
    }

    removerDaCena(object){

    }

    iniciar() {
        this.renderer.setAnimationLoop(this.atualizar);
    }

    parar() {
        this.renderer.setAnimationLoop(null);
    }
}
