const input = document.querySelector('#todo-input')
const btnAdd = document.querySelector('#todo-add')
const todoList = document.querySelector('#todo__list')

btnAdd.addEventListener('click', () => {
  const value = input.value
  if (value !== '') 
  sendName(value)
  input.value = ''
})

fetchTodo()

function completeCheck(e) {
  const span = e.target.nextElementSibling
  console.log(span)
  span.style.textDecoration = 'line-through' 
}

todoList.addEventListener('click', e => {
  const id = e.target.closest('li')?.dataset.id
  const tag = e.target.tagName
  const checked = e.target.checked;
  if (id && tag === 'INPUT') {
    checkTodo(id, checked)
  }

  if (id && tag === 'BUTTON') {
    e.target.closest('li').remove()
    removeTodo(id)
  }
})

function fetchTodo() {
  fetch('./assets/php/todo.php')
    .then(res => res.json())
    .then(res => {
      todoList.innerHTML = ''
      res?.forEach(todo => {
        let checked
        if (todo.checked == 1) {
          checked="checked"
        }
        todoList.innerHTML += `
          <li class="todo__item" data-id='${todo.id}'>
            <input type="checkbox" class="todo__checkbox" ${checked}>
            <span> ${todo.text} </span>
            <button class="todo__remove-button">X</button>
          </li>
        `
      })
    })
}

function sendName(todo) {
  fetch('./assets/php/todo.php', {
    method: 'POST',
    body: JSON.stringify({
      todo: todo
    })
  }).then(res => fetchTodo())
}

function checkTodo(id, checked) {
  fetch('./assets/php/todo.php', {
    method: 'PUT',
    body: JSON.stringify({
      id: id,
      checked: checked
    })
  })
}

function removeTodo(id) {
  fetch('./assets/php/todo.php', {
    method: 'DELETE',
    body: JSON.stringify({
      id: id,
    })
  })
}


