class Page {
  get username() {
    // eslint-disable-next-line no-undef
    return $('[qa="username_input"]')
  }

  get password() {
    // eslint-disable-next-line no-undef
    return $('[qa="password_input"]')
  }

  get submitBtn() {
    // return $('form button[type="submit"]')
    // eslint-disable-next-line no-undef
    return $('[qa="submit_login"]')
  }

  get flash() {
    // eslint-disable-next-line no-undef
    return $('[qa="flash_message"]')
  }

  open(path = '/login') {
    // eslint-disable-next-line no-undef
    browser.url(path)
  }

  submit() {
    this.submitBtn.click()
  }
}

module.exports = new Page()
