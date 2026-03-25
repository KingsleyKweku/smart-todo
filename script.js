let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

// Save to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add Task
function addTask() {
  const input = document.getElementById("taskInput");
  const dueDateInput = document.getElementById("dueDate");

  const text = input.value.trim();
  const dueDate = dueDateInput.value;

  if (text === "") return;

  tasks.push({
    text: text,
    completed: false,
    dueDate: dueDate
  });

  input.value = "";
  dueDateInput.value = "";

  saveTasks();
  renderTasks();
}

// Toggle completed
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Edit task
function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);

  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    saveTasks();
    renderTasks();
  }
}

// Filter tasks
function filterTasks(filter) {
  currentFilter = filter;
  renderTasks();
}

// Render tasks
function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  let filteredTasks = tasks
    .map((task, index) => ({ ...task, index }))
    .filter(task => {
      if (currentFilter === "completed") return task.completed;
      if (currentFilter === "pending") return !task.completed;
      return true;
    });

  filteredTasks.forEach(task => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div>
        <span onclick="toggleTask(${task.index})" class="${task.completed ? 'completed' : ''}">
          ${task.text}
        </span>
        <br>
        <small>${task.dueDate ? "Due: " + task.dueDate : ""}</small>
      </div>

      <div>
        <button onclick="editTask(${task.index})">✏️</button>
        <button onclick="deleteTask(${task.index})">❌</button>
      </div>
    `;

    list.appendChild(li);
  });
}

// Load tasks on start
renderTasks();