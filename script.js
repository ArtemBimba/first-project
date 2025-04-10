const toggleButton = document.querySelector('.toggle-theme');
const body = document.body;
const textInput = document.querySelector('.text-input');
const countBtn = document.querySelector('.count-btn');
const countOutput = document.querySelector('.count-output');
const nameInput = document.querySelector('.user-name');
const ageInput = document.querySelector('.user-age');
const checkButton = document.querySelector('.check-btn');
const outputNameAge = document.querySelector('.form-output');

toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark');
})

countBtn.addEventListener('click', () => {
    const text = textInput.value;
    const length = text.length;

    countOutput.innerText = `У твоєму тексті - ${length} символів.`;
})

checkButton.addEventListener('click', () =>{
    const name = nameInput.value.trim();
    const age = ageInput.value;

    if(name === '' || age === ''){
        outputNameAge.innerText = 'Заповни обидва поля!';
    }
    else if (isNaN(age) || age <= 0) {
        outputNameAge.innerText = 'Вік має бути числом більше 0!';
    }
    else{
        outputNameAge.innerText = `Привіт, ${name}. Тобі ${age} років.`;
    }
})