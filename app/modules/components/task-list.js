import { addTask } from '../main.js'

const taskListElement = document.getElementById('task-list')
const taskListNewTaskButton = document.getElementById('task-list-new-task-button')

taskListNewTaskButton.onclick = () => {
  const title = window.prompt('Task title')
  if (title) {
    addTask(title)
  }
}

export default function renderTaskList (state) {
  console.debug('Rendering task list')

  taskListElement.innerHTML = (() => `
        ${Object.keys(state.tasks).map((e) => `
            <option>${e}</option>
        `).join('')}
    `)()
}
