console.log("TEST");
const todoList = document.getElementById("todos");

const addTodoButton = document.getElementById("addTodoButton");
const todoInputElements = [];

function addNewTodoInput() {
  const container = document.createElement('div')
  const newTodoInput = `<label for="todos${todoInputElements.length}">Todo</label>
            <input name="todos${todoInputElements.length}" type="text" id="todos${todoInputElements.length}"/>
            <label for="isComplete${todoInputElements.length}">Is Complete</label>
            <input name="isComplete${todoInputElements.length}" type="checkbox" id="isComplete${todoInputElements.length}"/>`;
  container.innerHTML = newTodoInput;
  todoInputElements.push(newTodoInput);
  todoList.appendChild(container);
}

addTodoButton.addEventListener("click", addNewTodoInput);
