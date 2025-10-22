/**
 * @typedef {Object} Todo
 * @property {number} id
 * @property {string} content
 * @property {boolean} completed
 */

import { changeStatus, createTodo, deleteTodo, fetchTodoList, filterTodoByStatus, getTodoWithId, updateTodo } from "../functions/storage.js"
import { createElement, filterTodoItems, setActiveFilterButton, toggleAddUpdateButtons } from "../functions/dom.js"


export class TodoList {

    /** @type {Todo[]} */
    #todos = []

    /** @type {HTMLUListElement} */
    #listElement = []

    /**
     * 
     * @param {Todo[]} todos 
     */
    constructor (todos) {
        this.#todos = todos
    }

    /**
     * 
     * @param {HTMLElement} element 
     */
    appendTo (element) {
        element.innerHTML = `<h1>ToDoListWithLocalStorage</h1><form action="" class="d-flex pb-4">
            <input type="hidden" name="id" id="todoId">
            <input type="text" placeholder="Acheter des patates..." class="form-control" name="title" required>
            <button class="btn btn-primary" id="btnAdd" type="submit"><i class="bi bi-plus-circle"></i> Ajouter</button>
            <button class="btn btn-warning" id="btnUpdate" type="submit"><i class="bi bi-arrow-repeat"></i> Mettre à jour</button>
        </form>
        <main>
            <div>                
                <div class="btn-group mb-4">
                    <button class="btn btn-primary" data-filter="all"><i class="bi bi-list-ul"></i> Toutes</button>
                    <button class="btn" data-filter="todo"><i class="bi bi-hourglass-split"></i> A faire</button>
                    <button class="btn" data-filter="done"><i class="bi bi-check2-circle"></i> Faites</button>
                </div>
                <button class="btn btn-danger mb-4" id="resetPage"><i class="bi bi-arrow-repeat"></i> Rafraichir la page</button>
            </div>
            <div class="list-items">
                <div class="empty"> Aucune tâche enregistré </div>
            </div>
        </main>`
        this.#listElement = document.querySelector('.list-items')
        for (let todo of this.#todos) {
            const t = new TodoListItem(todo)
            this.#listElement.append(t.element)
            // this.#listElement.prepend(t.element)
        }

        document.querySelector('form').addEventListener('submit', e => this.#onSubmit(e))
        document.querySelector('#resetPage').addEventListener('click', this.#resetPage)
        element.querySelectorAll('.btn-group button').forEach(button => {
            button.addEventListener('click', (e) => this.#toggleFilter(e))
        })
    }

    #onSubmit (e) {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        const id = form.get('id').trim() || null
        const title = form.get('title').trim()
        if (title && id && id !== '' && id !== '0' && !isNaN(parseInt(id)) && parseInt(id) > 0) {
            this.#updateTodo(id, title)
            e.currentTarget.reset()
        } else if (title) {
            this.#addTodo(title)
            e.currentTarget.reset()
        }else {
            alert('Form not submited !')
        }
    }

    /**
     * @param {string} title
     */
    #addTodo (title) {
        createTodo(title)
            .then(resp => {
                const filter = document.querySelector('.btn-group .btn-primary').getAttribute('data-filter')
                if (filter === 'all' || filter === 'todo') {
                    let newItem = new TodoListItem(resp)
                    this.#listElement.append(newItem.element)
                }
            })
            .catch(err => {
                alert(err)
            })
    }

    /**
     * 
     * @param {number} id
     * @param {string} title 
     */
    #updateTodo (id, title) {
        const todos = updateTodo(id, title)
        const filter = document.querySelector('.btn-group .btn-primary').getAttribute('data-filter')

        // Appliquer le filtre actif
        const filteredTodos = filter === 'all' ? todos : filterTodoByStatus(filter)

        // Recréer la liste
        const list = new TodoList(filteredTodos)
        list.appendTo(document.querySelector('#todolist'))

        // Restaurer le bouton actif
        setActiveFilterButton(filter)

        // Réinitialiser les boutons d'action
        toggleAddUpdateButtons(true)
    }

    #resetPage () {
        const todos = fetchTodoList()
        todos.then(resp => {
            const list = new TodoList(resp)
            list.appendTo(document.querySelector('#todolist'))
        })
        setActiveFilterButton('all')
        toggleAddUpdateButtons(true)
    }

    /**
     * @param {PointerEvent} e 
     */
    #toggleFilter (e) {
        e.preventDefault()
        const filter = e.currentTarget.getAttribute('data-filter')

        let todos = filterTodoByStatus(filter)
        const list = new TodoList(todos)
        list.appendTo(document.querySelector('#todolist'))

        const allItems = this.#listElement.querySelectorAll('.items')
        filterTodoItems(allItems, filter)

        setActiveFilterButton(filter)
    }
}


class TodoListItem {

    #element

    /** @type {Todo} */
    constructor(todo) {
        const id = todo.id
        const itemDiv = createElement('div', {
            class: todo.completed ? 'items is-completed' : 'items'
        })
        this.#element = itemDiv
        const itemLeft = createElement('div', {class: 'item-right'})
        const checkbox = createElement('input', {
            class: 'form-control', 
            type: 'checkbox', 
            id,
            checked: todo.completed ? '' : null
        })
        const label = createElement('span', {
            class: todo.completed ? 'items-close' : null
        })
        label.innerText = todo.content
        const button = createElement('button', {class: 'btn btn-danger action'})
        button.innerHTML = '<i class="bi bi-trash-fill"></i>'

        itemLeft.append(checkbox)
        itemLeft.append(label)
        itemDiv.append(itemLeft)
        itemDiv.append(button)

        label.addEventListener('click', (e) => this.#getTodoById(e.currentTarget))
        button.addEventListener('click', (e) => this.#remove(e.currentTarget))
        checkbox.addEventListener('click', (e) => this.#toggle(e.currentTarget))
    }

    /**
     * @returns {HTMLElement}
     */
    get element () {
        return this.#element
    }

    /**
     * @param {HTMLElement} label 
     */
    #getTodoById (label) {
        const id = label.parentElement.querySelector('input').id
        const todo = getTodoWithId(id)
        document.querySelector("#todoId").value = id
        document.querySelector("input[name='title']").value = todo[0].content
        toggleAddUpdateButtons(false)
    }

    /**
     * @param {PointerEvent} e 
     * @param {number} id
     */
    #remove (element) {
        const id = element.parentElement.querySelector('input').id
        deleteTodo(id)
        element.parentElement.remove()
    }

    /**
     * @param {HTMLElement} checkbox 
     */
    #toggle (checkbox) {
        changeStatus(checkbox.id)        
        if (checkbox.checked) {
            this.#element.classList.add('is-completed')
            this.#element.classList.add('items-close')
        } else {
            this.#element.classList.remove('is-completed')
            this.#element.classList.remove('items-close')
        }

        const allItems = document.querySelectorAll('.items')
        const filter = document.querySelector('.btn-group .btn-primary').getAttribute('data-filter')
        filterTodoItems(allItems, filter)

    }
} 