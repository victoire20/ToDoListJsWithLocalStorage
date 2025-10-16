/**
 * @typedef {Object} Todo
 * @property {number} id
 * @property {string} content Contenu du ToDo
 * @property {boolean} terminer Etat du ToDo
 */

/**
 * 
 * @param {string} tagName 
 * @param {Array<string>} classnames 
 * @returns {HTMLElement}
 */
const createHTMLElement = (tagName, classnames) => {
    const element = document.createElement(tagName)
    if(classnames) {
        classnames.forEach(classname => element.classList.add(classname))
    }
    return element
}

/**
 * 
 * @param {Array<Todo>} data 
 */
const createListItemHTMLElement = (data) => {
    const list = document.querySelector('.list-items')
    if(!data || data.length === 0) {
        list.innerHTML = '<p class="empty">Aucune tâche pour le moment</p>'
    } else  {
        list.innerHTML = ''
        data.forEach(({ id, content, terminer }) => {
            const itemDiv = createHTMLElement('div', ['items'])
            // input + span à gauche
            const itemLeft = createHTMLElement('div', ['item-right'])
            const checkbox = createHTMLElement('input', ['form-control'])
            checkbox.type = 'checkbox'
            checkbox.value = id
            checkbox.checked = !!terminer
            
            const textSpan = createHTMLElement('span')
            textSpan.innerText = content
            if (terminer) {
                textSpan.classList.add('items-close')
            } else {
                textSpan.classList.remove('items-close')
            }

            // Bouton à droite
            const deleteBtn = createHTMLElement('button', ['btn', 'btn-danger', 'action'])
            deleteBtn.innerHTML = '<i class="bi bi-trash-fill"></i>'

            itemLeft.appendChild(checkbox)
            itemLeft.appendChild(textSpan)
            itemDiv.appendChild(itemLeft)
            itemDiv.appendChild(deleteBtn)
            list.appendChild(itemDiv)
        })
    }
}

/**
 * centralisation de la gestion des boutons de filtre
 * 
 * @param {HTMLElement} currentTarget 
 */
const handleFilterButtons = (currentTarget) => {
    
    const buttons = Array.from(document.querySelector('.btn-group').children);
    const autres = buttons.filter(btn => btn !== currentTarget);
    autres.forEach(btn => btn.classList.remove('btn-primary'))
    
    if(currentTarget === undefined) {
        document.querySelector('.btnAllTodo').classList.add('btn-primary')
    } else {
        currentTarget.classList.add('btn-primary')
    }
}

/**
 * 
 * @param {number} id 
 * @returns {Array<Todo>}
 */
const filterTodoListById = (id) => {
    return createOrGetLocalStorageData().filter(todo => todo.id !== id)
}

/**
 * 
 * @param {boolean} status 
 * @returns {Array<Todo>}
 */
const filterTodoListByStatus = (status) => {
    return createOrGetLocalStorageData().filter(todo => todo.terminer === status)
}

/**
  * Récupère ou met à jour la liste des tâches dans le localStorage
 * @param {Array<Todo>} [payload] - Nouvelle liste à enregistrer (optionnel)
 * @returns {Array<Todo>} - Liste des tâches
 * @throws {Error} - Si l'accès au localStorage est refusé
 */
const createOrGetLocalStorageData = (payload) => {
    try {
        if(payload) {
            localStorage.setItem('data', JSON.stringify(payload))
            return
        }
        let data = localStorage.getItem('data')
        if(!data) {
            return []
        }
        return JSON.parse(data)
    } catch (e) {
    if (e instanceof DOMException && e.name === 'SecurityError' || e.code === 18) {
            alert("Accès au stockage local réfusé. Veuillez vérifier les paramètres de votre navigateur.")
            return []
        }
        throw e
    }
}

/**
 * @param {Array<Todo>} data
 * @returns {HTMLElement}
 */
const fetchAllTodo = (data) => {
    if(!data) {
        data = createOrGetLocalStorageData()
    }
    createListItemHTMLElement(data)
}
fetchAllTodo()

const createNewTodo = (e) => {
    let dataStorage = createOrGetLocalStorageData()

    let lengthData = dataStorage.length
    let form = e.currentTarget
    let formData = new FormData(form)
    let payload = {}
    if (formData.get('inputContent')) {
        payload = {
            id: lengthData + 1,
            content: formData.get('inputContent'),
            terminer: false
        }
        dataStorage.push(payload)
        form.reset()
        createOrGetLocalStorageData(dataStorage)
        fetchAllTodo()
    } else {
        alert('Veuillez remplire le champ!')
    }
}

/**
 * 
 * @param {Array<Todo>} data 
 * @param {number} id 
 * @returns {Todo}
 */
const getTodo = (data, id) => {
    return data.filter(e => {
        return e && e.id === id
    })
}

