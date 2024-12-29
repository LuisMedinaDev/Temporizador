const botonPlay = document.querySelector('.play');
const botonReiniciar = document.querySelector('.reiniciar');
const temporizador = document.querySelector('.temporizador');
const fullscreenButton = document.getElementById('fullscreenButton');

// Estados
let isPlaying = false;
let intervalId = null;
temporizador.value = '00:00';

// Función para formatear el valor del temporizador
function formatTimeInput(value) {
    let cleanValue = value.replace(/[^0-9]/g, '').padStart(4, '0').slice(-4);
    const minutos = cleanValue.slice(0, 2);
    const segundos = cleanValue.slice(2);
    return `${minutos}:${segundos}`;
}

// Actualizar temporizador al escribir
temporizador.addEventListener('input', () => {
    temporizador.value = formatTimeInput(temporizador.value);
});

function togglePlay() {
    botonReiniciar.style.display = 'block';

    if (temporizador.value === '00:00') {
        resetTimer();
    }

    if (isPlaying) {
        pauseTimer();
    } else {
        startTimer();
    }

    isPlaying = !isPlaying;
}

function resetTimer() {
    clearInterval(intervalId);
    isPlaying = false;
    botonPlay.innerText = '▶';
    botonReiniciar.style.display = 'none';
    temporizador.value = '00:00';
}

function startTimer() {
    botonPlay.innerText = '⏸';
    restoreColors();

    intervalId = setInterval(() => {
        let [minutos, segundos] = temporizador.value.split(':').map(Number);

        if (minutos === 0 && segundos === 0) {
            resetTimer();
            return;
        }

        if (segundos === 0) {
            minutos--;
            segundos = 59;
        } else {
            segundos--;
        }

        temporizador.value = `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
    }, 1000);
}

function pauseTimer() {
    clearInterval(intervalId);
    botonPlay.innerText = '▶';
    applyPauseColors();
}

function applyPauseColors() {
    document.body.classList.add('pausaColorBody');
    document.querySelector('.contenedor').classList.add('pausaColorContenedor');
    document.querySelectorAll('.boton').forEach(boton => boton.classList.add('pausaColorBoton'));
    document.querySelector('.name').classList.add('pausaColorBoton');
    document.querySelector('.contenido').classList.add('pausaColorContenido');
    document.querySelector('.p-completa').classList.add('pausaColor-p-completa');
    document.querySelector('.temporizador').classList.add('pausaColorTemporizador');
}

function restoreColors() {
    document.body.classList.remove('pausaColorBody');
    document.querySelector('.contenedor').classList.remove('pausaColorContenedor');
    document.querySelectorAll('.boton').forEach(boton => boton.classList.remove('pausaColorBoton'));
    document.querySelector('.name').classList.remove('pausaColorBoton');
    document.querySelector('.contenido').classList.remove('pausaColorContenido');
    document.querySelector('.p-completa').classList.remove('pausaColor-p-completa');
    document.querySelector('.temporizador').classList.remove('pausaColorTemporizador');
}

fullscreenButton.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen?.();
    } else {
        document.exitFullscreen?.();
    }
});

botonPlay.addEventListener('click', togglePlay);
botonReiniciar.addEventListener('click', resetTimer);
