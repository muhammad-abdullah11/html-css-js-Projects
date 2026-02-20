const clearBtn = document.querySelector("#clearToDo");
const saveBtn = document.querySelector("#saveToDo");
const tasksContainer = document.querySelector(".Tasks");
const addBtn = document.querySelector(".addToDoBtn");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
    alert("Todos saved successfully!");
}

function renderTodos() {
    tasksContainer.innerHTML = "";
    todos.forEach((todo, index) => {
        const taskDiv = document.createElement("div");
        taskDiv.className = "ToDo";
        taskDiv.innerHTML = `
            <input class="ToDo1" type="checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleComplete(${index})">
            <input class="ToDo1" type="text" value="${todo.text}" oninput="updateText(${index}, this.value)">
            <input class="ToDo1" type="date" value="${todo.date || ''}" oninput="updateDate(${index}, this.value)">
            <button class="ToDoDelBtn" onclick="deleteTodo(${index})">Delete</button>
            <button class="ToDoEditBtn" onclick="focusInput(${index})">Edit</button>
        `;
        tasksContainer.appendChild(taskDiv);
    });
}

addBtn.addEventListener("click", () => {
    todos.unshift({
        text: "",
        date: "",
        completed: false
    });
    renderTodos();
});

saveBtn.addEventListener("click", () => {
    saveToLocalStorage();
});

clearBtn.addEventListener("click", () => {
    todos = [];
    renderTodos();
});

window.deleteTodo = (index) => {
    todos.splice(index, 1);
    renderTodos();
};

window.toggleComplete = (index) => {
    todos[index].completed = !todos[index].completed;
};

window.updateText = (index, val) => {
    todos[index].text = val;
};

window.focusInput = (index) => {
    const inputs = tasksContainer.querySelectorAll('input[type="text"]');
    if (inputs[index]) {
        inputs[index].focus();
    }
};

renderTodos();
