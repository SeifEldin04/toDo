// let toDoInput = document.querySelector('#toDoInput');

// let toDosList = [];
// let cartona = ``;

// if (localStorage.getItem('toDos') != null) {
//     toDosList = JSON.parse(localStorage.getItem('toDos'));
// }
// else {
//     toDosList = [];
// }

// function clearInput() {
//     toDoInput.value = '';
// }

// function displayToDos(data) {
//     let cartona = ``;
//     for (let i = 0; i < toDosList.length; i++) {
//         cartona += `<tr>
//         <td>${i + 1}</td>
//         <td class="completed">${toDosList[i].info}</td>
//         <td><button class="btn btn-danger" id="delBtn" onClick="removeItem(${i})"> <i class="fa-solid fa-trash-can"></i> </button></td>
//     </tr>`
//     }

//     document.querySelector('#toDosInfo').innerHTML = cartona;
// }

// function sendData() {
//     if (toDoInput.value != '') {
//         let toDos = {
//             info: toDoInput.value,
//         }

//         toDosList.push(toDos);
//         localStorage.setItem('toDos', JSON.stringify(toDosList));
//         displayToDos(toDosList);
//         clearInput();
//     }
//     else{
//         document.querySelector('#message').innerHTML = `<p class = "alert alert-danger w-50 mx-auto mt-0"> You should write anything in input </p>`
//     }
// }

// document.querySelector('#sendInfo').addEventListener('click', () => {
//     sendData();
// })

// function removeItem(index) {
//     toDosList.splice(index , 1);
//     localStorage.setItem('toDos' , JSON.stringify(toDosList));
//     displayToDos(toDosList);
// }

// displayToDos(toDosList);





let form = document.querySelector('#form');
let toDoInput = document.querySelector('#toDoInput');
let todosUl = document.querySelector('.todos');
const todoRefresh = JSON.parse(localStorage.getItem('todos'));

if (todoRefresh) {
    todoRefresh.forEach((todo) => {
        addToDo(todo)
    })
}

// form.addEventListener('submit', (e) => {   // when i click enter
//     e.preventDefault();
//     addToDo();
// })

document.querySelector('#sendInfo').addEventListener('click', () => {
    addToDo();
})

function addToDo(todo) {
    let todoText = toDoInput.value;
    if (todo) {
        todoText = todo.text;
    }

    if (todoText) {
        let toDoElement = document.createElement('li');

        // if (todo.completed) {
        //     toDoElement.classList.add('completed');
        // }

        toDoElement.innerText = todoText;
        todosUl.appendChild(toDoElement);
        toDoInput.value = '';

        // toDoElement.addEventListener('click', () => {
        //     toDoElement.classList.toggle('completed')

        //     ubdateLS();
        // })

        toDoElement.addEventListener('click', (e) => {
            e.preventDefault();
            toDoElement.remove();

            ubdateLS();
        })

        toDoElement.addEventListener('touchstart', (e) => {
            e.preventDefault();
            toDoElement.remove();

            ubdateLS();
        })

        ubdateLS();
    }
}

function ubdateLS() {
    const todosElement = document.querySelectorAll('li');
    const todosContainer = [];

    todosElement.forEach((todoEl) => {
        todosContainer.push({
            text: todoEl.innerText,
            // completed: todoEl.classList.contains('completed'),
        })
    })

    localStorage.setItem('todos', JSON.stringify(todosContainer));
}