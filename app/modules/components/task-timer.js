import { toggleCurrentTask } from '../main.js'

const startButton = document.getElementById('task-timer-start-button')

startButton.onclick = async () => {
  await toggleCurrentTask()
}

export default function render (state) {
  console.debug('Rendering task timer')

  const task = state.currentTask
  if (task !== '') {
    startButton.removeAttribute('disabled')
  }
  startButton.innerText = state.tasks[task].startedAt ? 'Stop' : 'Start'
}
