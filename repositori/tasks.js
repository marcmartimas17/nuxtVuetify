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

const tasksStorageApi = {
  async fetch($axios) {
    // 0ggjms3XRewZg27oPnSTqn2S9wHcpMs6kEXfhW0v
    $axios.setToken('0ggjms3XRewZg27oPnSTqn2S9wHcpMs6kEXfhW0v', 'Bearer')
    const response = await $axios.$get(
      // 'http://laravelserver.test/api/v1/user/tasks'
      'http://127.0.0.1:8000/api/v1/user/tasks'
    )
    return response
  },
  save() {},
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
export { tasksStorage, tasksStorageApi, listTasksDisplay, filters }
