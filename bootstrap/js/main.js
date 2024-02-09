// let form = document.querySelector('#form');
let taskInp = document.querySelector('#taskInp');
let filterTasks = document.querySelector('#filterTasks');

let sendTasks = document.querySelector('#sendTasks');
let ubdateTasks = document.querySelector('#ubdateTasks');

let clearTasks = document.querySelector('#clearTasks');

let tasksContainer = [];
let cartona = ``;


if (localStorage.getItem('tasks') != null) {
    tasksContainer = JSON.parse(localStorage.getItem('tasks'));
    displayTasks(tasksContainer);
}
else {
    tasksContainer = [];
}


function displayTasks(data) {
    cartona = ``;
    for (let i = 0; i < tasksContainer.length; i++) {
        cartona += `<tr class="d-flex justify-content-between align-items-center ${tasksContainer[i].completed ? 'completed' : ''}">
        <td class="">${i + 1} - ${tasksContainer[i].task}</td>
        <td>
            <button class="btn bg-danger text-white"><i class="fas fa-trash" onclick="removeTask(${i})"></i></button>
            <button class="btn bg-warning text-white"><i class="fas fa-pencil" onclick="ubdateTask(${i})"></i></button>
        </td>

    </tr>`
    }

    document.querySelector('#tableBody').innerHTML = cartona;

    if (tasksContainer.length > 0) {
        clearTasks.classList.replace('d-none', 'd-block');
    }
    else {
        clearTasks.classList.replace('d-block', 'd-none');
    }
}


function sendData() {
    if (taskInp.value == '') {
        document.querySelector('#message').innerHTML = `<p class="fw-bold text-center" style="color: #04AA6D;">Task input is required</p>`
    }
    else {
        document.querySelector('#message').innerHTML = ``;
        let tasks = {
            task: taskInp.value,
            completed: false
        };
        tasksContainer.push(tasks);
        localStorage.setItem('tasks', JSON.stringify(tasksContainer));
        displayTasks(tasksContainer);
        taskInp.value = '';
    }
}
document.querySelector('#sendTasks').addEventListener('click', () => {
    sendData();
})


// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     if (ubdateTasks.classList.contains('d-none')) {
//         sendData();

//     }
//     else{
//         ubdateTask();
//     }
// })


function removeTask(index) {
    tasksContainer.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasksContainer));
    displayTasks(tasksContainer);
}


function removeAllTasks() {
    localStorage.removeItem('tasks');
    tasksContainer.splice(0);
    displayTasks(tasksContainer);
}

document.querySelector('#clearTasks').addEventListener('click', () => {
    removeAllTasks();
})


// function writeOffTask(index) {
//     let taskElement = document.querySelectorAll('tr')[index];
//     taskElement.classList.toggle('completed');

//     tasksContainer[index].completed = taskElement.classList.contains('completed');
//     localStorage.setItem('tasks', JSON.stringify(tasksContainer));
// }


function ubdateTask(index) {
    taskInp.value = tasksContainer[index].task;
    sendTasks.classList.add('d-none');
    ubdateTasks.classList.replace('d-none', 'd-block');
    currentIndex = index;
}


var currentIndex = 0;

function saveTask() {
    tasksContainer[currentIndex].task = taskInp.value;
    localStorage.setItem('tasks', JSON.stringify(tasksContainer));
    displayTasks(tasksContainer);
    taskInp.value = '';
    ubdateTasks.classList.replace('d-block', 'd-none');
    sendTasks.classList.remove('d-none');
}
ubdateTasks.addEventListener('click', () => {
    saveTask();
})


function searchTask(term) {
    let cartona = '';
    let found = false; // Flag variable to track if a match is found

    for (let i = 0; i < tasksContainer.length; i++) {
        if (tasksContainer[i].task.toLowerCase().includes(term.toLowerCase())) {
            // If the task includes the search term (case-insensitive), generate a table row and append it to 'cartona'
            cartona += `<tr class="d-flex justify-content-between align-items-center ${tasksContainer[i].completed ? 'completed' : ''}">
            <td class="">${i + 1} - ${tasksContainer[i].task}</td>
            <td>
                <button class="btn bg-danger text-white"><i class="fas fa-trash" onclick="removeTask(${i})"></i></button>
                <button class="btn bg-warning text-white"><i class="fas fa-pencil" onclick="ubdateTask(${i})"></i></button>
            </td>
        </tr>`;
            found = true; // Set the flag to true since a match is found
        }
    }

    if (found) {
        // If any tasks match the search term, display the results and clear the "Not Found" message
        document.querySelector('#message2').innerHTML = '';
        document.querySelector('#tableBody').innerHTML = cartona;
        clearTasks.classList.replace('d-none', 'd-block');
    } else {
        // If no tasks match the search term, display the "Not Found" message
        document.querySelector('#message2').innerHTML = `<p class="fw-bold text-center" style="color: #04AA6D;">Your search not found</p>`;
        document.querySelector('#tableBody').innerHTML = '';
        clearTasks.classList.replace('d-block', 'd-none')
    }
}


const toggleBtn = document.getElementById('toggleBtn');
const taskContain = document.getElementById('taskContain');

// Check if the theme preference is already stored in localStorage
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
    // Apply the saved theme
    applyTheme(savedTheme);
}

// Add an event listener to the toggle button
toggleBtn.addEventListener('change', function () {
    if (toggleBtn.checked) {
        // Apply the "dark" theme
        applyTheme('dark');
    } else {
        // Apply the "light" theme
        applyTheme('light');
    }
});

function applyTheme(theme) {
    // Update the localStorage with the selected theme
    localStorage.setItem('theme', theme);

    // Apply the theme to the taskContain element
    if (theme === 'dark') {
        document.querySelector('body').classList.add('dark-mode');
        $('input').css({ 'color': 'gainsboro' });

        $('h4').css({ 'color': '#fff' });

        document.querySelector('#clearTasks').classList.replace('btn-dark', 'btn-light');

        taskInp.classList.add('inputBg');

        filterTasks.classList.add('inputBg');

        // Keep the toggleBtn in the checked state
        toggleBtn.checked = true;
    } else {
        document.querySelector('body').classList.remove('dark-mode');

        $('input').css({ 'color': 'black' });

        document.querySelector('#clearTasks').classList.replace('btn-light', 'btn-dark');

        taskInp.classList.remove('inputBg');

        filterTasks.classList.remove('inputBg');

        $('h4').css({ 'color': '#000' });

        // Keep the toggleBtn in the unchecked state
        toggleBtn.checked = false;
    }
}