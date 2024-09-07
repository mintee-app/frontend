import renderTaskList from './components/task-list.js'

const state = {
  tasks: {}
}

renderTaskList(state)

export function addTask (title) {
  if (title in state.tasks) {
    console.error(`Task "${title}" already exists`)
    return
  }

  state.tasks[title] = {}
  console.debug(`Added task "${title}"`)

  renderTaskList(state)
}
