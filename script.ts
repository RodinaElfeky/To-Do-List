interface ToDoItem {
  id: number;
  title: string;
  description: string;
  finished: boolean;
}

let todoList: ToDoItem[] = [];
let idCounter = 0;
let editMode = false;
let editId: number | null = null;

const titleInput = document.getElementById("todo-title") as HTMLInputElement;
const descInput = document.getElementById("todo-description") as HTMLTextAreaElement;
const addButton = document.getElementById("add-btn") as HTMLButtonElement;
const todoUl = document.getElementById("todo-list") as HTMLUListElement;

function renderTodos() {
  todoUl.innerHTML = "";
  todoList.forEach((item) => {
    const li = document.createElement("li");
    li.className = "todo-item" + (item.finished ? " finished" : "");

    const contentDiv = document.createElement("div");
    contentDiv.className = "todo-content";
    contentDiv.innerHTML = `<strong>${item.title}</strong>: ${item.description}`;
    li.appendChild(contentDiv);

    const actionsDiv = document.createElement("div");
    actionsDiv.className = "todo-actions";

    const checkBtn = document.createElement("button");
    checkBtn.className = "check";
    checkBtn.innerHTML = "✔️";
    checkBtn.onclick = () => {
      item.finished = !item.finished;
      renderTodos();
    };

    const editBtn = document.createElement("button");
    editBtn.className = "edit";
    editBtn.innerHTML = "✏️";
    editBtn.onclick = () => {
      titleInput.value = item.title;
      descInput.value = item.description;
      addButton.textContent = "Update";
      editMode = true;
      editId = item.id;
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.innerHTML = "❌";
    deleteBtn.onclick = () => {
      todoList = todoList.filter((t) => t.id !== item.id);
      renderTodos();
    };

    actionsDiv.appendChild(checkBtn);
    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);
    li.appendChild(actionsDiv);

    todoUl.appendChild(li);
  });
}

addButton.addEventListener("click", () => {
  const title = titleInput.value.trim();
  const desc = descInput.value.trim();

  if (title === "" || desc === "") {
    alert("Please enter both title and description.");
    return;
  }

  if (editMode && editId !== null) {
    let item: ToDoItem | undefined = undefined;
    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].id === editId) {
        item = todoList[i];
        break;
      }
    }

    if (item) {
      item.title = title;
      item.description = desc;
    }

    editMode = false;
    editId = null;
    addButton.textContent = "Add";
  } else {
    const newToDo: ToDoItem = {
      id: ++idCounter,
      title,
      description: desc,
      finished: false,
    };
    todoList.push(newToDo);
  }

  titleInput.value = "";
  descInput.value = "";
  renderTodos();
});
