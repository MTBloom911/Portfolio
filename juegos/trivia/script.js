// Elementos del DOM
const elementoPregunta = document.getElementById("question");
const elementoRespuestas = document.getElementById("answers");
const elementoPuntuacion = document.getElementById("score");
const elementoContadorPreguntas = document.getElementById("question-counter");
const elementoEstado = document.getElementById("status");
const botonSiguiente = document.getElementById("next-btn");
const botonReiniciar = document.getElementById("restart-btn");

// Variables del juego
let indicePreguntaActual = 0;
let puntuacion = 0;
let preguntas = [];
let respuestaSeleccionada = false;

// Base de datos de preguntas en español
const preguntasEspanol = [
  {
    question: "¿Cuál es la capital de España?",
    correct_answer: "Madrid",
    incorrect_answers: ["Barcelona", "Sevilla", "Valencia"]
  },
  {
    question: "¿En qué año se descubrió América?",
    correct_answer: "1492",
    incorrect_answers: ["1592", "1392", "1500"]
  },
  {
    question: "¿Cuál es el río más largo del mundo?",
    correct_answer: "Amazonas",
    incorrect_answers: ["Nilo", "Misisipi", "Yangtsé"]
  },
  {
    question: "¿Quién pintó La Mona Lisa?",
    correct_answer: "Leonardo da Vinci",
    incorrect_answers: ["Pablo Picasso", "Vincent van Gogh", "Miguel Ángel"]
  },
  {
    question: "¿Cuál es el planeta más grande del sistema solar?",
    correct_answer: "Júpiter",
    incorrect_answers: ["Saturno", "Neptuno", "Tierra"]
  },
  {
    question: "¿Cuál es el océano más grande?",
    correct_answer: "Océano Pacífico",
    incorrect_answers: ["Océano Atlántico", "Océano Índico", "Océano Ártico"]
  },
  {
    question: "¿Cuál es el hueso más largo del cuerpo humano?",
    correct_answer: "Fémur",
    incorrect_answers: ["Húmero", "Tibia", "Radio"]
  },
  {
    question: "¿Cuál es el elemento químico más abundante en la Tierra?",
    correct_answer: "Oxígeno",
    incorrect_answers: ["Hidrógeno", "Silicio", "Aluminio"]
  },
  {
    question: "¿Quién escribió Don Quijote de la Mancha?",
    correct_answer: "Miguel de Cervantes",
    incorrect_answers: ["Federico García Lorca", "Gabriel García Márquez", "Pablo Neruda"]
  },
  {
    question: "¿Cuál es el país más poblado del mundo?",
    correct_answer: "India",
    incorrect_answers: ["China", "Estados Unidos", "Indonesia"]
  },
  
  // Preguntas sobre series de TV
  {
    question: "¿Cuál es el nombre del protagonista de Breaking Bad?",
    correct_answer: "Walter White",
    incorrect_answers: ["Jesse Pinkman", "Saul Goodman", "Hank Schrader"]
  },
  {
    question: "¿En qué ciudad se desarrolla principalmente la serie La Casa de Papel?",
    correct_answer: "Madrid",
    incorrect_answers: ["Barcelona", "Sevilla", "Valencia"]
  },
  {
    question: "¿Quién es el autor de la saga Canción de Hielo y Fuego, en la que se basa Juego de Tronos?",
    correct_answer: "George R.R. Martin",
    incorrect_answers: ["J.K. Rowling", "J.R.R. Tolkien", "Stephen King"]
  },
  {
    question: "¿Cuál es el nombre del personaje interpretado por Bryan Cranston en Malcolm in the Middle?",
    correct_answer: "Hal",
    incorrect_answers: ["Walter", "Francis", "Reese"]
  },
  {
    question: "¿Qué actor interpreta a Sheldon Cooper en The Big Bang Theory?",
    correct_answer: "Jim Parsons",
    incorrect_answers: ["Johnny Galecki", "Kunal Nayyar", "Simon Helberg"]
  },
  
  // Preguntas sobre dibujos animados
  {
    question: "¿Cómo se llama el perro de Los Simpson?",
    correct_answer: "Ayudante de Santa",
    incorrect_answers: ["Huesos", "Spike", "Brian"]
  },
  {
    question: "¿Cuál es el nombre del protagonista de Dragon Ball?",
    correct_answer: "Goku",
    incorrect_answers: ["Vegeta", "Gohan", "Piccolo"]
  },
  {
    question: "¿Qué personaje de Los Simpson trabaja en la central nuclear?",
    correct_answer: "Homer Simpson",
    incorrect_answers: ["Ned Flanders", "Moe Szyslak", "Barney Gumble"]
  },
  {
    question: "¿Cuál es el nombre del gato de Los Simpson?",
    correct_answer: "Bola de Nieve",
    incorrect_answers: ["Garfield", "Tom", "Félix"]
  },
  {
    question: "¿Quién es el mejor amigo de Bob Esponja?",
    correct_answer: "Patricio Estrella",
    incorrect_answers: ["Calamardo Tentáculos", "Arenita Mejillas", "Don Cangrejo"]
  },
  
  // Preguntas sobre videojuegos
  {
    question: "¿Cuál es el nombre del fontanero protagonista de la saga de Nintendo?",
    correct_answer: "Mario",
    incorrect_answers: ["Luigi", "Wario", "Bowser"]
  },
  {
    question: "¿En qué año se lanzó el primer videojuego de The Legend of Zelda?",
    correct_answer: "1986",
    incorrect_answers: ["1990", "1985", "1988"]
  },
  {
    question: "¿Cuál es el nombre del protagonista de la saga Assassin's Creed II?",
    correct_answer: "Ezio Auditore",
    incorrect_answers: ["Altair Ibn-La'Ahad", "Connor Kenway", "Edward Kenway"]
  },
  {
    question: "¿Qué compañía desarrolló el juego Minecraft?",
    correct_answer: "Mojang",
    incorrect_answers: ["Blizzard", "Electronic Arts", "Ubisoft"]
  },
  {
    question: "¿Cuál es el nombre del protagonista de God of War?",
    correct_answer: "Kratos",
    incorrect_answers: ["Zeus", "Ares", "Poseidón"]
  }
];

