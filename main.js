// Variables
let uncoveredCards = 0;
let card1 = null;
let card2 = null;
let firstResult = null;
let secondResult = null;
let moves = 0;
let pairs = 0;
let switchTime = false;
let timer = 0;
let countdown = null;
let numbers = [];
// Documento HTML
let showMoves = document.querySelector('#moves');
let showPairs = document.querySelector('#pairs');
let showTime = document.querySelector('#remaining');
const btns = document.querySelectorAll('.difficult');
const reset = document.querySelector('#reset');
const card = document.querySelectorAll('.card');


// Eventos
document.addEventListener('DOMContentLoaded', () => {
    selectDifficult();
    reset.disabled = true;
})

reset.addEventListener('click', () => {location.reload();})

// Funciones
function selectDifficult() {
    btns.forEach((btn) => {
        btn.addEventListener('click', e => {
            let difficult = e.target.id;
            if(difficult === 'easy') {
                table.innerHTML += `
                    <tr>
                        <td><button id="0" onclick="turn(0)" class="card"></button></td>
                        <td><button id="1" onclick="turn(1)" class="card"></button></td>
                        <td><button id="2" onclick="turn(2)" class="card"></button></td>
                        <td><button id="3" onclick="turn(3)" class="card"></button></td>
                    </tr>
                    <tr>
                        <td><button id="4" onclick="turn(4)" class="card"></button></td>
                        <td><button id="5" onclick="turn(5)" class="card"></button></td>
                        <td><button id="6" onclick="turn(6)" class="card"></button></td>
                        <td><button id="7" onclick="turn(7)" class="card"></button></td>
                    </tr>
                    <tr>
                        <td><button id="8" onclick="turn(8)" class="card"></button></td>
                        <td><button id="9" onclick="turn(9)" class="card"></button></td>
                        <td><button id="10" onclick="turn(10)" class="card"></button></td>
                        <td><button id="11" onclick="turn(11)" class="card"></button></td>
                    </tr>
                `
                numbers = [1,1,2,2,3,3,4,4,5,5,6,6];
                timer = 51;
                // timer = 6; //Quitar
            }else if (difficult === 'normal') {
                table.innerHTML += `
                    <tr>
                        <td><button id="0" onclick="turn(0)" class="card"></button></td>
                        <td><button id="1" onclick="turn(1)" class="card"></button></td>
                        <td><button id="2" onclick="turn(2)" class="card"></button></td>
                        <td><button id="3" onclick="turn(3)" class="card"></button></td>
                    </tr>
                    <tr>
                        <td><button id="4" onclick="turn(4)" class="card"></button></td>
                        <td><button id="5" onclick="turn(5)" class="card"></button></td>
                        <td><button id="6" onclick="turn(6)" class="card"></button></td>
                        <td><button id="7" onclick="turn(7)" class="card"></button></td>
                    </tr>
                    <tr>
                        <td><button id="8" onclick="turn(8)" class="card"></button></td>
                        <td><button id="9" onclick="turn(9)" class="card"></button></td>
                        <td><button id="10" onclick="turn(10)" class="card"></button></td>
                        <td><button id="11" onclick="turn(11)" class="card"></button></td>
                    </tr>
                    <tr>
                        <td><button id="12" onclick="turn(12)" class="card"></button></td>
                        <td><button id="13" onclick="turn(13)" class="card"></button></td>
                        <td><button id="14" onclick="turn(14)" class="card"></button></td>
                        <td><button id="15" onclick="turn(15)" class="card"></button></td>
                    </tr>
                `
                numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
                timer = 41;
            }else {
                table.innerHTML += `
                    <tr>
                        <td><button id="0" onclick="turn(0)" class="card"></button></td>
                        <td><button id="1" onclick="turn(1)" class="card"></button></td>
                        <td><button id="2" onclick="turn(2)" class="card"></button></td>
                        <td><button id="3" onclick="turn(3)" class="card"></button></td>
                    </tr>
                    <tr>
                        <td><button id="4" onclick="turn(4)" class="card"></button></td>
                        <td><button id="5" onclick="turn(5)" class="card"></button></td>
                        <td><button id="6" onclick="turn(6)" class="card"></button></td>
                        <td><button id="7" onclick="turn(7)" class="card"></button></td>
                    </tr>
                    <tr>
                        <td><button id="8" onclick="turn(8)" class="card"></button></td>
                        <td><button id="9" onclick="turn(9)" class="card"></button></td>
                        <td><button id="10" onclick="turn(10)" class="card"></button></td>
                        <td><button id="11" onclick="turn(11)" class="card"></button></td>
                    </tr>
                    <tr>
                        <td><button id="12" onclick="turn(12)" class="card"></button></td>
                        <td><button id="13" onclick="turn(13)" class="card"></button></td>
                        <td><button id="14" onclick="turn(14)" class="card"></button></td>
                        <td><button id="15" onclick="turn(15)" class="card"></button></td>
                    </tr> 
                    <tr>
                        <td><button id="16" onclick="turn(16)" class="card"></button></td>
                        <td><button id="17" onclick="turn(17)" class="card"></button></td>
                        <td><button id="18" onclick="turn(18)" class="card"></button></td>
                        <td><button id="19" onclick="turn(19)" class="card"></button></td>
                    </tr>
                `
                numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10];
                timer = 31;
            }            
            numbers = numbers.sort(() => {return Math.random()-0.3});
            btns.forEach(element => element.disabled = true);        
        })
    })
}


