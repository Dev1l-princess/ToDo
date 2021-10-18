const input = document.querySelector('#todo-input')
const btnAdd = document.querySelector('#todo-add')
const todoList = document.querySelector('.todo__list')
const todoRemove = document.querySelectorAll('.todo__remove-button')

btnAdd.addEventListener('click', () => {
  const value = input.value

  if (value !== '') 
    todoList.innerHTML += `
      <li class="todo__item">
        <input type="checkbox" class="todo__checkbox">
        <span> ${value} </span>
        <button class="todo__remove-button">X</button>
      </li>
    `

  input.value = ''

  const todoChecks = document.querySelectorAll('.todo__checkbox')
  todoChecks.forEach(input => 
    input.addEventListener('click', e => completeCheck(e))
  )
})

function completeCheck(e) {
  const span = e.target.nextElementSibling
  console.log(span)
  span.style.textDecoration = 'line-through' 
}

todoList.addEventListener('click', e => {
  if (e.target.classList.contains('todo__remove-button')) {
    const li = e.target.closest('li')
    li.remove()
  } else if(e.target.classList.contains('todo__checkbox')) {
    console.log('check');
  }
})