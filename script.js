const toggleButton = document.querySelector('.toggle-theme');
const body = document.body;
const input = document.querySelector('.name-input');
const button = document.querySelector('.greet-btn');
const output = document.querySelector('.greeting-output');
const textInput = document.querySelector('.text-input');
const countBtn = document.querySelector('.count-btn');
const countOutput = document.querySelector('.count-output');

toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark');
})

button.addEventListener('click', () => {
    const name = input.value;

    if(name.trim() == '') {
        output.innerText = 'Введи імя, будь ласка!';
    }
    else{
        output.innerText = `Привіт, ${name}!`;
    }
})

countBtn.addEventListener('click', () => {
    const text = textInput.value;
    const length = text.length;

    countOutput.innerText = `У твоєму тексті - ${length} символів.`;
})