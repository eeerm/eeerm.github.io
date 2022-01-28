const output = document.querySelector('.text');
const input = document.querySelector('.keyboard');
const image = document.querySelector('.gallows').children[0];

const secret = "Hello World".toUpperCase();
let errs = 0;

function showInit(pass) {
    let dashedPass = '';
    for (const ch of pass) {
        dashedPass += ch == ' ' ? ' ' : '-';
    }
    output.innerHTML = dashedPass;
}

const alphabet = ["A","Ą","B","C","Ć","D","E","Ę","F","G","H","I","J","K","L","Ł","M","N","Ń","O","Ó","P","R","Q","S","Ś","T","U","V","W","X","Y","Z","Ź","Ż"]
// const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

function showKB() {
    const perRow = 7;
    const kb = Array.from({ length: alphabet.length / perRow }, (_, index) => {
        const begin = index * perRow;
        const row = alphabet.slice(begin, begin + perRow);
	// return row;
        let btns = '';
        row.forEach(element => {
            btns += `<button id=${element} class=btn>${element}</button>`;
        });
        return btns;
    });
    input.innerHTML = kb.join('<br>');
}

function btnFnc() {
    const btns = document.querySelectorAll('.btn');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (reveal(btn.innerHTML)) {
                btn.style.backgroundColor = "green";
                btn.style.color = btn.style.borderColor = "chartreuse"
                new Audio("yes.wav").play();
            } else {
                btn.style.backgroundColor = "#560319";
                btn.style.color = btn.style.borderColor = "red"
                new Audio("no.wav").play();
                mistake();
                console.log()
            }
            btn.disabled = true;
            btn.style.cursor = "default";
        });
    });
}

function reveal(guess) {
    let newOutput = '';
    const oldOutput = output.innerHTML;
    for (const el in oldOutput) {
        if (guess == secret.charAt(el)) {
            newOutput += guess;
        } else {
            newOutput += oldOutput.charAt(el);
        }
    }
    if (newOutput == oldOutput) { // no guess
        return false;
    } else {
        output.innerHTML = newOutput;
        if (!output.innerHTML.includes('-')) { // win condition
            end(true);
        }
        return true;
    }
}

function mistake() {
    errs++;
    image.src = `./img/s${errs}.jpg`;
    if (errs > 8) { // loss condition
        end(false);
    }
}

function end(endState) {
    input.innerHTML = endState ? "Zwycięstwo" : `Przegrana, hasłem było ${secret}.`;
    input.innerHTML += '<br><h2 class="reset">Jeszcze raz</h2>'
    const reset = document.querySelector('.reset');
    reset.addEventListener('click', () => window.location.reload())
}

window.onload = () => {
    showInit(secret);
    showKB();
    btnFnc();
}
