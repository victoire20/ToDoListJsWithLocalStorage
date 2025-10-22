/**
 * @typedef {Object} Todo
 * @property {number} id
 * @property {string} content
 * @property {boolean} completed
 */


/**
 * 
 * @param {string} content 
 * @return {Promise<Todo>}
 */
export async function createTodo(content) {
    const data = JSON.parse(localStorage.getItem('todos'))
    const newTodo = {
        id: Date.now(),
        content: content,
        completed: false
    }
    data.push(newTodo)
    localStorage.setItem('todos', JSON.stringify(data))
    return newTodo
}

/**
 * 
 * @returns {Promise<Todo[]>}
 */
export async function fetchTodoList() {
    const data = JSON.parse(localStorage.getItem('todos')) || []
    if (data.length === 0) {
        localStorage.setItem('todos', JSON.stringify([]))
    }
    return data
}

/**
 * 
 * @param {number} id 
 * @returns {Promise<Todo>}
 */
export function getTodoWithId(id) {
    const data = JSON.parse(localStorage.getItem('todos'))
    return data.filter(todo => {
        if (todo.id === parseInt(id)) {
            return todo
        }
    })
}

/**
 * Le status ici représente l'attribut completed et prend comme valeur (all, todo, done)
 * all => Tous les éléments quelque soit le status
 * todo => Tous les élément qui ont pour valeur false l'attribut completed
 * done => Tous les éléments qui ont pour valeur true l'attribut completed
 * @param {string} status 
 */
export function filterTodoByStatus(status) {
    const data = JSON.parse(localStorage.getItem('todos'))
    if (status === 'todo') {
        return data.filter(item => {
            if (item.completed === false) {
                return item
            }
        })
    } else if(status === 'done') {
        return data.filter(item => {
            if (item.completed === true) {
                return item
            }
        })
    } else {
        return data
    }
}

/**
 * 
 * @param {number} id 
 * @param {string} content 
 * @returns {Promise<Todo[]>}
 */
export function updateTodo(id, content) {
    const data = JSON.parse(localStorage.getItem('todos'))
    data.forEach(item => {
        if (item.id === parseInt(id)) {
            item.content = content
        }
    })
    localStorage.setItem('todos', JSON.stringify(data))
    return data
}

/**
 * 
 * @param {number} id 
 * @returns {<Todo[]>} 
 */
export function changeStatus(id) {
    const data = JSON.parse(localStorage.getItem('todos'))
    data.forEach(item => {
        if (item.id === parseInt(id)) {
            item.completed = !item.completed
        }
    })
    localStorage.setItem('todos', JSON.stringify(data))
    return data
}

/**
 * 
 * @param {number} id
 * @returns {Promise<Todo[]>} 
 */
export function deleteTodo(id) {
    let data = localStorage.getItem('todos')
    data = JSON.parse(data).filter((item) => {
        if (item.id !== parseInt(id)) {
            return item
        }
    })
    localStorage.setItem('todos', JSON.stringify(data))
    return data
}