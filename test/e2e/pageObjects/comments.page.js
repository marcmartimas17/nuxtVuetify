class Page {
  open(path = '/comments') {
    // eslint-disable-next-line no-undef
    browser.url(path)
  }

  // https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Funciones/get
  get nameInput() {
    // eslint-disable-next-line no-undef
    return $('[qa="input_text_new_name"]')
  }

  get bodyInput() {
    // eslint-disable-next-line no-undef
    return $('[qa="input_text_new_body"]')
  }

  get itemEditNameInput() {
    // eslint-disable-next-line no-undef
    return $('[qa="name_edit_comment"]')
  }

  get itemEditBodyInput() {
    // eslint-disable-next-line no-undef
    return $('[qa="body_edit_comment"]')
  }

  get footerTitle() {
    // eslint-disable-next-line no-undef
    return $('[qa="footer_title"]')
  }

  get filterAll() {
    // eslint-disable-next-line no-undef
    return $('[qa="filter_all"]')
  }

  get filterRead() {
    // eslint-disable-next-line no-undef
    return $('[qa="filter_read"]')
  }

  get filterNoRead() {
    // eslint-disable-next-line no-undef
    return $('[qa="filter_no_read"]')
  }

  filterByNoRead() {
    this.filterNoRead.click()
  }

  filterByRead() {
    this.filterRead.click()
  }

  filterByAll() {
    this.filterAll.click()
  }

  get itemSubmit() {
    // eslint-disable-next-line no-undef
    return $('[qa="add-comment-submit-button"]')
  }

  get list() {
    // eslint-disable-next-line no-undef
    return $('[qa="comments-list"]')
  }

  get listItems() {
    // eslint-disable-next-line no-undef
    return $$('[qa="comments-list-item"]')
  }

  get deleteButtons() {
    // eslint-disable-next-line no-undef
    return $$('[qa="comment-list-item-delete-btn"]')
  }

  get editButtons() {
    // eslint-disable-next-line no-undef
    return $$('[qa="comment-list-item-edit-btn"]')
    // return $$('.todolist__item-editBtn')
  }

  get flash() {
    // eslint-disable-next-line no-undef
    return $('[qa="flash_message"]')
  }

  get listItemsToggles() {
    // eslint-disable-next-line no-undef
    return $$('[qa="comment-list-item-toggle"]')
  }

  get listSize() {
    return this.listItems.length
  }

  addListItem(name, body) {
    this.nameInput.setValue(`${name}`)
    this.bodyInput.setValue(`${body}\n`)
  }

  addListItemWithClick(name, body) {
    this.nameInput.setValue(`${name}`)
    this.bodyInput.setValue(`${body}`)
    this.itemSubmit.click()
  }

  isItemCompletedAt(position) {
    return this.listItems[position].getAttribute('class').includes('read')
  }

  toogleItemAt(position) {
    this.listItemsToggles[position].click()
  }

  editItemNameAt(position, newValue) {
    this.editButtons[position].click()
    this.itemEditNameInput.setValue(`${newValue}\n`)
  }

  editItemBodyAt(position, newValue) {
    this.editButtons[position].click()
    this.itemEditBodyInput.setValue(`${newValue}\n`)
  }

  deleteItemAt(position) {
    this.deleteButtons[position].click()
  }

  addListItems(items) {
    items.map((item) => {
      this.addListItem(item.name, item.body)
    })
  }

  addListItemsByClick(items) {
    items.map((item) => {
      this.addListItemWithClick(item.name, item.body)
    })
  }

  get deleteButton() {
    // eslint-disable-next-line no-undef
    return $('[qa="delete_button"]')
  }

  confirmDeleteItem() {
    this.deleteButton.click()
  }
}

module.exports = new Page()
