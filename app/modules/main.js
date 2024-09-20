import renderTaskList from './components/task-list.js'
import renderTaskTimer from './components/task-timer.js'
import { getState, setState } from './db.js'

let state = await getState()
if (state === undefined) {
  state = {
    currentTask: '',
    tasks: {}
  }
  console.debug('Initialized state')
}

render(state)

export async function addTask (title) {
  if (title in state.tasks) {
    console.error(`Task "${title}" already exists`)
    return
  }

  state.tasks[title] = { startedAt: null }
  console.debug(`Added task "${title}"`)

  await changeTask(title)
  renderTaskList(state)
}

export async function changeTask (title) {
  const oldTitle = state.currentTask

  state.currentTask = title
  console.debug(`Current task is changed from "${oldTitle}" to "${title}"`)

  await setState(state)

  renderTaskTimer(state)
}

export async function toggleCurrentTask () {
  const task = state.currentTask

  if (state.tasks[task].startedAt) {
    stopTask(task)
  } else {
    startTask(task)
  }
  await setState(state)

  renderTaskTimer(state)
}

async function startTask (task) {
  state.tasks[task].startedAt = Date.now()
  console.debug(`Started task "${task}"`)
}

async function stopTask (task) {
  state.tasks[task].startedAt = null
  console.debug(`Stopped task "${task}"`)
}

function render () {
  renderTaskTimer(state)
  renderTaskList(state)
}
