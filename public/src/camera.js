class Camera {
    constructor(widthScreen, heightScreen) {

        // Configuração da câmera
        this.camera = new THREE.PerspectiveCamera(
            75,
            widthScreen / heightScreen,
            0.1,
            1000
        );

        this.camera.position.set(0, 0, 15);

    }

    getMesh(){
        return this.camera;
    }

    getPosition(){
        return this.camera.position
    }
    
    setPosition(x, y, z) {
        this.camera.position.set(x, y, z);
    }

    setRotation(x, y, z) {
        this.camera.rotation.set(x, y, z);
    }

    setFov(fov) {
        if (fov <= 0 || fov >= 180) {
            console.warn("O FOV deve estar entre 0 e 180 graus.");
            return;
        }
        this.camera.fov = fov; // Define o novo FOV
        this.camera.updateProjectionMatrix(); // Atualiza a matriz de projeção
    }

}
