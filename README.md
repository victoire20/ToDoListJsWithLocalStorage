# 📝 ToDoListJsWithLocalStorage

Une application **To-Do List** développée en **JavaScript pur (Vanilla JS)**, qui permet de **créer, modifier, filtrer et supprimer des tâches**.  
Toutes les données sont **stockées localement** dans le **Local Storage du navigateur**, sans besoin de base de données ni de serveur backend.

---

## 🚀 Fonctionnalités principales

- ✅ Ajouter une nouvelle tâche  
- ✅ Marquer une tâche comme terminée ou non terminée  
- ✅ Modifier le contenu d’une tâche  
- ✅ Supprimer une tâche  
- ✅ Filtrer les tâches par état :
  - Toutes  
  - À faire  
  - Terminées  
- 💾 Sauvegarde automatique dans le **Local Storage**

---

## 🧩 Technologies utilisées

- **HTML5** – structure de la page  
- **CSS3 / Bootstrap Icons** – mise en forme et icônes  
- **JavaScript (ES6)** – logique de gestion des tâches  
- **Local Storage API** – persistance locale des données  

---

## 🧠 Structure du code

Le fichier principal est `app.js`.  
Voici les principales fonctions :

### 🔹 `createHTMLElement(tagName, classnames)`
Crée dynamiquement un élément HTML avec les classes spécifiées.

### 🔹 `createListItemHTMLElement(data)`
Affiche la liste des tâches dans le DOM.

### 🔹 `createOrGetLocalStorageData(payload?)`
Crée ou récupère la liste des tâches depuis le **Local Storage**.

### 🔹 `createNewTodo(e)`
Ajoute une nouvelle tâche à la liste.

### 🔹 `updateTodo(data, payload)`
Met à jour une tâche existante (contenu ou état).

### 🔹 `filterTodoListByStatus(status)`
Filtre les tâches selon leur statut (`terminer = true / false`).

### 🔹 `handleFilterButtons(currentTarget)`
Met à jour la mise en surbrillance du bouton de filtre actif.

### 🔹 `fetchAllTodo(data?)`
Recharge l’affichage des tâches.

---

## 💡 Fonctionnement

1. L’utilisateur saisit une tâche dans le champ texte, puis clique sur **« Ajouter »**.  
2. La tâche est sauvegardée dans le **Local Storage** et affichée immédiatement.  
3. Chaque tâche peut être :
   - ✅ **Cochée** pour marquer comme terminée,  
   - ✏️ **Cliquée** pour être modifiée,  
   - 🗑️ **Supprimée** via le bouton correspondant.  
4. Les boutons de filtre permettent d’afficher :
   - Toutes les tâches,  
   - Celles à faire,  
   - Ou celles déjà terminées.  

---

## ⚙️ Installation et utilisation

1. Clone le dépôt :
   ```bash
   git clone https://github.com/ton-compte/ToDoListJsWithLocalStorage.git
