const toggleButton = document.querySelector('.toggle-theme');
const body = document.body;
const textInput = document.querySelector('.text-input');
const countBtn = document.querySelector('.count-btn');
const countOutput = document.querySelector('.count-output');
const nameInput = document.querySelector('.user-name');
const ageInput = document.querySelector('.user-age');
const checkButton = document.querySelector('.check-btn');
const outputNameAge = document.querySelector('.form-output');

const taskInput = document.querySelector('.task-input');
const addTaskBtn = document.querySelector('.add-task-btn');
const taskList = document.querySelector('.task-list');

let tasks = [];

function loadTasks(){
    const storedTasks = localStorage.getItem('tasks');
    if(storedTasks){
        tasks = JSON.parse(storedTasks);
        tasks.forEach(task => addTask(task.id, task.text, task.completed));
    }
}

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

addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();

    if (taskText === ''){
        alert('Введи справу!')
        return;
    }

    const id = Date.now();
    tasks.push({id: id, text: taskText, completed: false});
    addTask(id, taskText, false);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
})

function addTask(id, taskText, completed = false){
    const li = document.createElement('li');
    li.dataset.id = id;

    if (completed) {
        li.classList.add('completed');
    }

    const textSpan = document.createElement('span');
    textSpan.innerText = taskText;
    li.appendChild(textSpan);

    const editBtn = document.createElement('button');
    editBtn.innerText = '✎';
    editBtn.classList.add('edit-btn');

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = '✕';

    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.gap = '6px';

    deleteBtn.addEventListener('click', () => {
        li.remove();
        tasks = tasks.filter(t => t.id !== id);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    });

    textSpan.addEventListener('click', () => {
        li.classList.toggle('completed');
        const task = tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    });

    editBtn.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = taskText;

        const saveBtn = document.createElement('button');
        saveBtn.innerText = 'Зберегти';
        saveBtn.classList.add('edit-btn');

        li.innerHTML = '';
        li.appendChild(input);
        li.appendChild(saveBtn);

        saveBtn.addEventListener('click', () => {
            const newText = input.value.trim();
            if (newText === '') {
                alert('Текст не може бути порожнім!');
                return;
            }

            const task = tasks.find(t => t.id === id);
            if (task) {
                task.text = newText;
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }

            li.innerHTML = '';
            const updatedSpan = document.createElement('span');
            updatedSpan.innerText = newText;
            updatedSpan.addEventListener('click', () => {
                li.classList.toggle('completed');
                const task = tasks.find(t => t.id === id);
                if (task) {
                    task.completed = !task.completed;
                    localStorage.setItem('tasks', JSON.stringify(tasks));
                }
            });

            li.appendChild(updatedSpan);
            buttonContainer.appendChild(editBtn);
            buttonContainer.appendChild(deleteBtn);
            li.appendChild(buttonContainer);
        });
    });

    buttonContainer.appendChild(editBtn);
    buttonContainer.appendChild(deleteBtn);
    li.appendChild(buttonContainer);
    taskList.appendChild(li);
}

loadTasks();