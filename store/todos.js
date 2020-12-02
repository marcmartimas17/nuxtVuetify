export const state = () => ({
  list: [
    {
      title: 'Comprar pa',
      completed: false,
    },
    {
      title: 'Comprar pa',
      completed: false,
    },
    {
      title: 'Comprar pa',
      completed: false,
    },
  ],
})

export const mutations = {
  add(state, title) {
    state.list.push({
      title,
      completed: false,
    })
  },
  remove(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle(state, todo) {
    todo.completed = !todo.completed
  },
}
