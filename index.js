// Загрузка списка дел из локального хранилища
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task));
  }
  
  // Сохранение списка дел в локальное хранилище
  function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  // Добавление задачи в DOM
  function addTaskToDOM(task) {
    const todoList = document.getElementById('todo-list');
    const li = document.createElement('li');
    li.classList.add('todo-item');
    if (task.completed) li.classList.add('completed');
    
    li.innerHTML = `
      ${task.text}
      <div>
        <button class="btn-complete">${task.completed ? 'Отменить' : 'Готово'}</button>
        <button class="btn-delete">Удалить</button>
      </div>
    `;
    
    // Кнопка "Готово/Отменить"
    li.querySelector('.btn-complete').addEventListener('click', () => {
      task.completed = !task.completed;
      li.classList.toggle('completed');
      li.querySelector('.btn-complete').textContent = task.completed ? 'Отменить' : 'Готово';
      updateLocalStorage();
    });
    
    // Кнопка "Удалить"
    li.querySelector('.btn-delete').addEventListener('click', () => {
      li.remove();
      const tasks = getTasksFromLocalStorage();
      const filteredTasks = tasks.filter(t => t.text !== task.text);
      saveTasks(filteredTasks);
    });
    
    todoList.appendChild(li);
  }
  
  // Получение списка дел из локального хранилища
  function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
  }
  
  // Обновление локального хранилища
  function updateLocalStorage() {
    const tasks = [];
    document.querySelectorAll('.todo-item').forEach(li => {
      tasks.push({
        text: li.childNodes[0].textContent.trim(),
        completed: li.classList.contains('completed')
      });
    });
    saveTasks(tasks);
  }
  
  // Обработчик для добавления новой задачи
  document.getElementById('add-task').addEventListener('click', () => {
    const newTaskInput = document.getElementById('new-task');
    const taskText = newTaskInput.value.trim();
    
    if (taskText === '') return alert('Нельзя добавить пустое дело!');
    
    const task = { text: taskText, completed: false };
    addTaskToDOM(task);
    const tasks = getTasksFromLocalStorage();
    tasks.push(task);
    saveTasks(tasks);
    newTaskInput.value = '';
  });
  
  // Очистка локального хранилища и обновление интерфейса
  document.getElementById('clear-storage').addEventListener('click', () => {
    localStorage.removeItem('tasks');
    document.getElementById('todo-list').innerHTML = '';
  });
  
  // Загрузка задач при старте
  loadTasks();