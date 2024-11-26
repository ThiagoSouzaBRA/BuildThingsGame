class mainScene extends SceneCreator {
    constructor(id, screen) {

        //Camera desta cena especifica
        const newCamera = new Camera(screen.offsetWidth, screen.offsetHeight)
        // camera.getMesh().position.set(0, 5, 10); // Ajuste conforme necessário
        newCamera.setPosition(0, 10, 10)
        newCamera.getMesh().lookAt(0, 0, 0); // Garante que a câmera está olhando para o centro da cena
        newCamera.setFov(100)

        super(id, screen, newCamera)


        this.cena.background = new THREE.Color(Colors.CORAL); // Altera para vermelho

        /////ELEMENTOS NA CENA

        this.light = new Light()
        this.adicionarNaCena(this.light)


        const x = 16; // Dimensão 1
        const y = 1; // Dimensão 2
        const z = 16; // Dimensão 3
        // Criando a matriz 3D
        this.matriz3D = new Array(x);
        for (let i = 0; i < x; i++) {
            this.matriz3D[i] = new Array(y);
            for (let j = 0; j < y; j++) {
                this.matriz3D[i][j] = new Array(z);
                for (let k = 0; k < z; k++) {
                    // Criar o cubo na posição (i, j, k)
                    let cubo = new Cube(i * 1.02, j * 1.02, k * 1.02);

                    // Definir cor (opcional)
                    cubo.setColor(Colors.CYAN); // Altere a cor conforme necessário

                    // Adicionar à matriz
                    this.matriz3D[i][j][k] = cubo;

                    // Adicionar à cena
                    this.adicionarNaCena(cubo);
                }
            }
        }

        //Bloco Referencia para visualização da camera
        this.blockView = new Cube(1 * 1.02, 1 * 1.02, 1 * 1.02);
        this.adicionarNaCena(this.blockView);
        this.setCameraPoint(this.blockView)

        this.mouseSetup()
        this.tecladoSetup()
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

    setCameraPoint(object) {
        if (!object) {
            log("Não foi possível identificar o objeto de foco da camera!")
            return
        }
        this.centerOfRotation = object.getPositionVector3();
        this.camera.getMesh().lookAt(this.centerOfRotation);
        this.camera.getMesh().updateProjectionMatrix();
    }

    updateViewCamera(){
      
        this.centerOfRotation = this.blockView.getPositionVector3()
        this.camera.getMesh().lookAt(this.centerOfRotation);
        this.camera.getMesh().updateProjectionMatrix();
    }

    mouseSetup() {
        let isDragging = false; // Flag para detectar se o mouse está arrastando
        let isRightButton = false; // Detecta se o botão direito está pressionado
        let previousMousePosition = { x: 0, y: 0 }; // Última posição do mouse

        // Sensibilidade do movimento
        const rotationSpeed = 0.005;
        const cameraDistance = 100; 

        window.addEventListener('click', (event) => {
            // Intersecta com os objetos da cena
            const objectClass = this.getIntersectObjectClassByMouse(event)

            if (objectClass) {
                const objetoClicado = objectClass.getMesh();

                if (objetoClicado.customID === "Cube") {
                    objetoClicado.material.color.set(Colors.GOLD)
                    // cenaAtual.removerDaCena(objectClass)
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
                this.centerOfRotation = this.blockView.getPositionVector3();
                // Calcular a direção da rotação em torno do ponto fixo
                const direction = new THREE.Vector3();
                direction.copy(camera.position).sub(this.centerOfRotation); // Direção da câmera em relação ao centro

                // Converte a posição da câmera para coordenadas esféricas
                const spherical = new THREE.Spherical();
                spherical.setFromVector3(direction);

                // Ajuste os ângulos de rotação com base no movimento do mouse
                spherical.theta -= deltaMove.x * rotationSpeed; // Rotação horizontal
                spherical.phi -= deltaMove.y * rotationSpeed;   // Rotação vertical

                // Limitar a rotação vertical para não inverter a câmera
                spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi));

                // Atualiza a posição da câmera com base na rotação
                camera.position.copy(this.centerOfRotation).add(new THREE.Vector3().setFromSpherical(spherical));

                // Mantém a câmera apontando para o centro da rotação (bloco [0][0][0])
                camera.lookAt(this.centerOfRotation);
            }
        });

        // Impede o menu de contexto ao clicar com o botão direito
        window.addEventListener('contextmenu', (event) => {
            event.preventDefault();
        });
    }

    tecladoSetup() {
        //movimentação
        document.body.addEventListener('keypress', (event) => {
            let key = event.key

            //Horizontal
            if (key == "a") {
                this.blockView.addForce(-1, null, 0)
            }

            if (key == "d") {
                this.blockView.addForce(1, null, 0)
            }

            //Vertical
            if (key == "s") {
                this.blockView.addForce(null, null, 1)
            }

            if (key == "w") {
                this.blockView.addForce(null, null, -1)
            }
        })
    }




}
