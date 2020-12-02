const STORAGE_KEY = 'comments-storage'
const commentsStorage = {
  fetch() {
    const comments = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return comments
  },
  save(comments) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(comments))
  },
}

const STATUS_KEY = 'card-comments-status'
const listCommentsDisplay = {
  fetch() {
    const status = JSON.parse(localStorage.getItem(STATUS_KEY) || 'true')
    return status
  },
  save(status) {
    localStorage.setItem(STATUS_KEY, JSON.stringify(status))
  },
}

const filters = {
  all(comments) {
    return comments
  },
  read(comments) {
    return comments.filter(function (comment) {
      return comment.read
    })
  },
  noRead(comments) {
    return comments.filter(function (comment) {
      return !comment.read
    })
  },
}
export { commentsStorage, listCommentsDisplay, filters }
