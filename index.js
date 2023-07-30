let textField = document.querySelector("input[type=text]");
let button = document.getElementById('button');
let image = document.querySelector('img[alt=gallow]');
let worldItem = document.getElementById('worldItem');
let section = document.getElementById('section');
button.addEventListener('click', check);
textField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        check();
    }
});
const worldDatabase = new WorldDatabase();
let world = worldDatabase.getWorld();
let worldLines = '';
let mistakes = 0;
for (let i = 0; i < world.length; i++) {
    if (world.charAt(i) == ' ') {
        worldLines += ' ';
    } else {
        worldLines += '_';
    }
}
showWorld();
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

function check() {
    let result = '';
    let mistake = true;
    for (let i = 0; i < world.length; i++) {
        if (world.charAt(i) == textField.value) {
            result += textField.value;
            mistake = false;
        } else {
            result += worldLines.charAt(i);
        }
    }
    if (mistake) {
        mistakes++;
        image.src = 'images/' + mistakes + '.png';
    }
    worldLines = result;
    textField.value = '';
    showWorld();
    isGameOver();
    congratulation();
}

function showWorld() {
    let result = '';
    for (let i = 0; i < worldLines.length; i++) {
        result += worldLines.charAt(i) +  '&nbsp&nbsp';
    }
    worldItem.innerHTML = result;
}

function isGameOver() {
    if (mistakes == 11) {
        section.innerHTML = '';
        let info = document.createElement('div');
        info.className = 'worldItem red';
        info.innerHTML = '❌ GAME OVER';
        document.body.appendChild(info);
    }
}

function congratulation() {
    if (!worldLines.includes('_')) {
        section.innerHTML = '';
        let info = document.createElement('div');
        info.className = 'worldItem green';
        info.innerHTML = '✅ CONGRATULATION';
        document.body.appendChild(info);
    }
}