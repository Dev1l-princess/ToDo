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

todoList.addEventListener('click', e => {
  const id = e.target.closest('li')?.dataset.id
  const tag = e.target.tagName
  const type = e.target.type
  const checked = e.target.checked;
  const todo = e.target.closest('li')
  if (tag === 'INPUT' && type === 'checkbox') {
    checkTodo(todo)
  }

  if (tag === 'BUTTON') {
    e.target.closest('li').remove()
    removeTodo(id)
  }

  else if (tag === 'SPAN') {
    const target = e.target
    replaceOnInput(target)
  }
})

function fetchTodo() {
  fetch('./assets/php/todo.php')
    .then(res => res.json())
    .then(res => {
      todoList.innerHTML = ''
      res?.forEach(todo => {
        todoList.innerHTML += `
          <li class="todo__item" data-id='${todo.id}'>
            <input type="checkbox" ${todo.checked == true ? 'checked' : ''} class="todo__checked">
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

function checkTodo(todo) {
  const id = todo.dataset.id
  const checked = todo.querySelector('input').checked
  const text = todo.querySelector('span').textContent

  fetch('./assets/php/todo.php', {
    method: 'PUT',
    body: JSON.stringify({
      id: id,
      checked: checked,
      text: text
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



function replaceOnInput(target) {
  const todo = target.closest('li')
  const input = document.createElement('input')
  input.value = target.textContent
  target.replaceWith(input)
  input.focus()
  input.addEventListener('blur', () => {
    replaceOnSpan(input)
    checkTodo(todo)
  })
}

function replaceOnSpan(target) {
  target.insertAdjacentHTML('afterend', 
    `<span>${target.value}</span>`
  )
  target.remove()
}
