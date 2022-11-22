import './style/main.scss';

const listsContainer = document.querySelector('[data-lists]')
const newListForm = document.querySelector('[data-new-list-form]')
const newListInput = document.querySelector('[data-new-list-input]')
const deleteListButton = document.getElementById('data-delete')
const listDisplay = document.getElementById('display-list')
const titleDisplay = document.getElementById('display-title')
const tasksDisplay = document.getElementById('display-tasks')
const taskTemplate =  document.getElementById('task-template')
const createTask  = document.getElementById('create-task')
const createInput  = document.getElementById('new-input')
const clearBtn = document.getElementById('clear-btn')
const editButton = document.getElementById("data-update");




const LOCAL_STORAGE_LIST_KEY = 'task.lists'
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId'
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY )) ||  []
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY)

listsContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'li') {
      selectedListId = e.target.dataset.listId
      saveAndRender()
    }
  })

tasksDisplay.addEventListener('click', e => {
    if(e.target.tagName.toLowerCase() === 'input') {
        const selectedList = lists.find(list => list.id === selectedListId)
        const selectedTask = selectedList.tasks.find(task => task.id === e.target.id)
        selectedTask.complete = e.target.checked
        save()
    }
})
editButton.addEventListener('click', e=> {
    const selectedList = lists.find(list => list.id === selectedListId)
    const selectedCheckBoxs = document.querySelectorAll('input[type="checkbox"]:checked');
    const NameOfItem = selectedList.tasks.filter(task => task.id == selectedCheckBoxs[0].id)[0]['name']
    
    createInput.value = NameOfItem;
    selectedList.tasks = selectedList.tasks.filter(task => task.id != selectedCheckBoxs[0].id)
    console.log(selectedList)

    saveAndRender()
})
 
clearBtn.addEventListener('click', e=> {
    const selectedList = lists.find(list => list.id === selectedListId)
    selectedList.tasks = selectedList.tasks.filter(task => !task.complete)
    saveAndRender()
})

  deleteListButton.addEventListener('click', e=>{
    lists = lists.filter(list => list.id !==selectedListId)
    selectedListId = null
    saveAndRender()
  })

 

newListForm.addEventListener('submit', e => {
    e.preventDefault()
    const listName = newListInput.value
    if(listName == null || listName === '') return
    const list = createList(listName)
    newListInput.value = null
    lists.push(list)
    saveAndRender()

})

createTask.addEventListener('submit', e => {
    e.preventDefault()
    const taskName = createInput.value
    if(taskName == null || taskName === '') return
    const task = createNewTask(taskName)
    createInput.value = null
   const selectedList = lists.find(list => list.id === selectedListId)
   selectedList.tasks.push(task)
    saveAndRender()

})

function createList(name) {
    return{ id: Date.now().toString(), name:name, tasks:[]}
}

function createNewTask(name) {
    return{ id: Date.now().toString(), name:name, complete: false }
} 

function saveAndRender() {
    save()
    render()
}
 function save(){
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists))
    localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId)
 }


function render() {
    clearElement(listsContainer)
    renderList()
  const selectedList = lists.find(list => list.id === selectedListId)
    if(selectedListId == null) {
        listDisplay.style.display = 'none'
    } else {
        listDisplay.style.display = ''
        titleDisplay.innerText = selectedList.name
        clearElement(tasksDisplay)
        renderTasks(selectedList)
    }
   
}

function renderTasks(selectedList){
    selectedList.tasks.forEach(task =>{
        const taskElement = document.importNode(taskTemplate.content, true)
        const checkbox = taskElement.querySelector('input')
        checkbox.id = task.id
        checkbox.checked = task.complete
        const label = taskElement.querySelector('label')
        label.htmlFor = task.id
        label.append(task.name)
        tasksDisplay.appendChild(taskElement)
    })
}

function renderList() {
    lists.forEach(list => {
        const listElement = document.createElement('li')
        listElement.dataset.listId = list.id
        listElement.classList.add('list-name')
        listElement.innerText = list.name
        if (list.id === selectedListId) {
            listElement.classList.add('active-class')
        }
        listsContainer.appendChild(listElement)
    })
}

function clearElement(element) {
 while (element.firstChild) {
    element.removeChild(element.firstChild)
 }
}

render()