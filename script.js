const cubo = document.getElementById('cubo');
const pantallaReto = document.getElementById('pantallaReto');
const btnLanzar = document.getElementById('btnLanzar');

// Mapeo de desafíos técnicos para resolver en Google Colab
const retosPython = {
    1: ">>> Desafío 1: Usa la función print() para mostrar en pantalla tu nombre y tu superpoder favorito. 💬",
    2: ">>> Desafío 2: Crea tres variables diferentes: una para tu nombre, otra para tu edad y otra para tu color favorito. ¡Imprímelas todas! 🪙",
    3: ">>> Desafío 3: Usa input() para preguntarle al usuario cómo se llama y luego imprimi un saludo personalizado que diga '¡Hola, [nombre]!'. ⌨️",
    4: ">>> Desafío 4: Crea un programa que compare dos números usando 'if' y 'else', e imprima cuál de los dos números es el más grande. ⚖️",
    5: ">>> Desafío 5: Diseña un bucle (for o while) que imprima los números del 1 al 10 seguidos, simulando un despegue espacial. 🔄",
    6: ">>> Desafío 6: ¡Código libre en el cuaderno! Escribe el script que tú quieras usando lo aprendido hoy. ✨"
};

// Ángulos de orientación de las caras en el espacio tridimensional
const rotacionesCaras = {
    1: { x: 0,   y: 0 },       
    2: { x: 0,   y: 180 },     
    3: { x: 0,   y: 90 },      
    4: { x: 0,   y: -90 },     
    5: { x: -90, y: 0 },       
    6: { x: 90,  y: 0 }        
};

// --- Sintetizador de Audio: Efectos de sonido estilo terminal digital ---
function reproducirAudioPython(numeroCara) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    
    const oscilador = ctx.createOscillator();
    const ganancia = ctx.createGain();
    
    oscilador.connect(ganancia);
    ganancia.connect(ctx.destination);
    
    const instante = ctx.currentTime;
    
    switch(numeroCara) {
        case 1: // Sonido de escritura rápida / Click exitoso
            oscilador.type = 'sine';
            oscilador.frequency.setValueAtTime(600, instante);
            ganancia.gain.setValueAtTime(0.2, instante);
            ganancia.gain.exponentialRampToValueAtTime(0.01, instante + 0.15);
            oscilador.start(instante);
            oscilador.stop(instante + 0.15);
            break;
            
        case 2: // Sonido de asignación de datos (Doble pulso rápido)
            oscilador.type = 'triangle';
            oscilador.frequency.setValueAtTime(400, instante);
            oscilador.frequency.setValueAtTime(500, instante + 0.08);
            ganancia.gain.setValueAtTime(0.25, instante);
            ganancia.gain.exponentialRampToValueAtTime(0.01, instante + 0.2);
            oscilador.start(instante);
            oscilador.stop(instante + 0.2);
            break;
            
        case 3: // Sonido de Entrada de Teclado (Frecuencia subiendo rápido)
            oscilador.type = 'sine';
            oscilador.frequency.setValueAtTime(300, instante);
            oscilador.frequency.linearRampToValueAtTime(700, instante + 0.25);
            ganancia.gain.setValueAtTime(0.2, instante);
            ganancia.gain.exponentialRampToValueAtTime(0.01, instante + 0.25);
            oscilador.start(instante);
            oscilador.stop(instante + 0.25);
            break;
            
        case 4: // Sonido de toma de decisiones Condicional (Bifurcación de tonos)
            oscilador.type = 'square';
            oscilador.frequency.setValueAtTime(440, instante);
            oscilador.frequency.setValueAtTime(330, instante + 0.15);
            ganancia.gain.setValueAtTime(0.1, instante);
            ganancia.gain.exponentialRampToValueAtTime(0.01, instante + 0.35);
            oscilador.start(instante);
            oscilador.stop(instante + 0.35);
            break;
            
        case 5: // Sonido de bucle / iterativo continuo (Efecto loop digital de bytes)
            oscilador.type = 'square';
            oscilador.frequency.setValueAtTime(150, instante);
            oscilador.frequency.linearRampToValueAtTime(600, instante + 0.4);
            ganancia.gain.setValueAtTime(0.08, instante);
            ganancia.gain.exponentialRampToValueAtTime(0.01, instante + 0.4);
            oscilador.start(instante);
            oscilador.stop(instante + 0.4);
            break;
            
        case 6: // Fanfarria digital de Reto Completado con Éxito
            oscilador.type = 'sine';
            oscilador.frequency.setValueAtTime(523.25, instante); // Nota Do5
            oscilador.frequency.setValueAtTime(659.25, instante + 0.12); // Nota Mi5
            oscilador.frequency.setValueAtTime(783.99, instante + 0.24); // Nota Sol5
            ganancia.gain.setValueAtTime(0.25, instante);
            ganancia.gain.exponentialRampToValueAtTime(0.01, instante + 0.5);
            oscilador.start(instante);
            oscilador.stop(instante + 0.5);
            break;
    }
}

function lanzarDado() {
    btnLanzar.disabled = true;
    pantallaReto.innerText = ">>> [INFO] Ejecutando algoritmo de selección aleatoria...";

    const caraGanadora = Math.floor(Math.random() * 6) + 1;

    // Múltiples vueltas aleatorias completas para simular fuerza física al tirar el dado
    const vueltasX = (Math.floor(Math.random() * 3) + 3) * 360;
    const vueltasY = (Math.floor(Math.random() * 3) + 3) * 360;

    const anguloFinalX = rotacionesCaras[caraGanadora].x + vueltasX;
    const anguloFinalY = rotacionesCaras[caraGanadora].y + vueltasY;

    // Aplicamos la animación 3D en el CSS
    cubo.style.transform = `rotateX(${anguloFinalX}deg) rotateY(${anguloFinalY}deg)`;

    // Al terminar los 3 segundos de rotación, desplegamos la instrucción y reproducimos el sonido
    setTimeout(() => {
        pantallaReto.innerText = retosPython[caraGanadora];
        reproducirAudioPython(caraGanadora);
        btnLanzar.disabled = false;
    }, 3000);
}
