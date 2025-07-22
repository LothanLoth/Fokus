const html = document.querySelector('html');

const focoBT = document.querySelector('.app__card-button--foco');
const curtoBT = document.querySelector('.app__card-button--curto');
const longoBT = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const texto = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBT = document.querySelector('#start-pause');
const iniciarOuPausarBT = document.querySelector('#start-pause span');
const imgBT = document.querySelector('.app__card-primary-butto-icon');

const tempoNaTela = document.querySelector('#timer');

const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio("./sons/luna-rise-part-one.mp3");

const pauseSound = new Audio("./sons/pause.mp3");
const playSound = new Audio("./sons/play.wav");
const beepSound = new Audio("./sons/beep.mp3");

let tempoDecorridoEmSegundos = 1500;
let intervaloID;

let isPaused = true;

musicaFocoInput.addEventListener('change', () => {

    if (musica.paused) {
        musica.play();
        musica.loop = true;
    } else {
        musica.pause();
    }

})

focoBT.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    AlterarContexto('foco')
    focoBT.classList.add('active');

})

curtoBT.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    AlterarContexto('descanso-curto')
    curtoBT.classList.add('active');

})

longoBT.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    AlterarContexto('descanso-longo')
    longoBT.classList.add('active');
})

function AlterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach((contexto) => {
        contexto.classList.remove('active');
    });


    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);

    switch (contexto) {
        case 'foco':
            texto.innerHTML = 'Otimize sua prioridade, <strong class = "app__title-strong"> mergulhe no que importa!</strong> ';
            break;
        case 'descanso-curto':
            texto.innerHTML = 'Que tal dar uma respirada? <strong class = "app__title-strong"> faça uma pausa curta</strong>';
            break;
        case 'descanso-longo':
            texto.innerHTML = 'Hora de voltar a superficie <strong class = "app__title-strong"> faça uma pausa longa</strong>';
            break;
        default:
            texto.innerHTML = 'Fokus';
            break;
    }
}

const contagemRegressiva = () => {

    if (tempoDecorridoEmSegundos <= 0) {
        Zerar();
        beepSound.play();
        return;
    }

    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

startPauseBT.addEventListener('click', () => {
    iniciarOuPausar();

    isPaused = !isPaused;
    if (isPaused) {

        pauseSound.play();
    } else {
        playSound.play();
    }

});

function iniciarOuPausar() {
    if (intervaloID) {
        Zerar();
        return;
    }
    intervaloID = setInterval(contagemRegressiva, 1000);
    
    iniciarOuPausarBT.textContent = 'Pausar';
    imgBT.setAttribute('src', '/imagens/pause.png');
}

function Zerar() {
    clearInterval(intervaloID);
    iniciarOuPausarBT.textContent = 'Começar';
    imgBT.setAttribute('src', '/imagens/play_arrow.png');

    intervaloID = null;
}

function mostrarTempo()
{
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleString('pr-br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`; 
}

mostrarTempo();