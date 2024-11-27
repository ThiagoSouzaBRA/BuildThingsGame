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

        this.camera.centerOfRotation = null;

    }

    getMesh() {
        return this.camera;
    }

    getPosition() {
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

    addForce(x, y, z) {
        let velForce = 1
        this.camera.position.x += x ?? 0
        this.camera.position.y += y ?? 0
        this.camera.position.z += z ?? 0
    }

    zoomMouse(delta, centerOfRotation, zoomSpeed = 0.1) {
        const direction = new THREE.Vector3();
        direction.copy(this.camera.position).sub(centerOfRotation).normalize();

        // Ajusta a posição da câmera com base na direção e no zoom
        const deltaZoom = delta * zoomSpeed;
        this.camera.position.addScaledVector(direction, deltaZoom);

        // Mantém a câmera apontando para o centro de rotação
        this.camera.lookAt(centerOfRotation);
        this.camera.updateProjectionMatrix();
        this.camera.centerOfRotation = centerOfRotation
    }

    setCenterOfRotation(object) {
        this.camera.centerOfRotation = object;
    }

    getCenterOfRotation() {
        return this.camera.centerOfRotation
    }
}
