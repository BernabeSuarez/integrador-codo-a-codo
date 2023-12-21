const quantity = document.querySelector('#quantity');
const add = document.querySelector('#add');
const subtract = document.querySelector('#subtract');

add.addEventListener('click', () => quantity.value = Number(quantity.value) + 1);

subtract.addEventListener('click', () => { if (quantity.value != '1') quantity.value = Number(quantity.value) - 1; });
