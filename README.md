# 📝 ToDoListJsWithLocalStorage

![GitHub last commit](https://img.shields.io/github/last-commit/victoire20/ToDoListJsWithLocalStorage?style=for-the-badge)
![GitHub top language](https://img.shields.io/github/languages/top/victoire20/ToDoListJsWithLocalStorage?style=for-the-badge)
![License](https://img.shields.io/github/license/victoire20/ToDoListJsWithLocalStorage?style=for-the-badge)
![GitHub repo size](https://img.shields.io/github/repo-size/victoire20/ToDoListJsWithLocalStorage?style=for-the-badge)

Une application **To-Do List** développée en **JavaScript pur (Vanilla JS)**, qui permet de **créer, modifier, filtrer et supprimer des tâches**.  
Toutes les données sont **stockées localement** dans le **Local Storage du navigateur**, sans besoin de base de données ni de serveur backend.

---

## 📁 Structure du projet

├── components/

│   └── TodoList.js      # Composant principal de la Todo List

│

├── functions/

│   ├── storage.js           # Fonctions utilitaires pour manipulé les données enregistré dans le localStorage

│   └── dom.js           # Fonction utilitaire pour créer ou manipuler des éléments DOM

│

├── app.js               # Point d'entrée principal

├── index.html           # Page HTML principale

└── style.css            # Styles CSS de base

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
