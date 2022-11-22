/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style/main.scss":
/*!*****************************!*\
  !*** ./src/style/main.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://todo-task/./src/style/main.scss?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style/main.scss */ \"./src/style/main.scss\");\n\r\n\r\nconst listsContainer = document.querySelector('[data-lists]')\r\nconst newListForm = document.querySelector('[data-new-list-form]')\r\nconst newListInput = document.querySelector('[data-new-list-input]')\r\nconst deleteListButton = document.getElementById('data-delete')\r\nconst listDisplay = document.getElementById('display-list')\r\nconst titleDisplay = document.getElementById('display-title')\r\nconst tasksDisplay = document.getElementById('display-tasks')\r\nconst taskTemplate =  document.getElementById('task-template')\r\nconst createTask  = document.getElementById('create-task')\r\nconst createInput  = document.getElementById('new-input')\r\nconst clearBtn = document.getElementById('clear-btn')\r\nconst editButton = document.getElementById(\"data-update\");\r\n\r\n\r\n\r\n\r\nconst LOCAL_STORAGE_LIST_KEY = 'task.lists'\r\nconst LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId'\r\nlet lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY )) ||  []\r\nlet selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY)\r\n\r\nlistsContainer.addEventListener('click', e => {\r\n    if (e.target.tagName.toLowerCase() === 'li') {\r\n      selectedListId = e.target.dataset.listId\r\n      saveAndRender()\r\n    }\r\n  })\r\n\r\ntasksDisplay.addEventListener('click', e => {\r\n    if(e.target.tagName.toLowerCase() === 'input') {\r\n        const selectedList = lists.find(list => list.id === selectedListId)\r\n        const selectedTask = selectedList.tasks.find(task => task.id === e.target.id)\r\n        selectedTask.complete = e.target.checked\r\n        save()\r\n    }\r\n})\r\neditButton.addEventListener('click', e=> {\r\n    const selectedList = lists.find(list => list.id === selectedListId)\r\n    const selectedCheckBoxs = document.querySelectorAll('input[type=\"checkbox\"]:checked');\r\n    const NameOfItem = selectedList.tasks.filter(task => task.id == selectedCheckBoxs[0].id)[0]['name']\r\n    \r\n    createInput.value = NameOfItem;\r\n    selectedList.tasks = selectedList.tasks.filter(task => task.id != selectedCheckBoxs[0].id)\r\n    console.log(selectedList)\r\n\r\n    saveAndRender()\r\n})\r\n \r\nclearBtn.addEventListener('click', e=> {\r\n    const selectedList = lists.find(list => list.id === selectedListId)\r\n    selectedList.tasks = selectedList.tasks.filter(task => !task.complete)\r\n    saveAndRender()\r\n})\r\n\r\n  deleteListButton.addEventListener('click', e=>{\r\n    lists = lists.filter(list => list.id !==selectedListId)\r\n    selectedListId = null\r\n    saveAndRender()\r\n  })\r\n\r\n \r\n\r\nnewListForm.addEventListener('submit', e => {\r\n    e.preventDefault()\r\n    const listName = newListInput.value\r\n    if(listName == null || listName === '') return\r\n    const list = createList(listName)\r\n    newListInput.value = null\r\n    lists.push(list)\r\n    saveAndRender()\r\n\r\n})\r\n\r\ncreateTask.addEventListener('submit', e => {\r\n    e.preventDefault()\r\n    const taskName = createInput.value\r\n    if(taskName == null || taskName === '') return\r\n    const task = createNewTask(taskName)\r\n    createInput.value = null\r\n   const selectedList = lists.find(list => list.id === selectedListId)\r\n   selectedList.tasks.push(task)\r\n    saveAndRender()\r\n\r\n})\r\n\r\nfunction createList(name) {\r\n    return{ id: Date.now().toString(), name:name, tasks:[]}\r\n}\r\n\r\nfunction createNewTask(name) {\r\n    return{ id: Date.now().toString(), name:name, complete: false }\r\n} \r\n\r\nfunction saveAndRender() {\r\n    save()\r\n    render()\r\n}\r\n function save(){\r\n    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists))\r\n    localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId)\r\n }\r\n\r\n\r\nfunction render() {\r\n    clearElement(listsContainer)\r\n    renderList()\r\n  const selectedList = lists.find(list => list.id === selectedListId)\r\n    if(selectedListId == null) {\r\n        listDisplay.style.display = 'none'\r\n    } else {\r\n        listDisplay.style.display = ''\r\n        titleDisplay.innerText = selectedList.name\r\n        clearElement(tasksDisplay)\r\n        renderTasks(selectedList)\r\n    }\r\n   \r\n}\r\n\r\nfunction renderTasks(selectedList){\r\n    selectedList.tasks.forEach(task =>{\r\n        const taskElement = document.importNode(taskTemplate.content, true)\r\n        const checkbox = taskElement.querySelector('input')\r\n        checkbox.id = task.id\r\n        checkbox.checked = task.complete\r\n        const label = taskElement.querySelector('label')\r\n        label.htmlFor = task.id\r\n        label.append(task.name)\r\n        tasksDisplay.appendChild(taskElement)\r\n    })\r\n}\r\n\r\nfunction renderList() {\r\n    lists.forEach(list => {\r\n        const listElement = document.createElement('li')\r\n        listElement.dataset.listId = list.id\r\n        listElement.classList.add('list-name')\r\n        listElement.innerText = list.name\r\n        if (list.id === selectedListId) {\r\n            listElement.classList.add('active-class')\r\n        }\r\n        listsContainer.appendChild(listElement)\r\n    })\r\n}\r\n\r\nfunction clearElement(element) {\r\n while (element.firstChild) {\r\n    element.removeChild(element.firstChild)\r\n }\r\n}\r\n\r\nrender()\n\n//# sourceURL=webpack://todo-task/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;