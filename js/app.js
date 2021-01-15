// Define UI variables

const form = document.getElementById('task-form');
const newTask =  document.getElementById('task');
const taskList = document.querySelector('.collection')
const filter = document.getElementById('filter');
const clearBtn = document.querySelector('.btn-clear');

loadAllEventListeners();

function loadAllEventListeners() {
    // Get Tasks
    document.addEventListener('DOMContentLoaded', getTasks)
    // Add task
    form.addEventListener('submit', addTask)
    // Remove Task
    taskList.addEventListener('click', removeTask)
    // Clear button
    clearBtn.addEventListener('click', clearAllTasks)
    // Filter tasks
    filter.addEventListener('keyup', filterTasks)
}

// Get Tasks from LS
function getTasks() {

    let tasks;
    
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }




    tasks.forEach(function(task) {
    // Create li
    const li = document.createElement('li');
    // Add a class
    li.className = 'collection-task';
    // Create a text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create a link element
    const deleteLink = document.createElement('a');
    // Add a class
    deleteLink.className = 'delete-task';
    // Add delete icon
    deleteLink.innerHTML = '<i class="fas fa-trash-alt"></i>';
    // Append deleteLink to li
    li.appendChild(deleteLink)
    // Append li to ul
    taskList.appendChild(li);
    })


   
}

// Add Task
function addTask(e) {
    if(newTask.value === '') {
        alert('Please add a task')
    } else {
    // Create li
    const li = document.createElement('li');
    // Add a class
    li.className = 'collection-task';
    // Create a text node and append to li
    li.appendChild(document.createTextNode(newTask.value));
    // Create a link element
    const deleteLink = document.createElement('a');
    // Add a class
    deleteLink.className = 'delete-task';
    // Add delete icon
    deleteLink.innerHTML = '<i class="fas fa-trash-alt"></i>';
    // Append deleteLink to li
    li.appendChild(deleteLink)
    // Append li to ul
    taskList.appendChild(li);
        
    // Store new task in local storage
      storeTasksInLocalStorage(newTask.value)
    }




    // Clear input
    newTask.value = '';
    e.preventDefault();
}

// Store tasks in LocalStorage
function storeTasksInLocalStorage(task) {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


    // Remove Task
    function removeTask(e) {
        if(e.target.parentElement.classList.contains('delete-task')) {
            if(confirm('Are You Sure?')) {
                e.target.parentElement.parentElement.remove();
            }
        }

        // Remove task from local storage
        removeTaskFromLocalStorage(e.target.parentElement.parentElement)
    }
    
    // Remove task from local storage
    function removeTaskFromLocalStorage(taskItem) {
        let tasks;

        if(localStorage.getItem('tasks') === null) {
            tasks = []
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'))
        }

        tasks.forEach(function(task, index) {
            if(taskItem.textContent === task) {
                tasks.splice(index, 1)
            }
        })

        localStorage.setItem('tasks', JSON.stringify(tasks))
    }

     // Clear All Tasks
     function clearAllTasks() {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }

        clearTasksFromLocalStorage()
     }

     // Clear tasks from local storage
     function clearTasksFromLocalStorage() {
         localStorage.clear()
     }

     // Filter tasks
     function filterTasks(e) {
         const text = e.target.value.toLowerCase();


         document.querySelectorAll('.collection-task').forEach(function(task) {
             const item = task.firstChild.textContent;

             if(item.toLowerCase().indexOf(text) != -1) {
                 task.style.display = 'block'
             } else {
                 task.style.display = 'none'
             }
         })
     }