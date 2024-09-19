import { addTask, changeTask } from '../main.js'

const taskList = document.getElementById('task-list')
const newTaskButton = document.getElementById('task-list-new-task-button')

newTaskButton.onclick = async () => {
  const title = window.prompt('Task title')
  if (title) {
    await addTask(title)
  }
}

taskList.onchange = async () => {
  await changeTask(taskList.selectedOptions.item(0).text)
}

export default function renderTaskList (state) {
  console.debug('Rendering task list')

  taskList.innerHTML = `
    ${Object.keys(state.tasks).map((e) => `
      <option ${e === state.currentTask ? 'selected' : ''}>${e}</option>
    `).join('')}
  `
}
