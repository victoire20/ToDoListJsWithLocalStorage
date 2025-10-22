/**
 * 
 * @param {string} tagName 
 * @param {Object} attributes 
 * @returns {HTMLElement}
 */
export function createElement(tagName, attributes={}) {
    const element = document.createElement(tagName)
    for (let [attribute, value] of Object.entries(attributes)) {
        if (value !== null) {
            element.setAttribute(attribute, value)
        }
    }
    return element
}

/**
 * Mettre à jour le bouton actif en fonction du filtre sélectionné.
 * @param {string|null} filter
 */
export function setActiveFilterButton(filter=null) {
    const buttons = document.querySelectorAll('.btn-group button')
    buttons.forEach(btn => btn.classList.remove('btn-primary'))

    if(filter) {
        const btn = document.querySelector(`.btn-group button[data-filter="${filter}"]`)
        btn.classList.add('btn-primary')
    } else {
        const btn = document.querySelector(`.btn-group button[data-filter="all"]`)
        btn.classList.add('btn-primary')
    }
}

/**
 * Filtrer les éléments de la liste des tâches en fonction du filtre sélectionné.
 * @param {HTMLUListElement} items 
 * @param {string} filter 
 */
export function filterTodoItems(items, filter) {
    items.forEach(item => {
        if (filter === 'all') {
            item.classList.remove('hide')
        } else if (filter === 'todo') {
            item.classList.toggle('hide', item.classList.contains('is-completed'))
        } else if (filter === 'done') {
            item.classList.toggle('hide', !item.classList.contains('is-completed'))
        }
    })
}

/**
 * Afficher le bouton "Ajouter" ou "Mettre à jour" en fonction du contexte.
 * @param {boolean} showAdd 
 */
export function toggleAddUpdateButtons(showAdd=true) {
    const btnAdd = document.querySelector('#btnAdd')
    const btnUpdate = document.querySelector('#btnUpdate')
    if (showAdd) {
        btnAdd.style.display = 'block'
        btnUpdate.style.display = 'none'
    } else {
        btnAdd.style.display = 'none'
        btnUpdate.style.display = 'block'
    }
}