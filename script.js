var todoList = [];
var idCounter = 0;
var editMode = false;
var editId = null;
var titleInput = document.getElementById("todo-title");
var descInput = document.getElementById("todo-description");
var addButton = document.getElementById("add-btn");
var todoUl = document.getElementById("todo-list");
function renderTodos() {
    todoUl.innerHTML = "";
    todoList.forEach(function (item) {
        var li = document.createElement("li");
        li.className = "todo-item" + (item.finished ? " finished" : "");
        var contentDiv = document.createElement("div");
        contentDiv.className = "todo-content";
        contentDiv.innerHTML = "<strong>".concat(item.title, "</strong>: ").concat(item.description);
        li.appendChild(contentDiv);
        var actionsDiv = document.createElement("div");
        actionsDiv.className = "todo-actions";
        var checkBtn = document.createElement("button");
        checkBtn.className = "check";
        checkBtn.innerHTML = "✔️";
        checkBtn.onclick = function () {
            item.finished = !item.finished;
            renderTodos();
        };
        var editBtn = document.createElement("button");
        editBtn.className = "edit";
        editBtn.innerHTML = "✏️";
        editBtn.onclick = function () {
            titleInput.value = item.title;
            descInput.value = item.description;
            addButton.textContent = "Update";
            editMode = true;
            editId = item.id;
        };
        var deleteBtn = document.createElement("button");
        deleteBtn.className = "delete";
        deleteBtn.innerHTML = "❌";
        deleteBtn.onclick = function () {
            todoList = todoList.filter(function (t) { return t.id !== item.id; });
            renderTodos();
        };
        actionsDiv.appendChild(checkBtn);
        actionsDiv.appendChild(editBtn);
        actionsDiv.appendChild(deleteBtn);
        li.appendChild(actionsDiv);
        todoUl.appendChild(li);
    });
}
addButton.addEventListener("click", function () {
    var title = titleInput.value.trim();
    var desc = descInput.value.trim();
    if (title === "" || desc === "") {
        alert("Please enter both title and description.");
        return;
    }
    if (editMode && editId !== null) {
        var item = undefined;
        for (var i = 0; i < todoList.length; i++) {
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
    }
    else {
        var newToDo = {
            id: ++idCounter,
            title: title,
            description: desc,
            finished: false,
        };
        todoList.push(newToDo);
    }
    titleInput.value = "";
    descInput.value = "";
    renderTodos();
});
