class mainScene extends SceneCreator {
    constructor(id, screen) {

        //Camera desta cena especifica
        const newCamera = new Camera(screen.offsetWidth, screen.offsetHeight)
        // camera.getMesh().position.set(0, 5, 10); // Ajuste conforme necessário
        newCamera.setPosition(0, 10, 10)
        newCamera.getMesh().lookAt(0, 0, 0); // Garante que a câmera está olhando para o centro da cena
        newCamera.setFov(100)

        super(id, screen, newCamera)


        this.cena.background = new THREE.Color(Colors.LIGHT_BLUE); // Altera para vermelho

        /////ELEMENTOS NA CENA

        this.light = new Light()
        this.light.getMesh().color.set(Colors.WHITE)
        this.adicionarNaCena(this.light)


        const x = 32; // Dimensão 1
        const y = 5; // Dimensão 2
        const z = 32; // Dimensão 3
        // Criando a matriz 3D
        this.matriz3D = new Array(x);
        for (let i = 0; i < x; i++) {
            this.matriz3D[i] = new Array(y);
            for (let j = 0; j < y; j++) {
                this.matriz3D[i][j] = new Array(z);
                for (let k = 0; k < z; k++) {
                    // Criar o cubo na posição (i, j, k)
                    let cubo = new Cube(i * 1.01, j * 1.01, k * 1.01);

                    // Definir cor (opcional)
                    cubo.setColor(Colors.GRAY); // Altere a cor conforme necessário

                    // Adicionar à matriz
                    this.matriz3D[i][j][k] = cubo;

                    // Adicionar à cena
                    this.adicionarNaCena(cubo);
                }
            }
        }


        this.setCamera(x / 2, this.matriz3D[0].length, z / 2)
        this.setMouse()
        this.setTeclado()

    }

    //Atualiza objetos
    update() {
        this.updateViewCamera()


    }

    //Desenha a Cena
    draw() {
        this.update()

        this.renderer.render(this.cena, this.camera.getMesh());
    }

    setCamera(posX = 0, posY = 0, posZ = 0) {
        //Bloco Referencia para visualização da camera
        this.blockView = new Cube(1, 1, 1);
        this.blockView.setPosition(posX, posY, posZ)
        this.setCameraPointSpawn(this.blockView)

        // this.adicionarNaCena(this.blockView);

    }

    setCameraPointSpawn(object) {
        if (!object) {
            log("Não foi possível identificar o objeto de foco da camera!")
            return
        }
        this.camera.setCenterOfRotation(this.blockView); //Define o objeto como referencia centralizador da camera
        this.camera.getMesh().lookAt(this.camera.getCenterOfRotation()); //Define rotação para o objeto centralizador
        this.camera.getMesh().updateProjectionMatrix();

    }

    updateViewCamera() {
        this.camera.setCenterOfRotation(this.blockView.getPositionVector3())

        //Olhar para a referencia
        this.camera.getMesh().lookAt(this.camera.getCenterOfRotation());
        this.camera.getMesh().updateProjectionMatrix();

        this.rotateCameraAnimation()
    }

