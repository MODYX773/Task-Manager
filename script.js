// العناصر المهمة من HTML
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// تحميل المهام المحفوظة من Local Storage عند بداية تشغيل التطبيق
document.addEventListener('DOMContentLoaded', loadTasks);

// إضافة حدث عند الضغط على زر إضافة المهمة
addTaskBtn.addEventListener('click', addTask);

// دالة لإضافة مهمة جديدة
function addTask() {
  const taskText = taskInput.value;

  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }

  const li = document.createElement('li');
  li.innerHTML = `${taskText} <button class="delete-btn">Delete</button>`;
  
  // إضافة حدث لتحديد المهمة كمكتملة
  li.addEventListener('click', function() {
    li.classList.toggle('completed');
    saveTasks();
  });

  // إضافة حدث لزر الحذف
  li.querySelector('.delete-btn').addEventListener('click', function(e) {
    e.stopPropagation();
    li.remove();
    saveTasks();
  });

  taskList.appendChild(li);
  taskInput.value = ''; // إفراغ حقل الإدخال
  saveTasks();
}

// دالة لحفظ المهام في Local Storage
function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll('li').forEach(li => {
    tasks.push({
      text: li.firstChild.textContent.trim(),
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// دالة لتحميل المهام من Local Storage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `${task.text} <button class="delete-btn">Delete</button>`;

    if (task.completed) {
      li.classList.add('completed');
    }

    li.addEventListener('click', function() {
      li.classList.toggle('completed');
      saveTasks();
    });

    li.querySelector('.delete-btn').addEventListener('click', function(e) {
      e.stopPropagation();
      li.remove();
      saveTasks();
    });

    taskList.appendChild(li);
  });
}