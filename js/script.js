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

function restartplayed () {
    clearInterval(countdownInterval);
    divResult.innerHTML = "";
    userInput.vale ="";
    countDown.textContent = "Cuenta atrás: 5 segundos";
    ;
    
    userInput.focus();
};
countdown.textContent = "Cuenta atrás: 5 segundos";
userInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter") {                                                //al push "Enter" que comience la cuenta regresiva. configurar funcion dentro del evento
        let userPlayed = parseInt(userInput.value);                        // Configuarion de la JUGADA DEL USUARIO coon el INPUT USERINPUT, parse, para paraslo a num.
        
        if (userPlayed >= 1 && userPlayed <= 3) {                           //asegurar la jugada entre 1 y 3
            let intervalId =iniciarContador(5, countDown, () => {                                                // configurar la asincronia
            let randomNumb = Math.floor(Math.random() * (3 - 1 + 1)) + 1;  // en estos 5 segundo que procese la funcion math random y me de un resultado al finalizar los 5"                                                // para que la respuesta me aparezca despues de 5"
            let succesTemplate = `
            <div>
            <h2 class="success">¡Has salvado el mundo!</h2>
            <p class="success1">Tu número ${userPlayed} es el mismo que el número ${randomNumb}</p></div>`;
            let failedTemplate = `
            <div><h2 class="failed">La bomba ha estallado</h2>
            <p class="failed1">Tu número ${userPlayed} NO es el mismo que el número ${randomNumb}</p></div>`;
            //console.log ("La bomba ha estallado")
          if (randomNumb === userPlayed) {                                 //randomNumb === al numero que elegi     
            divResult.innerHTML = succesTemplate;
            //console.log("¡Has salvado el mundo!");
        } else {
            divResult.innerHTML = failedTemplate;
    }
        });
        setTimeout(() => { 
            clearInterval(intervalId);     
        }, 5000);
  } else {
    divResult.textContent = "Introduce un número válido (1-3).";
  }
 }
});
 
//COUNTDWON
let countdownInterval;

function iniciarContador (tiempoInicial, elementoContador, callback) {
    let timeLeft = tiempoInicial;
    elementoContador.textContent = `Cuenta atras: ${timeLeft} segundos`;
    let countdownInterval = setInterval(() =>{ 
        timeLeft--;
        elementoContador.textContent = `Cuenta atras: ${timeLeft} segundos`;
 if ( timeLeft === 0) {
    clearInterval(countdownInterval);
    callback();
 }
    }, 1000);
    return countdownInterval
}
    
restarBtn.addEventListener("click", restartplayed);
