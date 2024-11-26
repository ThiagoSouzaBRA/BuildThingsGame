
let running = true;
let fps = 60
let listaCenas = []
let cenaAtual = null;

listaCenas.push(new mainScene("Primeira Cena", document.getElementById("tela")))

cenaAtual = listaCenas[0]

function start(){
    if(running) return
    running = true;
}

function stop(){
    if(!running) return
    running = false;
}

function update(){
    if(running){
        cenaAtual.update();
        cenaAtual.draw();     
    }
}

setInterval(() => {
    if(!running) return;
    update()
}, 1000 / fps);


//movimentação

let x=0, y=5, z=10;
document.getElementById("camX").addEventListener('input', (event)=> {
    x = event.target.value/10
    cenaAtual.camera.setPosition( x, y, z)
})
document.getElementById("camY").addEventListener('input', (event)=> {
    y = event.target.value/10
    cenaAtual.camera.setPosition( x, y, z)
})
document.getElementById("camZ").addEventListener('input', (event)=> {
    z = event.target.value/10
    cenaAtual.camera.setPosition( x, y, z)
})

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(); // Para armazenar as coordenadas do mouse


window.addEventListener('click', (event) => {
    const rect = cenaAtual.renderer.domElement.getBoundingClientRect(); // Tamanho e posição do canvas

    // Converte as coordenadas do mouse para o espaço normalizado (-1 a 1)
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // Atualiza o raycaster com a posição da câmera
    raycaster.setFromCamera(mouse, cenaAtual.camera.getObject());

    // Intersecta com os objetos da cena
    const intersects = raycaster.intersectObjects(cenaAtual.cena.children, true);

    if (intersects.length > 0) {
        const objetoClicado = intersects[0].object;

        if (objetoClicado.customID === "Cube") {
            console.log("Cubo clicado:", objetoClicado);
        }
    }
});