// Iniciar juego
iniciarJuego();

// Función para inicializar el juego
async function iniciarJuego() {
  // Reiniciar variables
  indicePreguntaActual = 0;
  puntuacion = 0;
  respuestaSeleccionada = false;
  
  // Actualizar contadores
  elementoPuntuacion.textContent = puntuacion;
  elementoEstado.textContent = "";
  botonSiguiente.style.display = "none";
  
  // Cargar preguntas
  await cargarPreguntas();
  
  // Mostrar primera pregunta
  if (preguntas.length > 0) {
    mostrarPregunta(indicePreguntaActual);
  }
}

// Función para cargar preguntas
async function cargarPreguntas() {
  // Simplemente usamos nuestra base de datos ampliada
  preguntas = [...preguntasEspanol];
  
  // Mezclar las preguntas para que aparezcan en orden aleatorio
  mezclarArray(preguntas);
  
  // Limitar a 10 preguntas por juego
  preguntas = preguntas.slice(0, 10);
  
  elementoContadorPreguntas.textContent = `1/${preguntas.length}`;
  elementoEstado.textContent = "";
}

// Función para mostrar una pregunta
function mostrarPregunta(indice) {
  if (indice >= preguntas.length) {
    finalizarJuego();
    return;
  }
  
  // Actualizar contador de preguntas
  elementoContadorPreguntas.textContent = `${indice + 1}/${preguntas.length}`;
  
  // Obtener pregunta actual
  const pregunta = preguntas[indice];
  
  // Mostrar pregunta
  elementoPregunta.innerHTML = decodificarHTML(pregunta.question);
  
  // Limpiar respuestas anteriores
  elementoRespuestas.innerHTML = "";
  
  // Mezclar respuestas
  const respuestas = [...pregunta.incorrect_answers, pregunta.correct_answer];
  mezclarArray(respuestas);
  
  // Crear botones de respuesta
  respuestas.forEach(respuesta => {
    const boton = document.createElement("button");
    boton.classList.add("answer-btn");
    boton.innerHTML = decodificarHTML(respuesta);
    boton.addEventListener("click", () => comprobarRespuesta(respuesta, pregunta.correct_answer));
    elementoRespuestas.appendChild(boton);
  });
  
  // Reiniciar estado
  respuestaSeleccionada = false;
  botonSiguiente.style.display = "none";
}

