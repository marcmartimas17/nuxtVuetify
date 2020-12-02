// login.spec.js

import LoginPage from '../pageObjects/login.page'

describe('login form', () => {
  it('should deny access with wrong creds', () => {
    LoginPage.open()
    LoginPage.username.setValue('foo')
    LoginPage.password.setValue('bar')
    LoginPage.submit()

    expect(LoginPage.flash).toHaveText(
      "El nom d'usuari o la paraula de pas són incorrectes"
    )
  })

  it('should allow access with correct creds', () => {
    LoginPage.open()
    LoginPage.username.setValue('sergiturbadenas@gmail.com')
    LoginPage.password.setValue('12345678')
    LoginPage.submit()

    expect(LoginPage.flash).toHaveText('Login correcte!')
  })
})
