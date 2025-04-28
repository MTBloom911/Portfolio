const tablero = document.getElementById("game-board");
const textoEstado = document.getElementById("status");
const contadorIntentos = document.getElementById("attempts");
const contadorTiempo = document.getElementById("timer");
const iconos = ["🍎", "🍌", "🍒", "🍇", "🍉", "🍋", "🍓", "🥝"];
let cartas = iconos.concat(iconos); // Duplicar para pares
let cartasVolteadas = [];
let parejasEncontradas = 0;
let intentos = 0;
let tiempoTranscurrido = 0;
let temporizador;
let juegoIniciado = false;

// Mezclar las cartas
cartas.sort(() => 0.5 - Math.random());

// Crear las tarjetas
cartas.forEach((icono, indice) => {
  const carta = document.createElement("div");
  carta.classList.add("card");
  carta.dataset.icono = icono;
  carta.dataset.indice = indice;
  carta.textContent = "";
  tablero.appendChild(carta);
});

// Iniciar temporizador
function iniciarTemporizador() {
  if (!juegoIniciado) {
    juegoIniciado = true;
    temporizador = setInterval(() => {
      tiempoTranscurrido++;
      actualizarTiempo();
    }, 1000);
  }
}

// Actualizar el tiempo mostrado
function actualizarTiempo() {
  const minutos = Math.floor(tiempoTranscurrido / 60).toString().padStart(2, '0');
  const segundos = (tiempoTranscurrido % 60).toString().padStart(2, '0');
  contadorTiempo.textContent = `${minutos}:${segundos}`;
}

// Reiniciar juego
document.getElementById("restart-btn").addEventListener("click", () => {
  location.reload();
});

tablero.addEventListener("click", (e) => {
  const cartaClickeada = e.target;
  if (!cartaClickeada.classList.contains("card") || cartaClickeada.classList.contains("flipped")) return;
  if (cartasVolteadas.length === 2) return;

  // Iniciar temporizador en el primer clic
  iniciarTemporizador();

  const icono = cartaClickeada.dataset.icono;
  cartaClickeada.textContent = icono;
  cartaClickeada.classList.add("flipped");
  cartasVolteadas.push(cartaClickeada);

  if (cartasVolteadas.length === 2) {
    const [primera, segunda] = cartasVolteadas;
    
    // Incrementar contador de intentos
    intentos++;
    contadorIntentos.textContent = intentos;
    
    if (primera.dataset.icono === segunda.dataset.icono) {
      parejasEncontradas += 1;
      
      // Marcar las cartas como emparejadas
      primera.classList.add("matched");
      segunda.classList.add("matched");
      
      cartasVolteadas = [];
      
      // Verificar si el juego ha terminado
      if (parejasEncontradas === iconos.length) {
        clearInterval(temporizador);
        
        // Mostrar mensaje de victoria con estadísticas
        setTimeout(() => {
          const mensajeVictoria = document.createElement("div");
          mensajeVictoria.classList.add("win-message");
          mensajeVictoria.innerHTML = `
            <h2>¡Felicidades! 🎉</h2>
            <p>Has encontrado todas las parejas</p>
            <p>Intentos: ${intentos}</p>
            <p>Tiempo: ${contadorTiempo.textContent}</p>
            <button id="reiniciar-btn" class="restart-button">Reiniciar Juego</button>
          `;
          
          document.querySelector(".game-container").appendChild(mensajeVictoria);
          
          document.getElementById("reiniciar-btn").addEventListener("click", () => {
            location.reload();
          });
        }, 500);
      }
    } else {
      setTimeout(() => {
        primera.textContent = "";
        segunda.textContent = "";
        primera.classList.remove("flipped");
        segunda.classList.remove("flipped");
        cartasVolteadas = [];
      }, 800);
    }
  }
});
