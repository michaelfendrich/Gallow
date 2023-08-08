let textField = document.querySelector("input[type=text]");
let button = document.getElementById('button');
let image = document.querySelector('img[alt=gallow]');
let wordItem = document.getElementById('wordItem');
let section = document.getElementById('section');
button.addEventListener('click', isGuess);
textField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        isGuess();
    }
});
const wordDatabase = new WordDatabase();
let word = wordDatabase.getWord();
let wordLines = '';
let mistakes = 0;
for (let i = 0; i < word.length; i++) {
    if (word.charAt(i) == ' ') {
        wordLines += '-';
    } else {
        wordLines += '_';
    }
}
showWord();
textField.addEventListener('input', () => {
    let value = textField.value;
    textField.value = value.toUpperCase();
    if (value.length > 1 || !value.match(/[a-zA-Z]/g)) {
        button.disabled = true;
        button.className += 'errorButton';
    } else {
        button.disabled = false;
        button.className = 'button';
    }
});

function isGuess() {
    if (textField.value) {
        check();
    }
}

function check() {
    let result = '';
    let mistake = true;
    for (let i = 0; i < word.length; i++) {
        if (word.charAt(i) == textField.value) {
            result += textField.value;
            mistake = false;
        } else {
            result += wordLines.charAt(i);
        }
    }
    if (mistake) {
        mistakes++;
        image.src = 'images/' + mistakes + '.png';
    }
    wordLines = result;
    textField.value = '';
    showWord();
    isGameOver();
    congratulation();
}

function showWord() {
    let result = '';
    for (let i = 0; i < wordLines.length; i++) {
        result += wordLines.charAt(i) +  ' ';
    }
    wordItem.innerHTML = result;
}

function isGameOver() {
    if (mistakes == 11) {
        section.innerHTML = '';
        let info = document.createElement('div');
        info.className = 'wordItem red';
        info.innerHTML = '❌ GAME OVER';
        document.body.appendChild(info);
    }
}

function congratulation() {
    if (!wordLines.includes('_')) {
        section.innerHTML = '';
        let info = document.createElement('div');
        info.className = 'wordItem green';
        info.innerHTML = '✅ CONGRATULATION';
        document.body.appendChild(info);
    }
}