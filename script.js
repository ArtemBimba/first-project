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

const inputName = document.querySelector('.input-name');
const inputPrice = document.querySelector('.input-price');
const inputImage = document.querySelector('.input-image');
const addProductBtn = document.querySelector('.add-product-btn');

const productList = document.querySelector('.product-list');

let products = [];
loadProductsFromStorade();

if (products.length === 0){
    products = [
        {
            name: "iPhone 13",
            price: "$799",
            image: "https://appleroom.ua/wa-data/public/shop/products/16/24/12416/images/27223/27223.750.png"
        },
        {
            name: "MacBook Air",
            price: "$999",
            image: "https://www.istore.ua/upload/iblock/dae/vx1r87f6vjou28rstfvf2qxz1wqnnzk9/MRXV3_6_is.png"
        },
        {
            name: "Apple Watch",
            price: "$399",
            image: "https://my-apple.com.ua/image/catalog/products/watch/Series-10-42mm/Rose-Gold-Aluminium-1.png"
        },
        {
            name: "AirPods Pro",
            price: "$249",
            image: "https://grokholsky.com/uploads/products/590-590/66c9d46f19f4d-2024-08-24-03-39-11.webp"
        }
    ];

    products.forEach(product => {
        addProductCard(product);
    });

    saveProductsToStorage();
}

addProductBtn.addEventListener('click', () => {
    const name = inputName.value.trim();
    const price = inputPrice.value.trim();
    const image = inputImage.value.trim();

    if(!name || !price || !image){
        alert('Будь ласка, заповни всі поля!');
        return;
    }

    const newProduct = {
        name: name,
        price: price,
        image: image
    };

    products.push(newProduct);
    addProductCard(newProduct);
    saveProductsToStorage();

    inputName.value = '';
    inputPrice.value = '';
    inputImage.value = '';
});

function addProductCard(product){
    const card = document.createElement('div');
    card.classList.add('product-card');

    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;
    img.style.width = "100%";
    img.style.borderRadius = "8px";
    img.style.marginBottom = "10px";

    const title = document.createElement('h3');
    title.innerText = product.name;
    const price = document.createElement('p');
    price.innerText = product.price;

    //редагувати
    const editBtn = document.createElement('button');
    editBtn.innerText = "✏️ Редагувати";
    editBtn.classList.add('product-edit-btn');

    editBtn.addEventListener('click', () => {
        const nameInput = document.createElement('input');
        nameInput.value = product.name;

        const priceInput = document.createElement('input');
        priceInput.value = product.price;

        const imageInput = document.createElement('input');
        imageInput.value = product.image;

        const saveBtn = document.createElement('button');
        saveBtn.innerText = "💾 Зберегти";
        saveBtn.classList.add('product-edit-btn');

        card.innerHTML = '';
        card.appendChild(nameInput);
        card.appendChild(priceInput);
        card.appendChild(imageInput);
        card.appendChild(saveBtn);

        saveBtn.addEventListener('click', () => {
            const newName = nameInput.value.trim();
            const newPrice = priceInput.value.trim();
            const newImage = imageInput.value.trim();

            if(!newName || !newPrice || !newImage){
                alert("Заповни всі поля!");
                return;
            }

            product.name = newName;
            product.price = newPrice;
            product.image = newImage;
            saveProductsToStorage();

            card.remove();
            addProductCard(product);
        });
    });

    //кнопка видалити
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = "❌ Видалити";
    deleteBtn.classList.add('product-delete-btn');

    deleteBtn.addEventListener('click', () => {
        card.remove();
        const index = products.indexOf(product);
        if(index !== -1){
            products.splice(index, 1);
            saveProductsToStorage();
        }
    });

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(editBtn);       
    card.appendChild(deleteBtn);

    productList.appendChild(card);
}

function saveProductsToStorage(){
    const json = JSON.stringify(products);
    localStorage.setItem('products', json);
}

function loadProductsFromStorade(){
    const json = localStorage.getItem('products');

    if(!json) return;

    const savedProducts = JSON.parse(json);

    savedProducts.forEach(product => {
        products.push(product);
        addProductCard(product);
    })
}

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
//loadProductsFromStorade();