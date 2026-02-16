const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const filterButtons = document.querySelectorAll('.btn-filter');
const taskCounter = document.getElementById('taskCounter');

let currentFilter = 'all';

function createTaskElement(taskText) {
  const taskItem = document.createElement('li');
  taskItem.className = 'task-item';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'task-checkbox';

  const taskTextSpan = document.createElement('span');
  taskTextSpan.className = 'task-text';
  taskTextSpan.textContent = taskText;

  const deleteButton = document.createElement('button');
  deleteButton.className = 'btn-delete';
  deleteButton.textContent = 'Delete';

  taskItem.appendChild(checkbox);
  taskItem.appendChild(taskTextSpan);
  taskItem.appendChild(deleteButton);

  return taskItem;
}

function handleCheckboxChange(event) {
  const taskItem = event.target.closest('.task-item');
  
  if (event.target.checked) {
    taskItem.classList.add('completed');
  } else {
    taskItem.classList.remove('completed');
  }
  updateCounter();
  applyFilter();
}

function handleDeleteClick(event) {
  const taskItem = event.target.closest('.task-item');
  taskItem.remove();
  updateCounter();
  applyFilter();
}

function handleFormSubmit(event) {
  event.preventDefault();

  const taskText = taskInput.value.trim();

  if (taskText === '') {
    return;
  }

  const taskElement = createTaskElement(taskText);
  taskList.appendChild(taskElement);

  taskInput.value = '';
  taskInput.focus();
  
  updateCounter();
  applyFilter();
}

function handleFilterClick(event) {
  const filter = event.target.dataset.filter;
  currentFilter = filter;

  filterButtons.forEach(button => button.classList.remove('active'));
  event.target.classList.add('active');

  applyFilter(filter);
}

function applyFilter(filter = 'all') {
  const taskItems = document.querySelectorAll('.task-item');
  
  taskItems.forEach(item => {
    const isCompleted = item.classList.contains('completed');
    switch (filter) {
      case 'all':
        item.classList.remove('is-hidden');
        break;
      case 'active':
        item.classList.toggle('is-hidden', isCompleted);
        break;
      case 'completed':
        item.classList.toggle('is-hidden', !isCompleted);
        break;
    }
  });
}

function updateCounter() {
  const taskItems = document.querySelectorAll('.task-item');
  const activeTasks = Array.from(taskItems).filter(item => !item.classList.contains('completed'));
  const count = activeTasks.length;
  
  taskCounter.textContent = count === 1 ? '1 task left' : `${count} tasks left`;
}

taskForm.addEventListener('submit', handleFormSubmit);

taskList.addEventListener('change', (event) => {
  if (event.target.classList.contains('task-checkbox')) {
    handleCheckboxChange(event);
  }
});

taskList.addEventListener('click', (event) => {
  if (event.target.classList.contains('btn-delete')) {
    handleDeleteClick(event);
  }
});

filterButtons.forEach(button => {
  button.addEventListener('click', handleFilterClick);
});
