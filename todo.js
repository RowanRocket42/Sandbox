document.addEventListener('DOMContentLoaded', function() {
    const todoInput = document.getElementById('todoInput');
    const addTodoButton = document.getElementById('addTodo');
    const todoList = document.getElementById('todoList');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function createTodoElement(todo, index) {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <label class="container">
                <input type="checkbox" ${todo.completed ? 'checked' : ''}>
                <div class="checkmark">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="none" stroke="currentColor" stroke-linecap="round" 
                              stroke-linejoin="round" stroke-width="32" 
                              d="M416 128L192 384l-96-96"></path>
                    </svg>
                </div>
            </label>
            <input type="text" class="todo-text" value="${todo.text}" readonly>
            <div class="todo-actions">
                <button class="todo-button edit-btn">✎</button>
                <button class="todo-button delete-btn">×</button>
            </div>
        `;

        const checkbox = li.querySelector('input[type="checkbox"]');
        const textInput = li.querySelector('.todo-text');
        const editBtn = li.querySelector('.edit-btn');
        const deleteBtn = li.querySelector('.delete-btn');

        checkbox.addEventListener('change', () => toggleTodo(index));
        
        editBtn.addEventListener('click', () => {
            textInput.readOnly = !textInput.readOnly;
            textInput.classList.toggle('editing');
            if (!textInput.readOnly) {
                textInput.focus();
            }
        });

        textInput.addEventListener('blur', () => {
            textInput.readOnly = true;
            textInput.classList.remove('editing');
            todos[index].text = textInput.value;
            saveTodos();
        });

        textInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                textInput.blur();
            }
        });

        deleteBtn.addEventListener('click', () => {
            todos.splice(index, 1);
            saveTodos();
            renderTodos();
        });

        return li;
    }

    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const todoElement = createTodoElement(todo, index);
            todoList.appendChild(todoElement);
        });
    }

    function addTodo(text) {
        todos.push({ text, completed: false });
        saveTodos();
        renderTodos();
    }

    function toggleTodo(index) {
        todos[index].completed = !todos[index].completed;
        saveTodos();
        renderTodos();
    }

    addTodoButton.addEventListener('click', () => {
        const text = todoInput.value.trim();
        if (text) {
            addTodo(text);
            todoInput.value = '';
        }
    });

    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const text = todoInput.value.trim();
            if (text) {
                addTodo(text);
                todoInput.value = '';
            }
        }
    });

    renderTodos();
});