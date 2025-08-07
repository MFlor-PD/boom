//Pongo un numero + enter => comienza cuenta regresiva. ADDEVENTLISTENER TECLADO EVENT
//Inicia de 5" a 0" => en cero mostrar el rtdo (compara mi numero con el random). ASINCRONIA
//Funcion de nuemero aleatorio. RANDOM MATH
//Condicional => numero random: === al mio un resultado, != al mio otro. CONDICIONAL
//Boton reiniciar juego. ADDEVENTLISTENER CLEAR EVENT C/ CLEAR STORAGE.
//agregar 2 div con rtdo 1 div-"¡Has salvado el mundo!" o "La bomba ha estallado" y el otro div-tu numero3 igual que pc, CONDICIONAL

/*## Pistas
- Puedes usar `setTimeout()` para generar la asincronía de 5 segundos
- Puedes usar `setInterval()` para generar el contador de 5 segundos (recuerda que es del 5 al 0, por tanto el intervalo debería ser uno más) 5, 4, 3, 2, 1, 0 ...
- Usa promesas para una vez pasado ese tiempo devuelva el resultado y puedas trabajar con él
- Crea un botón de reinicio del juego voviendo a iniciar la función inicial o reiniciando la página al pulsarlo.*/

// 1 configure el evento del teclado
// 2 configure a parte la f() random number
// 3 arme condicion si el random number era == o no a mi eleccion
// 4 setee el Timeout
// 5 puse todo dentro del timeout.
// 6 puse TODO dentro del evento.
// 7 Configure el contenido de la jugada en el DOM.
// 8 Me dedique al cuenta regresiva.

//ME GUSTARIA QUE : AL PRESIONAR RESTAR, LA CUENTA ATRAS SE DETENGA Y ME DEJE CAMBIAR LOS VALORES
//               Y: QUE AL ELEGIR UN NNUMERO NUEVO LA PANTALLA SE REINICE;

const userInput = document.getElementById("userInput");
const divResult = document.getElementById("result");
let countDown = document.getElementById("countdown");
const restarBtn = document.getElementById("restart");
const bombIcon = document.querySelector(".bomb-icon");

let countdownInterval;
let isGameActive = false;

function restartplayed() {
    clearInterval(countdownInterval);
    isGameActive = false;
    divResult.innerHTML = "";
    divResult.classList.remove("show");
    userInput.value = "";
    countDown.textContent = "Cuenta atrás: 5 segundos";
    countDown.style.display = "none";
    bombIcon.textContent = "💣";
    bombIcon.classList.remove("explosion", "success-animation");
    userInput.disabled = false;
    userInput.focus();
}

// Initialize game state
countDown.textContent = "Cuenta atrás: 5 segundos";
countDown.style.display = "none";

userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !isGameActive) {
        let userPlayed = parseInt(userInput.value);
        
        if (userPlayed >= 1 && userPlayed <= 3) {
            isGameActive = true;
            userInput.disabled = true;
            countDown.style.display = "block";
            
            // Add bomb animation
            bombIcon.style.animation = "bounce 0.5s ease-in-out";
            
            let intervalId = iniciarContador(5, countDown, () => {
                let randomNumb = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
                
                let succesTemplate = `
                <div>
                <h2 class="success">🎉 ¡Has salvado el mundo! 🎉</h2>
                <p class="success1">Tu número ${userPlayed} coincide con el número ${randomNumb}</p>
                <p style="font-size: 0.9rem; color: #00ff88; margin-top: 10px;">¡La bomba ha sido desactivada!</p>
                </div>`;
                
                let failedTemplate = `
                <div>
                <h2 class="failed">💥 ¡La bomba ha estallado! 💥</h2>
                <p class="failed1">Tu número ${userPlayed} NO coincide con el número ${randomNumb}</p>
                <p style="font-size: 0.9rem; color: #ff4757; margin-top: 10px;">El mundo ha sido destruido...</p>
                </div>`;
                
                if (randomNumb === userPlayed) {
                    divResult.innerHTML = succesTemplate;
                    bombIcon.textContent = "✅";
                    bombIcon.classList.add("success-animation");
                } else {
                    divResult.innerHTML = failedTemplate;
                    bombIcon.textContent = "💥";
                    bombIcon.classList.add("explosion");
                }
                
                divResult.classList.add("show");
                isGameActive = false;
            });
            
            setTimeout(() => {
                clearInterval(intervalId);
            }, 5000);
        } else {
            showError("Introduce un número válido (1-3).");
        }
    }
});

function showError(message) {
    divResult.innerHTML = `<p style="color: #ff6b6b; font-weight: 500;">${message}</p>`;
    divResult.classList.add("show");
    setTimeout(() => {
        divResult.classList.remove("show");
    }, 3000);
}

//COUNTDWON
function iniciarContador(tiempoInicial, elementoContador, callback) {
    let timeLeft = tiempoInicial;
    elementoContador.textContent = `⏰ Cuenta atrás: ${timeLeft} segundos`;
    
    countdownInterval = setInterval(() => {
        timeLeft--;
        elementoContador.textContent = `⏰ Cuenta atrás: ${timeLeft} segundos`;
        
        // Add urgency animation when time is running out
        if (timeLeft <= 2) {
            elementoContador.style.animation = "pulse 0.5s ease-in-out infinite";
        }
        
        if (timeLeft === 0) {
            clearInterval(countdownInterval);
            callback();
        }
    }, 1000);
    
    return countdownInterval;
}

restarBtn.addEventListener("click", restartplayed);

// Add click outside input to start game
userInput.addEventListener("blur", () => {
    if (userInput.value && !isGameActive) {
        const event = new KeyboardEvent("keydown", { key: "Enter" });
        userInput.dispatchEvent(event);
    }
});

// Add some particle effects for fun
function createParticles() {
    const particles = document.createElement("div");
    particles.style.position = "fixed";
    particles.style.top = "0";
    particles.style.left = "0";
    particles.style.width = "100%";
    particles.style.height = "100%";
    particles.style.pointerEvents = "none";
    particles.style.zIndex = "1000";
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement("div");
        particle.style.position = "absolute";
        particle.style.width = "4px";
        particle.style.height = "4px";
        particle.style.background = "#00ff88";
        particle.style.borderRadius = "50%";
        particle.style.left = Math.random() * 100 + "%";
        particle.style.top = Math.random() * 100 + "%";
        particle.style.animation = `particle 2s ease-out forwards`;
        
        particles.appendChild(particle);
    }
    
    document.body.appendChild(particles);
    
    setTimeout(() => {
        document.body.removeChild(particles);
    }, 2000);
}

// Add particle animation to CSS
const style = document.createElement("style");
style.textContent = `
@keyframes particle {
    0% {
        transform: translateY(0) scale(1);
        opacity: 1;
    }
    100% {
        transform: translateY(-100px) scale(0);
        opacity: 0;
    }
}
`;
document.head.appendChild(style);
