// Assigning variables to the required elements
const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todo-ul");
const taskStatus = document.querySelector(".todoEntry-Bottom");
taskStatus.innerText = `Your Remaining Task(s): 0`;
let count = 0;

const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
  todos.forEach((todo) => addTodo(todo));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

function addTodo(todo) {
  let todoText = input.value; // Storing input in variable

  if (todo) {
    todoText = todo.text;
  }

  if (todoText) {
    //Creating div & its class
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-group");

    //Adding Div under ul
    todosUL.appendChild(todoDiv);

    //Creating li & its class
    const todoEl = document.createElement("li");
    todoEl.classList.add("todo-li");

    //Adding li under Div
    todoDiv.appendChild(todoEl);

    if (todo && todo.completed) {
      todoEl.classList.add("checked");
    }

    //Adding input inside the newly created li
    todoEl.innerText = todoText;
    count++;
    taskStatus.innerText = `Your Remaining Tasks : ${count}`;

    //Switching class (line-through/normal) if the text is clicked
    todoEl.addEventListener("click", () => {
      todoEl.classList.toggle("checked");
      updateLS();
    });

    //Creating span & its class
    const span = document.createElement("span");
    span.classList.add("todo-delete");

    //Adding span under Div
    todoDiv.appendChild(span);

    span.addEventListener("click", () => {
      todoDiv.remove();
      updateLS();
      count--;
      taskStatus.innerText = `Your Remaining Tasks : ${count}`;
    });

    //Clear the input field after submission
    input.value = "";

    updateLS();
  }
}

function updateLS() {
  todoEl = document.querySelectorAll("li");

  const todos = [];

  todoEl.forEach((todoEl) => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains("checked"),
    });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}