/**
 * 
 * @param {Array<Todo>} data 
 * @param {Array<Todo>} payload 
 * @returns {Array<Todo>}
 */
const updateTodo = (data, payload) => {
    return data.map(item => {
        if(item.id === payload.id) {
            item = {
                id: payload.id, 
                content: payload?.content !== undefined ? payload.content : item.content, 
                terminer: payload?.terminer !== undefined ? payload.terminer : item.terminer
            }
        }
        return {...item}
    })
}

/**
 * Ajouter une nouvelle ToDo
 */
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const todoId = document.querySelector('#todoId').value
        if(todoId) {
            let form = e.currentTarget
            let formData = new FormData(form)
            let content = formData.get('inputContent')
            let newTotoList = updateTodo(createOrGetLocalStorageData(), {id: parseInt(todoId), content: content})
            createOrGetLocalStorageData(newTotoList)
            document.querySelector("form").reset()
            document.querySelector('#btnAdd').style.display = "block"
            document.querySelector('#btnUpdate').style.display = "none"
            fetchAllTodo()
        } else {
            createNewTodo(e)
        }
        handleFilterButtons()
    })
}

/**
 * Gérer les événements de la liste des ToDo (cocher, modifier, supprimer)
 */
const listItems = document.querySelector('.list-items')
if (listItems) {
    listItems.addEventListener('click', (e) => {
        /**
         * Cocher la ToDo
         */
        if (e.target && e.target.matches("input[type='checkbox']")) {
            const btnGroup = document.querySelector(".btn-group > .btn-primary")
            let isChecked = e.target.checked
            let inputValue = e.target.value
            let terminer = isChecked ? true : false
            let newTodoList
            createOrGetLocalStorageData(
                updateTodo(createOrGetLocalStorageData(), {id: parseInt(inputValue), terminer: terminer})
            )
            
            if(btnGroup.classList.contains('btnOpenTodo')) {
                newTodoList = filterTodoListByStatus(false)
            }
            if(btnGroup.classList.contains('btnCloseTodo')) {
                newTodoList = filterTodoListByStatus(true)
            }
            fetchAllTodo(newTodoList)
        }

        /**
         * Cliquer sur le texte pour le modifier
         */
        if(e.target && e.target.matches("span")) {
            let todoId = e.target.closest('.items').querySelector("input[type='checkbox']").value
            let todo = getTodo(createOrGetLocalStorageData(), parseInt(todoId))[0]
            document.querySelector("input[name='inputContent']").value = todo.content
            document.querySelector('#btnAdd').style.display = "none"
            document.querySelector('#btnUpdate').style.display = "block"
            document.querySelector('#todoId').value = todo.id
        }

        /**
         * Supprimer la ToDo
         */
        if (e.target && e.target.matches("button.action, button.action *")) {
            const btnGroup = document.querySelector(".btn-group > .btn-primary")
            let itemDiv = e.target.closest('.items')
            if(itemDiv) {
                let checkboxValue = itemDiv.querySelector("input[type='checkbox']").value
                let newTodoList = filterTodoListById(parseInt(checkboxValue))
                createOrGetLocalStorageData(newTodoList)
            
                if(btnGroup.classList.contains('btnOpenTodo')) {
                    newTodoList = filterTodoListByStatus(false)
                }
                if(btnGroup.classList.contains('btnCloseTodo')) {
                    newTodoList = filterTodoListByStatus(true)
                }
                fetchAllTodo(newTodoList)
            }
        }
    })
}

/**
 * Gère le filtrage des tâches selon le bouton sélectionné dans le groupe de boutons.
 * Les classes suivantes représentent les boutons :
 *   .btnAllTodo   => Toutes
 *   .btnOpenTodo  => A faire
 *   .btnCloseTodo => Faites
 *
 * @event click
 */
const btnGroup = document.querySelector('.btn-group')
if (btnGroup) {
    btnGroup.addEventListener('click', (e) => {
        if(e.target.classList.contains('btn')) {
            let newTodoList
            handleFilterButtons(e.target)

            if(e.target && e.target.matches("button.btnAllTodo")) {
                fetchAllTodo()
                return
            }
            if (e.target && e.target.matches("button.btnOpenTodo")) {
                newTodoList = filterTodoListByStatus(false)
            }
            if (e.target && e.target.matches("button.btnCloseTodo")) {
                newTodoList = filterTodoListByStatus(true)
            }
            fetchAllTodo(newTodoList)
        }
    })
}

const resetBtn = document.querySelector('#resetPage')
if (resetBtn) {
    resetBtn.addEventListener('click', (e) => {
        e.preventDefault()
        document.querySelector('form').reset()
        document.querySelector('#btnAdd').style.display = "block"
        document.querySelector('#btnUpdate').style.display = "none"
        
        handleFilterButtons()
        fetchAllTodo()
    })
}
