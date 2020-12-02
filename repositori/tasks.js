// Constants per al tractament del localstorage (CRUD de tasques)
const STORAGE_KEY = 'tasks-storage'
const tasksStorage = {
  fetch() {
    const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return todos
  },
  save(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  },
}
// Constant per al tractament del localstorage (Amagar/mostrar card)
const STATUS_KEY = 'card-tasks-status'
const listTasksDisplay = {
  fetch() {
    const status = JSON.parse(localStorage.getItem(STATUS_KEY) || 'true')
    return status
  },
  save(status) {
    localStorage.setItem(STATUS_KEY, JSON.stringify(status))
  },
}

// Array de funcions que s'apliquen segons el filtre que s'ha introduït
const filters = {
  all(tasks) {
    return tasks
  },
  active(tasks) {
    return tasks.filter(function (task) {
      return !task.completed
    })
  },
  completed(tasks) {
    return tasks.filter(function (task) {
      return task.completed
    })
  },
}
export { tasksStorage, listTasksDisplay, filters }
