import { toggleSelectedTask } from '../main.js'

const startButton = document.getElementById('task-timer-start-button')

startButton.onclick = async () => {
  await toggleSelectedTask()
}

export default function render (state) {
  console.debug('Rendering task timer')

  const task = state.selectedTask
  if (task !== '') {
    startButton.removeAttribute('disabled')
  }
  startButton.innerText = state.tasks[task].startedAt ? 'Stop' : 'Start'
}
