import renderTaskList from './components/task-list.js'
import { getState, setState } from './db.js'

const state = await getState()

renderTaskList(state)

export async function addTask (title) {
  if (title in state.tasks) {
    console.error(`Task "${title}" already exists`)
    return
  }

  state.tasks[title] = {}
  console.debug(`Added task "${title}"`)

  await setState(state)
  renderTaskList(state)
}
