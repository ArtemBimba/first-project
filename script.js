const toggleButton = document.querySelector('.toggle-theme');
const body = document.body;

toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark');
})