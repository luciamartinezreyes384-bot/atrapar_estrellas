document.addEventListener('DOMContentLoaded', () => {
    // Elementos
    const zonaJuego = document.getElementById('zonaJuego');
    const jugador = document.getElementById('jugador');
    const estrella = document.getElementById('estrella');
    const mensajeFinal = document.getElementById('mensajeFinal');
    const spanPuntos = document.getElementById('puntos');
    const btnIniciar = document.getElementById('btnIniciar');
    const btnReiniciar = document.getElementById('btnReiniciar');

    // Variables
    let puntos = 0;
    let juegoActivo = false;
    let posJugador = 50; // % de posición
    let anchoZona = zonaJuego.clientWidth;
    let intervaloCaida;

    // Controles teclado
    document.addEventListener('keydown', (e) => {
        if (!juegoActivo) return;

        if (e.key === 'ArrowLeft' && posJugador > 5) {
            posJugador -= 6;
            jugador.style.left = `${posJugador}%`;
        }
        if (e.key === 'ArrowRight' && posJugador < 95) {
            posJugador += 6;
            jugador.style.left = `${posJugador}%`;
        }
    });

    // Detectar colisión
    function verificarColision() {
        const posEstrella = estrella.offsetTop;
        const rangoEstrella = estrella.offsetLeft;
        const rangoJugador = jugador.offsetLeft;

        // Si la estrella llega abajo y está alineada con el jugador
        if (posEstrella > 340 && Math.abs(rangoEstrella - rangoJugador) < 40) {
            puntos++;
            spanPuntos.textContent = puntos;
            nuevaEstrella();
        }

        // Si se cae sin atrapar
        if (posEstrella > 370) {
            finDelJuego();
        }
    }

    // Nueva estrella en posición aleatoria
    function nuevaEstrella() {
        estrella.style.display = 'block';
        estrella.style.left = `${Math.floor(Math.random() * 90)+5}%`;
        estrella.style.top = '0px';
        estrella.style.animation = 'ninguna';
        setTimeout(() => {
            estrella.style.animation = 'caer 2.5s linear infinite';
        }, 10);
    }

    // Iniciar
    btnIniciar.addEventListener('click', () => {
        if (juegoActivo) return;
        juegoActivo = true;
        puntos = 0;
        spanPuntos.textContent = puntos;
        mensajeFinal.style.display = 'none';
        nuevaEstrella();

        intervaloCaida = setInterval(() => {
            verificarColision();
        }, 50);
    });

    // Fin del juego
    function finDelJuego() {
        juegoActivo = false;
        clearInterval(intervaloCaida);
        estrella.style.display = 'none';
        mensajeFinal.textContent = `¡Fin! Puntos: ${puntos}`;
        mensajeFinal.style.display = 'block';
    }

    // Reiniciar
    btnReiniciar.addEventListener('click', () => {
        juegoActivo = false;
        clearInterval(intervaloCaida);
        puntos = 0;
        spanPuntos.textContent = puntos;
        posJugador = 50;
        jugador.style.left = `${posJugador}%`;
        estrella.style.display = 'none';
        mensajeFinal.style.display = 'none';
    });
});