function time() {
    countdown = setInterval(() => {
        timer--;
        showTime.innerHTML = `Tiempo: ${timer} segundos`;
        if(timer === 0) {
            clearInterval(countdown);
            cardSelected();    
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: '¡Ay, caramba!',
                showConfirmButton: true,
            })
            .then((result) => {
                if (result.isConfirmed) {
                    location.reload();
                }
            })
        }
    }, 1000);
}


function cardSelected() {
    for(let i = 0; i <= numbers.length - 1; i++) {
        let selectCard = document.getElementById(i);
        selectCard.innerHTML = `<img src="./images/${numbers[i]}.webp">`;
        selectCard.disabled = true;
    }
}


function turn(id) {
    if(switchTime == false) {
        time();
        switchTime = true;
    }

    uncoveredCards++;

    if (uncoveredCards === 1) {
        // Mostrar la primera tarjeta
        card1 = document.getElementById(id);
        firstResult = numbers[id];
        card1.innerHTML = `<img src="./images/${firstResult}.webp">`;

        // Deshabilitar el primer botón
        card1.disabled = true;

    }else if (uncoveredCards === 2) {
        // Mostrar segunda tarjeta
        card2 = document.getElementById(id);
        secondResult = numbers[id];
        card2.innerHTML = `<img src="./images/${secondResult}.webp">`;
        // Deshabilitar el segundo botón
        card2.disabled = true;

        // Incrementar movimientos
        moves++;
        showMoves.innerHTML = `Movimientos: ${moves}`;
        if(firstResult === secondResult) {
            // Encerrar contador tarjetas descubiertas
            uncoveredCards = 0;

            // Aumentar pares
            pairs++;
            showPairs.innerHTML = `Pares: ${pairs}`; 
            
            let halfnumber = numbers.length / 2;
            if(pairs === halfnumber){
                clearInterval(countdown);
                showPairs.innerHTML = `Aciertos: ${pairs}`;
                showTime.innerHTML = `Quedaron: ${timer} segundos`;
                showMoves.innerHTML = `Movimientos: ${moves}`;
                reset.disabled = false;
            }

        }else {
            // Mostrar momentaneamente valores y volver a tapar
            setTimeout(() => {
                card1.innerHTML = ' ';
                card2.innerHTML = ' ';
                card1.disabled = false;
                card2.disabled = false;
                uncoveredCards = 0;
                reset.disabled = false;
            }, 800);
        }

    }
}




