// Todo Items Array 
let todoItems = [];

// Render todo item markup
function renderTodo(todo) {
    // Storage Todo list in Local Storage
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
    // console.log(localStorage.getItem('todoItems'))

    // Select the first element with a class of `js-todo-list`
    const list = document.querySelector('.js-todo-list');

    // Select the current todo item in the DOM
    const item = document.querySelector(`[data-key='${todo.id}']`);

    if (todo.deleted) {
        // remove the item from the DOM
        item.remove();

        return
    }

    // Use the ternary operator to check if `todo.checked` is true
    // if so, assign 'done' to `isChecked`. Otherwise, assign an empty string
    const isChecked = todo.checked ? 'done' : '';
    // Create an `li` element and assign it to `node`
    const node = document.createElement("li");
    // Set the class attribute
    node.setAttribute('class', `todo-item ${isChecked}`);
    // Set the data-key attribute to the id of the todo
    node.setAttribute('data-key', todo.id);
    // Set the contents of the `li` element created above
    node.innerHTML = `
      <input id="${todo.id}" type="checkbox"/>
      <label for="${todo.id}" class="tick js-tick"></label>
      <span>${todo.text}</span>
      <button class="delete-todo js-delete-todo">
      <svg><use href="#delete-icon"></use></svg>
      </button>
    `;

    // If the item already exists in the DOM
    if (item) {
        // replace it
        list.replaceChild(node, item);
    } else {
        // otherwise append it to the end of the list
        list.append(node);
    }
}

// Add new todo item to (todoItems) Array
function addTodo(text) {
    const todo = {
        text,
        checked: false,
        id: Date.now(),
    };

    todoItems.push(todo);
    renderTodo(todo);
}

// Toggle Checked On Current Todo Item   
function toggleDone(key) {
    // findIndex is an array method that returns the position of an element in the array.
    const index = todoItems.findIndex(item => item.id === Number(key));
    // Locate the todo item in the todoItems array and set its checked
    // property to the opposite. That means, `true` will become `false` and vice versa.
    todoItems[index].checked = !todoItems[index].checked;
    renderTodo(todoItems[index])
}

const form = document.querySelector('.js-form');
// Handled Submit Event on The Form  
form.addEventListener('submit', event => {
    event.preventDefault();
    const input = document.querySelector('.js-todo-input');

    const text = input.value.trim();
    if (text !== '') {
        addTodo(text);
        input.value = '';
        input.focus();
    }
});

const list = document.querySelector('.js-todo-list');
// Get todo item ID and Pass it to (toggleDone) function 
list.addEventListener('click', event => {
    if (event.target.classList.contains('js-tick')) {
        const itemKey = event.target.parentElement.dataset.key;
        toggleDone(itemKey);
    }

    if (event.target.classList.contains('js-delete-todo')) {
        const itemKey = event.target.parentElement.dataset.key;
        deleteTodo(itemKey);
    }
})

// Delete current todo item 
function deleteTodo(key) {
    // find the corresponding todo object in the todoItems array
    const index = todoItems.findIndex(item => item.id === Number(key));
    // Create a new object with properties of the current todo item
    // and a `deleted` property which is set to true
    const todo = {
        deleted: true,
        ...todoItems[index]
    }

    todoItems = todoItems.filter(item => item.id !== Number(key));
    renderTodo(todo)
}

// Clear nodes when todo List is empty 
(function clearTodoNodes() {
    if (todoItems.length === 0) list.innerHTML = '';
})();

// Render Todo List Items In HTML that Restored In the local Sotrage 
document.addEventListener('DOMContentLoaded', () => {
    const ref = localStorage.getItem('todoItems');
    // console.log(ref)
    if (ref) {
        todoItems = JSON.parse(ref);
        // console.log(todoItems)

        todoItems.forEach(item => {
            // console.log(item)
            renderTodo(item);
        });
    }
});

// Clear All Todo List Items  
function clearTodoList() {
    const clearButton = document.querySelector('.clear-btn');

    clearButton.addEventListener('click', () => {
        localStorage.clear();
        if (todoItems.length > 0) list.innerHTML = '';
    })
}
clearTodoList();