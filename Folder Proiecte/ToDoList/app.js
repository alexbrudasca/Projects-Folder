let todoItems = [];
const todoInput = document.querySelector(".todo-input");
const completedTodosDiv = document.querySelector(".completed-todos");
const uncompletedTodosDiv = document.querySelector(".uncompleted-todos");
const audio = new Audio('song.wav');

window.onload = () => {
    let storageTodoItems = localStorage.getItem("todoItems");
    if (storageTodoItems !== null) {
        todoItems = JSON.parse(storageTodoItems);
    }
    render();
};

todoInput.onkeyup = (e) => {
    let value = e.target.value.replace(/^\s+/, "");
    if (value && e.keyCode === 13) {
        addTodo(value);

        todoInput.value = "";
        todoInput.focus();
    }
};

function addTodo(text) {
    todoItems.push({
        id: Date.now(),
        text,
        completed: false
    });
    saveAndRender();
}

function removeTodo(id) {
    todoItems = todoItems.filter(todo => todo.id !== Number(id));
    saveAndRender();
}

function markAsCompleted(id) {
    todoItems.forEach(todo => {
        if (todo.id === Number(id)) {
            todo.completed = true;
        }
    });
    audio.play();
    saveAndRender();
}

function markAsUncompleted(id) {
    todoItems.forEach(todo => {
        if (todo.id === Number(id)) {
            todo.completed = false;
        }
    });
    saveAndRender();
}

function save() {
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
}

function render() {
    let unCompletedTodos = todoItems.filter(item => !item.completed);
    let completedTodos = todoItems.filter(item => item.completed);

    completedTodosDiv.innerHTML = "";
    uncompletedTodosDiv.innerHTML = "";

    if (unCompletedTodos.length > 0) {
        unCompletedTodos.forEach(todo => {
            uncompletedTodosDiv.append(createTodoElement(todo));
        });
    } else {
        uncompletedTodosDiv.innerHTML = `<div class='empty'>No uncompleted mission</div>`;
    }

    if (completedTodos.length > 0) {
        const completedTitleDiv = document.createElement("div");
        completedTitleDiv.className = "completed-title";
        completedTitleDiv.textContent = `Completed (${completedTodos.length} / ${todoItems.length})`;
        completedTodosDiv.appendChild(completedTitleDiv);

        completedTodos.forEach(todo => {
            completedTodosDiv.appendChild(createTodoElement(todo));
        });
    }
}

function saveAndRender() {
    save();
    render();
}

function createTodoElement(todo) {
    const todoDiv = document.createElement("div");
    todoDiv.setAttribute('data-id', todo.id);
    todoDiv.className = "todo-item";

    const todoTextSpan = document.createElement("span");
    todoTextSpan.innerHTML = todo.text;

    const todoInputCheckbox = document.createElement("input");
    todoInputCheckbox.type = 'checkbox';
    todoInputCheckbox.checked = todo.completed;
    todoInputCheckbox.onclick = (e) => {
        let id = e.target.closest(".todo-item").getAttribute('data-id');
        e.target.checked ? markAsCompleted(id) : markAsUncompleted(id);
    };

    const todoRemoveBtn = document.createElement("a");
    todoRemoveBtn.href = "#";
    todoRemoveBtn.innerHTML = `<i class="fa-solid fa-times"></i>`;
    todoRemoveBtn.onclick = (e) => {
        let id = e.target.closest(".todo-item").getAttribute('data-id');
        removeTodo(id);
    };

    todoTextSpan.prepend(todoInputCheckbox);
    todoDiv.appendChild(todoTextSpan);
    todoDiv.appendChild(todoRemoveBtn);

    return todoDiv;
}
