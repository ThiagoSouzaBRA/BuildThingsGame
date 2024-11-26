class Camera {
    constructor(widthScreen, heightScreen) {

        // Configuração da câmera
        this.camera = new THREE.PerspectiveCamera(
            75,
            widthScreen / heightScreen,
            0.1,
            100
        );

        log("Camera criada.")
        
    }

    getObject(){
        return this.camera;
    }

    setPosition(x, y){
        this.camera.position.x = x;
        this.camera.position.y = y;
    }

    setRotation(){
        this.camera.rotation.x = x;
        this.camera.rotation.y = y;
    }

}