// Función para comprobar respuesta
function comprobarRespuesta(respuestaUsuario, respuestaCorrecta) {
  // Evitar seleccionar múltiples respuestas
  if (respuestaSeleccionada) return;
  
  respuestaSeleccionada = true;
  const botones = elementoRespuestas.querySelectorAll(".answer-btn");
  
  // Marcar respuestas correctas e incorrectas
  botones.forEach(boton => {
    boton.disabled = true;
    
    if (boton.innerHTML === decodificarHTML(respuestaCorrecta)) {
      boton.classList.add("correct");
    } else if (boton.innerHTML === decodificarHTML(respuestaUsuario)) {
      boton.classList.add("incorrect");
    }
  });
  
  // Actualizar puntuación
  if (decodificarHTML(respuestaUsuario) === decodificarHTML(respuestaCorrecta)) {
    puntuacion++;
    elementoPuntuacion.textContent = puntuacion;
    elementoEstado.textContent = "¡Correcto! 🎉";
  } else {
    elementoEstado.textContent = "Incorrecto 😕";
  }
  
  // Mostrar botón para siguiente pregunta
  botonSiguiente.style.display = "inline-block";
}

// Función para pasar a la siguiente pregunta
function siguientePregunta() {
  indicePreguntaActual++;
  
  if (indicePreguntaActual < preguntas.length) {
    mostrarPregunta(indicePreguntaActual);
    elementoEstado.textContent = "";
  } else {
    finalizarJuego();
  }
}

// Función para finalizar el juego
function finalizarJuego() {
  // Limpiar el contenedor de preguntas
  elementoPregunta.textContent = "";
  elementoRespuestas.innerHTML = "";
  
  // Crear un contenedor para el resultado final
  const contenedorResultado = document.createElement("div");
  contenedorResultado.classList.add("result-container");
  
  // Determinar el mensaje y emoticono según la puntuación
  let mensaje, emoji, claseResultado;
  
  if (puntuacion === preguntas.length) {
    mensaje = "¡Perfecto! Has acertado todas las preguntas.";
    emoji = "🏆";
    claseResultado = "perfect-score";
  } else if (puntuacion >= preguntas.length / 2) {
    mensaje = "¡Buen trabajo! Has demostrado tener buenos conocimientos.";
    emoji = "🎉";
    claseResultado = "good-score";
  } else {
    mensaje = "Gracias por jugar. ¡Inténtalo de nuevo para mejorar tu puntuación!";
    emoji = "🤔";
    claseResultado = "low-score";
  }
  
  // Crear elementos para mostrar el resultado
  const mostrarPuntuacion = document.createElement("div");
  mostrarPuntuacion.classList.add("final-score");
  mostrarPuntuacion.innerHTML = `
    <span class="emoji">${emoji}</span>
    <h2>Puntuación final</h2>
    <div class="score-number ${claseResultado}">${puntuacion}/${preguntas.length}</div>
  `;
  
  const mostrarMensaje = document.createElement("p");
  mostrarMensaje.classList.add("final-message");
  mostrarMensaje.textContent = mensaje;
  
  // Añadir elementos al contenedor
  contenedorResultado.appendChild(mostrarPuntuacion);
  contenedorResultado.appendChild(mostrarMensaje);
  
  // Reemplazar el contenido del contenedor de preguntas
  elementoPregunta.parentNode.appendChild(contenedorResultado);
  
  // Ocultar el botón de siguiente pregunta
  botonSiguiente.style.display = "none";
  
  // Mostrar el botón de reiniciar con estilo destacado
  botonReiniciar.classList.add("highlight");
  
  // Actualizar el mensaje de estado
  elementoEstado.textContent = "";
}

// Función para decodificar entidades HTML
function decodificarHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

// Función para mezclar un array
function mezclarArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Event listeners
botonSiguiente.addEventListener("click", siguientePregunta);
botonReiniciar.addEventListener("click", iniciarJuego);