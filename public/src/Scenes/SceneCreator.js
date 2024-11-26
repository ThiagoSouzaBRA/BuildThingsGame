class SceneCreator {
    constructor(id, screen, camera) {
        this.id = id
        
        // Configuração da cena
        this.cena = new THREE.Scene();
        this.cena.background = new THREE.Color(0x000000);

        this.screen = screen
        this.camera = camera
        

        // Configuração do renderizador da cena
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Tipo de sombra, opcional
        this.renderer.setSize(this.screen.offsetWidth, this.screen.offsetHeight);
        this.screen.appendChild(this.renderer.domElement);       
        
    }

    getID(){
        return this.id;
    }

    adicionarNaCena(object) {
        this.cena.add(object);
    }

    removerDaCena(object) {

    }

}
