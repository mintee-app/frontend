import renderTaskList from './components/task-list.js'
import renderTaskTimer from './components/task-timer.js'
import { load, save } from './db.js'

const state = {
  // Ephemeral.
  runningTask: '',
  selectedTask: '',
  // Persistent.
  tasks: {}
}

await loadState()
render(state)

async function loadState () {
  const loaded = await load()
  if (loaded === undefined) {
    console.debug('No state in the database')
    return
  }

  console.debug('Loaded state from the database')

  state.tasks = loaded.tasks
  for (const t in state.tasks) {
    if (state.tasks[t].startedAt) {
      state.runningTask = t
      state.selectedTask = t
      return
    }
  }

  const tasks = Object.keys(state.tasks)
  if (tasks.length > 0) {
    state.selectedTask = tasks[0]
  }
}

async function saveState () {
  await save({ tasks: state.tasks })
  console.debug('Saved state to the database')
}

export async function addTask (title) {
  if (title in state.tasks) {
    console.error(`Task "${title}" already exists`)
    return
  }

  state.tasks[title] = { startedAt: null }
  console.debug(`Added task "${title}"`)

  await saveState()
  selectTask(title)

  renderTaskList(state)
}

export function selectTask (title) {
  state.selectedTask = title
  renderTaskTimer(state)
}

export async function toggleSelectedTask () {
  const task = state.selectedTask

  if (state.tasks[task].startedAt) {
    stopTask(task)
    state.runningTask = ''
  } else {
    if (state.runningTask !== '') {
      stopTask(state.runningTask)
    }
    startTask(task)
    state.runningTask = task
  }
  await saveState()

  renderTaskTimer(state)
}

function startTask (task) {
  state.tasks[task].startedAt = Date.now()
  console.debug(`Started task "${task}"`)
}

function stopTask (task) {
  state.tasks[task].startedAt = null
  console.debug(`Stopped task "${task}"`)
}

function render () {
  renderTaskTimer(state)
  renderTaskList(state)
}
