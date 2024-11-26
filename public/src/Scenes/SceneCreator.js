class SceneCreator {
    constructor(id, screen, camera) {
        this.id = id

        // Configuração da cena
        this.cena = new THREE.Scene();
        this.cena.background = new THREE.Color(0x000000);

        this.screen = screen
        this.camera = camera

        this.listObjectsScene = []

        // Configuração do renderizador da cena
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Tipo de sombra, opcional
        this.renderer.setSize(this.screen.offsetWidth, this.screen.offsetHeight);
        this.camera.getMesh().aspect = this.screen.offsetWidth / this.screen.offsetHeight;
        this.screen.appendChild(this.renderer.domElement);

        this.raycaster = new THREE.Raycaster();
        this.raycaster.params.Points = { threshold: 0.1 }; // Aumenta o limiar de interseção
        this.mouse = new THREE.Vector2(); // Para armazenar as coordenadas do mouse

    }

    getID() {
        return this.id;
    }

    adicionarNaCena(object) {
        this.listObjectsScene.push(object)
        this.cena.add(object.getMesh());
    }

    removerDaCena(object) {
        const index = this.listObjectsScene.indexOf(object);

        if (index > 0) {
            // Libera recursos para evitar vazamentos de memória
            if (object.getMesh().geometry) {
                object.getMesh().geometry.dispose();
            }
            if (object.getMesh().material) {
                if (Array.isArray(object.getMesh().material)) {
                    object.getMesh().material.forEach(material => material.dispose());
                } else {
                    object.getMesh().material.dispose();
                }
            }

            this.listObjectsScene.splice(index, 1);
            this.cena.remove(object.getMesh());
        }

    }

    //retorna primeiro objeto encontrado
    getIntersectObjectClassByMouse(event) {
        let elementFind = null;
        const rect = this.renderer.domElement.getBoundingClientRect(); // Tamanho e posição do canvas

        // Converte as coordenadas do mouse para o espaço normalizado (-1 a 1)
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        // Atualiza o raycaster com a posição da câmera
        this.raycaster.setFromCamera(this.mouse, this.camera.getMesh());

        // Intersecta com os objetos da cena
        let ObjectsTarget = this.raycaster.intersectObjects(this.cena.children, true);



        if (ObjectsTarget.length > 0) {
            //retorna o Object Class
            this.listObjectsScene.forEach(element => {
                if (element.getMesh() == ObjectsTarget[0].object && element !== null) {
                    elementFind = element
                }

            })
        }
        return elementFind
    }

}
