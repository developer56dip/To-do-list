let taskList = document.getElementById('taskList');
let taskInput = document.getElementById('taskInput');
let dateInput = document.getElementById('dateInput');

window.onload = loadTasks;

function addTask() {
  let text = taskInput.value.trim();
  let date = dateInput.value;

  if (text === '') return;

  let li = document.createElement('li');
  li.innerHTML = `
    <div class="task-header">
      <span class="task-text">${text}</span>
      <div class="task-buttons">
        <button onclick="editTask(this)">✏️</button>
        <button onclick="deleteTask(this)">❌</button>
        <button onclick="toggleDone(this)">✅</button>
      </div>
    </div>
    <small>${formatDateTime(date)}</small>
  `;
  taskList.appendChild(li);
  taskInput.value = '';
  dateInput.value = '';
  saveTasks();
}

function editTask(button) {
  let taskText = button.closest('li').querySelector('.task-text');
  let newText = prompt('Edit your task:', taskText.textContent);
  if (newText !== null && newText.trim() !== '') {
    taskText.textContent = newText.trim();
    saveTasks();
  }
}

function deleteTask(button) {
  button.closest('li').remove();
  saveTasks();
}

function toggleDone(button) {
  button.closest('li').classList.toggle('done');
  saveTasks();
}

function formatDateTime(dateString) {
  if (!dateString) return '';
  let d = new Date(dateString);
  return d.toLocaleString();
}

function saveTasks() {
  localStorage.setItem('tasks', taskList.innerHTML);
}

function loadTasks() {
  taskList.innerHTML = localStorage.getItem('tasks') || '';
}
