// Log to console to confirm the script is loading
console.log("TEST");

// Get the container div where new todo input fields will be added
const todoList = document.getElementById("todos");

const addTodoButton = document.getElementById("addTodoButton");

// Store references to dynamically created todo input HTML (used only for tracking, not necessary for DOM)
const todoInputElements = [];


//Function to add a new todo input field group (task + isComplete checkbox) This is called every time the "Add Todo" button is clicked
function addNewTodoInput() {
  const container = document.createElement('div');

  // Generate the HTML string for a new todo input and checkbox
  const newTodoInput = `
    <label class="has-text-white" for="todos${todoInputElements.length}">Todo</label>
    <input class="has-text-black" name="todos${todoInputElements.length}" type="text" id="todos${todoInputElements.length}" />

    <label class="has-text-white" for="isComplete${todoInputElements.length}">Is Complete</label>
    <input name="isComplete${todoInputElements.length}" type="checkbox" id="isComplete${todoInputElements.length}" />
  `;

  container.innerHTML = newTodoInput;
  todoInputElements.push(newTodoInput);

  // Add the container with inputs to the DOM (inside the #todos div)
  todoList.appendChild(container);
}

// When clicked, it will call addNewTodoInput to dynamically insert new inputs
addTodoButton.addEventListener("click", addNewTodoInput);

