//FEITO POR FELIPE WIELER
//08/12/22
//TRABALHO TECNOLOGIAS NO ENSINO DE MATEMÁTICA A

console.log("Inicio");
var pontos = [];
var p = [];
var lastChoice = 1;
var beforeLastChoice = 3;
var chosen = false;
var salto = 0.5;
var restricao = false;
var qualRestricao = 1;
var definicao = 5;
var id = [];

function escreveDefinicoes(defEsc, qtd) {
    let colors = ['red', 'green', 'blue', 'violet', 'orange', 'purple', 'yellow'];

    textSize(30);
    textFont('Helvetica');
    textStyle(BOLDITALIC);
    stroke(colors[Math.floor(Math.random() * 5)]);

    text("Chaos Game", 700, 25);

    textSize(15);
    textFont('Helvetica');
    stroke("white");


    text("Para criar o fractal os vértices são escolhidos de forma aleatória,", 1075, 100);
    text("após isto é calculada a metade da distância de um ponto inicial até", 1075, 125);
    text("o vértice escolhido, esse processo é repetido até que o fractal", 1075, 150);
    text("esteja completo.", 1075, 175);

    if (defEsc == 1) {
        text("No caso de usar a restrição 1, o que muda é que o ultimo vértice", 1075, 205);
        text("escolhido deve ser diferente do que foi escolhido aleatóriamente agora.", 1075, 230);
    }else if(defEsc == 2){
        text("No caso de usar a restrição 2, o que muda é que o ultimo vértice", 1075, 205);
        text("escolhido e o que foi escolhido aleatóriamente agora não podem ter", 1075, 230);
        text("distância igual a 2.", 1075, 255);
    }
    else if(defEsc == 3){
        text("No caso de usar a restrição 3, o que muda é que o se os dois ultimos", 1075, 205);
        text("vértices escolhidos forem iguais, o vértice escolhido aleatóriamente", 1075, 230);
        text("agora, não pode ser vizinho dos anteriores.", 1075, 255);
    }
    else if(defEsc == 4){
        text("No caso de usar a restrição 4, o que muda é que o vértice escolhido", 1075, 205);
        text("aleatóriamente agora, não pode ser vizinho do vértice escolhido", 1075, 230);
        text("anteriormente.", 1075, 255);
    }

    if(qtd == 3 && (defEsc == 0 || defEsc == 2)){
        textSize(30);
        textFont('Helvetica');
        textStyle(BOLDITALIC);
        stroke(colors[Math.floor(Math.random() * 5)]);
        text("Triangulo de Sierpinski", 300, 50);
    }
    stroke(colors[Math.floor(Math.random() * 5)]);
}

function definirSalto() {
    let val = document.querySelector("#salto").value;
    console.log(val);
    salto = val;
}

function halfway(p1, p2) {
    return [Math.abs((p1[0] + p2[0]) * salto), Math.abs((p1[1] + p2[1]) * salto)];
}

function setup() {
    createCanvas(1800, 1000)
    let colors = ['red', 'green', 'blue', 'violet', 'black'];
    stroke(colors[Math.floor(Math.random() * 5)]);
    strokeWeight(10);
}
setup()

function draw(x, y) {
    point(x, y);
    strokeWeight(definicao);
}

function define() {
    let qtd = document.querySelector("#pontos").value;
    console.log(qtd)
    if (qtd == 3)
        pontos = [[400, 100], [100, 600], [700, 600]];
    else if (qtd == 4)
        pontos = [[50, 50], [50, 750], [750, 750], [750, 50]]
    else if (qtd == 5)
        pontos = [[400, 50], [67, 292], [194, 683], [606, 683], [733, 292]]
    else if (qtd == 6)
        pontos = [[200, 200], [500, 200], [650, 460], [500, 719.6], [200, 719.6], [50, 460]]

    p = pontos[0];

    let rest = document.querySelector("#restricao").value;
    if (rest != 0) {
        restricao = true;
        qualRestricao = rest;
    }

    let def = document.querySelector("#definicao").value;
    definicao = def;

    escreveDefinicoes(rest, qtd);
}

function desenhar() {
    let choice = Math.floor(Math.random() * pontos.length);
    if (restricao) {
        if (qualRestricao == 2) {
            while (Math.abs(choice - lastChoice) == 2) {
                choice = Math.floor(Math.random() * pontos.length);
            }
            lastChoice = choice;
        }
        else if (qualRestricao == 3) {
            if (lastChoice == beforeLastChoice) {
                while (Math.abs(choice - lastChoice) == 1) {
                    choice = Math.floor(Math.random() * pontos.length);
                }
            }
            beforeLastChoice = lastChoice;
            lastChoice = choice;
        }
        else if (qualRestricao == 4 && pontos.length != 3) {
            while (Math.abs(choice - lastChoice) == 1) {
                choice = Math.floor(Math.random() * pontos.length);
            }
            lastChoice = choice;
        }
        else {
            while (lastChoice == choice) {
                choice = Math.floor(Math.random() * pontos.length);
            }
            lastChoice = choice;
        }
    }
    p = halfway(p, pontos[choice]);
    if ((p[0] / 1000) > 1 || (p[1] / 1000) > 1) {
        console.log(Math.floor(p[0] / 1000));
        p[0] -= Math.floor(p[0] / 1000) * 1000;
        p[1] -= Math.floor(p[1] / 1000) * 1000;
    }
    draw(p[0], p[1]);
}

function start() {
    if (!chosen) {
        define();
        chosen = true;
    }
    console.log(pontos);
    id.push(setInterval(desenhar, 10));
}

function reset() {
    background(255);
    chosen = false;
    start();
}

function abrirAtv(){
    document.querySelector(".main").style = "display: block;"
    document.querySelector(".explicacao").style = "display: none;"
}

function abrirExp(){
    document.querySelector(".main").style = "display: none;"
    document.querySelector(".explicacao").style = "display: block;"
    
    id.forEach((x) => clearInterval(x))
    background(255);
    chosen = false;
}