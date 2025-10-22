import { TodoList } from "./components/TodoList.js"
import { fetchTodoList } from "./functions/storage.js"
import { createElement } from "./functions/dom.js"

try {
    const todos = await fetchTodoList()
    const list = new TodoList(todos)
    list.appendTo(document.querySelector('#todolist'))
} catch (e) {
    const divError = createElement('div', {class: 'alert alert-danger'})
    divError.textContent = "Une erreur est survenue lors du chargement des tâches."
    document.querySelector('#todolist').append(divError)
}