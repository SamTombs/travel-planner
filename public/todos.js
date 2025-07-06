console.log("TEST");
const todoList = document.getElementById("todos");

const addTodoButton = document.getElementById("addTodoButton");
const todoInputElements = [];

function addNewTodoInput() {
  const container = document.createElement('div')
  const newTodoInput = `<label class="has-text-white" for="todos${todoInputElements.length}">Todo</label>
            <input class="has-text-black" name="todos${todoInputElements.length}" type="text" id="todos${todoInputElements.length}"/>
            <label class="has-text-white" for="isComplete${todoInputElements.length}">Is Complete</label>
            <input name="isComplete${todoInputElements.length}" type="checkbox" id="isComplete${todoInputElements.length}"/>`;
  container.innerHTML = newTodoInput;
  todoInputElements.push(newTodoInput);
  todoList.appendChild(container);
}

addTodoButton.addEventListener("click", addNewTodoInput);
