// https://webdriver.io/docs/pageobjects.html
class Page {
  open(path = '/tasks') {
    // eslint-disable-next-line no-undef
    browser.url(path)
  }

  // CSS SELECTORS
  // https://ghostinspector.com/blog/css-selector-strategies-automated-browser-testing/

  // PER ID:
  // <input id="email" value=""> => #email  => PROBLEMA => Name col·lisión: és fàcil acabin haven més de dos ids iguals a la pàgina al juntar components

  // Per attributes
  // <input name="email" value=""> => [name="email"]

  // Exemples que són iguals => [id="identifier-here"] === #identifier-here

  // Mirar si existeix un link a /docs => [href="/docs/"]

  // CLASS NAME:
  // <div class="some-class another-class">...</div> => .class-name === [class*="class-name"]

  // TODO. Exercici pels alumnes
  // Atributs dedicats a testing a les plantilles
  // [data-testing="id-here"] or [qa="id-here"] => Qa és de Quality Assurance

  // https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Funciones/get
  get itemInput() {
    // eslint-disable-next-line no-undef
    return $('[qa="input_text_new_task"]')
    // return $('input[type=text]')
  }

  get itemEditInput() {
    // eslint-disable-next-line no-undef
    return $('[qa="input_edit_task"]')
    // return $('input[type=text]')
  }

  get footerTitle() {
    // eslint-disable-next-line no-undef
    return $('[qa="footer_title"]')
  }

  get filterAll() {
    // eslint-disable-next-line no-undef
    return $('[qa="filter_all"]')
  }

  get filterCompleted() {
    // eslint-disable-next-line no-undef
    return $('[qa="filter_completed"]')
  }

  get filterPending() {
    // eslint-disable-next-line no-undef
    return $('[qa="filter_pending"]')
  }

  filterByPending() {
    this.filterPending.click()
  }

  filterByCompleted() {
    this.filterCompleted.click()
  }

  filterByAll() {
    this.filterAll.click()
  }

  get itemSubmit() {
    // eslint-disable-next-line no-undef
    return $('[qa="add-todo-submit-button"]')
  }

  get list() {
    // eslint-disable-next-line no-undef
    return $('[qa="tasks-list"]')
    // return $('.todolist')
  }

  get listItems() {
    // eslint-disable-next-line no-undef
    return $$('[qa="task-list-item"]')
    // return $$('.todolist__item')
  }

  get deleteButtons() {
    // eslint-disable-next-line no-undef
    return $$('[qa="task-list-item-delete-btn"]')
    // return $$('.todolist__item-deleteBtn')
  }

  get editButtons() {
    // eslint-disable-next-line no-undef
    return $$('[qa="task-list-item-edit-btn"]')
    // return $$('.todolist__item-editBtn')
  }

  get flash() {
    // eslint-disable-next-line no-undef
    return $('[qa="flash_message"]')
  }

  get listItemsToggles() {
    // eslint-disable-next-line no-undef
    return $$('[qa="task-list-item-toggle"]')
  }

  get listSize() {
    return this.listItems.length
  }

  addListItem(item) {
    this.itemInput.setValue(`${item}\n`) // OBSERVEU es fa un enter al camp
  }

  addListItemWithClick(item) {
    this.itemInput.setValue(`${item}`)
    this.itemSubmit.click()
  }

  isItemCompletedAt(position) {
    return this.listItems[position].getAttribute('class').includes('completed')
  }

  toogleItemAt(position) {
    this.listItemsToggles[position].click()
  }

  editItemAt(position, newValue) {
    this.editButtons[position].click()
    this.itemEditInput.setValue(`${newValue}\n`)
  }

  deleteItemAt(position) {
    this.deleteButtons[position].click()
  }

  addListItems(items) {
    items.map((item) => {
      this.addListItem(item)
    })
  }

  addListItemsByClick(items) {
    items.map((item) => {
      this.addListItemWithClick(item)
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
