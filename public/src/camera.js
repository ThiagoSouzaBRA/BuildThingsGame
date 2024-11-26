class Camera {
    constructor(widthScreen, heightScreen) {

        // Configuração da câmera
        this.camera = new THREE.PerspectiveCamera(
            75,
            widthScreen / heightScreen,
            0.1,
            100
        );

        this.camera.position.set(0, 0, 15);

    }

    getObject(){
        return this.camera;
    }

    setPosition(x, y, z) {
        this.camera.position.set(x, y, z);
    }

    setRotation(x, y, z) {
        this.camera.rotation.set(x, y, z);
    }

}
