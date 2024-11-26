class mainScene extends SceneCreator {
    constructor(id, screen) {

        //Camera desta cena especifica
        const camera = new Camera(screen.offsetWidth, screen.offsetHeight)
        // camera.getObject().position.set(0, 5, 10); // Ajuste conforme necessário
        camera.setPosition(0, 5, 10)
        camera.getObject().lookAt(0, 0, 0); // Garante que a câmera está olhando para o centro da cena

        super(id, screen, camera)

        ////////////////ELEMENTOS NA CENA

        this.light = new Light()
        this.adicionarNaCena(this.light.getObject())


        const x = 8; // Dimensão 1
        const y = 8; // Dimensão 2
        const z = 8; // Dimensão 3

        // Criando a matriz 3D
        let matriz3D = new Array(x);
        for (let i = 0; i < x; i++) {
            matriz3D[i] = new Array(y);
            for (let j = 0; j < y; j++) {
                matriz3D[i][j] = new Array(z);
                for (let k = 0; k < z; k++) {
                    // Criar o cubo na posição (i, j, k)
                    let cubo = new Cube(i * 1.02, j * 1.02, k * 1.02);

                    // Definir cor (opcional)
                    cubo.setColor(Colors.CYAN); // Altere a cor conforme necessário

                    // Adicionar à matriz
                    matriz3D[i][j][k] = cubo;

                    // Adicionar à cena
                    this.adicionarNaCena(cubo.getObject());
                }
            }
        }

        // this.blocos = []
        // for(let i = 0; i < 10; i++){
        //     let bloco = new Cube(i*1.05, 0, 0);
        //     bloco.setColor(Colors.CYAN)
        //     this.adicionarNaCena(bloco.getObject())
        //     this.blocos.push(bloco)    
        // }

        // this.bloco1 = new Cube(0, 0, 0);
        // this.bloco1.setColor(Colors.CYAN)
        // this.adicionarNaCena(this.bloco1.getObject())

        // this.bloco2 = new Cube(1, 1, 1)
        // this.bloco2.setColor(Colors.RED)
        // this.adicionarNaCena(this.bloco2.getObject())

        // this.plane = new Plane(10,10)
        // this.plane.getObject().rotation.x = -Math.PI / 2; // Alinha o plano no eixo X
        // this.plane.getObject().position.y = -1; // Abaixo do cubo
        // this.plane.getObject().position.x = 1;
        // this.plane.receiveShadow = true; // Permite que receba sombra
        // this.adicionarNaCena(this.plane.getObject());
        ////////////////////////////////////

    }

    //Atualiza objetos
    update() {

    }

    //Desenha a Cena
    draw() {
        this.update()

        this.renderer.render(this.cena, this.camera.getObject());
    }





}