    rotateCameraAnimation(){

        let rotationSpeed = 0.0005

        // Rotação da câmera
        this.camera.setCenterOfRotation(this.blockView.getPositionVector3())
        // Calcular a direção da rotação em torno do ponto fixo
        const direction = new THREE.Vector3();
        direction.copy(this.camera.getMesh().position).sub(this.camera.getCenterOfRotation()); // Direção da câmera em relação ao centro

        // Converte a posição da câmera para coordenadas esféricas
        const spherical = new THREE.Spherical();
        spherical.setFromVector3(direction);

        // Ajuste os ângulos de rotação com base no movimento do mouse
        spherical.theta -= rotationSpeed; // Rotação horizontal
        spherical.phi = 1;   // Rotação vertical

        // Limitar a rotação vertical para não inverter a câmera
        spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi));

        // Atualiza a posição da câmera com base na rotação
        this.camera.getMesh().position.copy(this.camera.getCenterOfRotation()).add(new THREE.Vector3().setFromSpherical(spherical));

        // Mantém a câmera apontando para o centro de rotação
        this.camera.getMesh().lookAt(this.camera.getCenterOfRotation());

        this.r += 0.002
    }

    setMouse() {
        let isDragging = false; // Flag para detectar se o mouse está arrastando
        let isRightButton = false; // Detecta se é o botão direito
        let previousMousePosition = { x: 0, y: 0 }; // Última posição do mouse

        // Sensibilidade do movimento
        const rotationSpeed = 0.005; // Velocidade de rotação
        const zoomSpeed = 0.01; // Velocidade de zoom
        const dragSpeed = 0.05; // Velocidade do arraste do mapa

        window.addEventListener('click', (event) => {
            // Intersecta com os objetos da cena
            const objectClass = this.getIntersectObjectClassByMouse(event);

            if (objectClass) {
                const objetoClicado = objectClass.getMesh();

                if (objetoClicado.customID === "Cube") {
                    objectClass.setColor(Colors.GREEN)
                }
            }
        });

        // Evento de pressionar o botão do mouse
        window.addEventListener('mousedown', (event) => {
            isDragging = true;
            isRightButton = event.button === 2; // Verifica se é o botão direito
            previousMousePosition = { x: event.clientX, y: event.clientY };

            // Atualiza a posição do mouse (coordenadas normalizadas para o Raycaster)
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        });

        // Evento de soltar o botão do mouse
        window.addEventListener('mouseup', () => {
            isDragging = false;
            isRightButton = false;
        });

        // Evento de movimento do mouse
        window.addEventListener('mousemove', (event) => {
            if (!isDragging) return;

            const deltaMove = {
                x: event.clientX - previousMousePosition.x,
                y: event.clientY - previousMousePosition.y,
            };

            previousMousePosition = { x: event.clientX, y: event.clientY };

            const camera = this.camera.getMesh();

            if (isRightButton) {
                // Rotação da câmera
                this.camera.setCenterOfRotation(this.blockView.getPositionVector3())
                // Calcular a direção da rotação em torno do ponto fixo
                const direction = new THREE.Vector3();
                direction.copy(camera.position).sub(this.camera.getCenterOfRotation()); // Direção da câmera em relação ao centro

                // Converte a posição da câmera para coordenadas esféricas
                const spherical = new THREE.Spherical();
                spherical.setFromVector3(direction);

                // Ajuste os ângulos de rotação com base no movimento do mouse
                spherical.theta -= deltaMove.x * rotationSpeed; // Rotação horizontal
                spherical.phi -= deltaMove.y * rotationSpeed;   // Rotação vertical

                // Limitar a rotação vertical para não inverter a câmera
                spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi));

                // Atualiza a posição da câmera com base na rotação
                camera.position.copy(this.camera.getCenterOfRotation()).add(new THREE.Vector3().setFromSpherical(spherical));

                // Mantém a câmera apontando para o centro de rotação
                camera.lookAt(this.camera.getCenterOfRotation());
            } else {
                // Movimento do blockView no plano XZ
                const cameraMatrix = camera.matrixWorld;

                // Vetores de direção baseados na câmera
                let forward = new THREE.Vector3(0, 0, -1).applyMatrix4(cameraMatrix).sub(camera.position).normalize(); // Frente
                let right = new THREE.Vector3(1, 0, 0).applyMatrix4(cameraMatrix).sub(camera.position).normalize(); // Direita

                // Projeta os vetores no plano XZ (zera o componente Y)
                forward.y = 0;
                right.y = 0;
                forward.normalize();
                right.normalize();

                // Vetor de movimento baseado no deslocamento do mouse
                const moveVector = new THREE.Vector3();
                moveVector
                    .add(forward.clone().multiplyScalar(deltaMove.y * dragSpeed)) // **Invertido: Movimento vertical do mouse => Frente/Trás**
                    .add(right.clone().multiplyScalar(-deltaMove.x * dragSpeed)); // Movimento horizontal do mouse => Esquerda/Direita

                // Atualiza a posição do blockView
                this.blockView.getMesh().position.add(moveVector);

                // Atualiza a câmera (se necessário, para mantê-la sincronizada com o objeto)
                camera.position.add(moveVector);

                // Atualiza o foco da câmera
                this.updateViewCamera();
            }
        });

        // Impede o menu de contexto ao clicar com o botão direito
        window.addEventListener('contextmenu', (event) => {
            event.preventDefault();
        });

        // Evento de rolagem do mouse para controlar o zoom
        window.addEventListener('wheel', (event) => {
            this.camera.zoomMouse(event.deltaY, this.camera.getCenterOfRotation(), 0.05);
        });
    }



    setTeclado() {
        document.body.addEventListener('keydown', (event) => {
            let key = event.key;



            // Ajusta o vetor de movimento com base na tecla pressionada
            if (key === " ") {
                this.blockView.getMesh().position.add(new THREE.Vector3(0, 1, 0));
            }
            if (key === "Shift") {
                this.blockView.getMesh().position.add(new THREE.Vector3(0, -1, 0));

            }


        });
    }



}
