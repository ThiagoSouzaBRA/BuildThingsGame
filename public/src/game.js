
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


