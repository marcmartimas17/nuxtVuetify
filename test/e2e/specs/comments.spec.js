const CommentsPage = require('../pageObjects/comments.page')

const sampleItems = [
  {
    id: 1,
    name: 'Comprar pa',
    body: 'Comprar pa al supermercat',
    read: false,
  },
  {
    id: 2,
    name: 'Comprar llet',
    body: 'Comprar llet al supermercat',
    read: false,
  },
  {
    id: 3,
    name: 'Fer les pactiques',
    body: 'Fer les pràctiques de Tur',
    read: false,
  },
]

describe('Comments tests', () => {
  it('should add items to the list correctly using enter', () => {
    CommentsPage.open()
    CommentsPage.addListItems(sampleItems)
    expect(CommentsPage.listSize).toEqual(3)
    expect(CommentsPage.footerTitle).toHaveText(
      'Tens 3 comentaris sense llegir'
    )
  })

  it('shows flash message when user comment is added', () => {
    CommentsPage.open()
    CommentsPage.addListItem('Comprar pa', 'Comprar pa al supermercat')
    expect(CommentsPage.listSize).toEqual(1)
    expect(CommentsPage.flash).toHaveText('Comentari afegit correctament')
    expect(CommentsPage.list).toHaveText('Comprar pa Comprar pa al supermercat')
  })

  it('should add items to the list correctly clicking on submit button', () => {
    CommentsPage.open()
    CommentsPage.addListItemsByClick(sampleItems)
    expect(CommentsPage.listSize).toEqual(3)
  })

  it('should toogle complete items correctly', () => {
    CommentsPage.open()
    CommentsPage.addListItems(sampleItems)
    expect(CommentsPage.footerTitle).toHaveText(
      'Tens 3 comentaris sense llegir'
    )
    expect(CommentsPage.isItemCompletedAt(2)).toBeFalsy()
    CommentsPage.toogleItemAt(2)
    expect(CommentsPage.footerTitle).toHaveText(
      'Tens 2 comentaris sense llegir'
    )
    expect(CommentsPage.isItemCompletedAt(2)).toBeTruthy()
    CommentsPage.toogleItemAt(2)
    expect(CommentsPage.footerTitle).toHaveText(
      'Tens 3 comentaris sense llegir'
    )
    expect(CommentsPage.isItemCompletedAt(2)).toBeFalsy()
    CommentsPage.toogleItemAt(2)
    CommentsPage.toogleItemAt(1)
    expect(CommentsPage.footerTitle).toHaveText('Tens 1 comentari sense llegir')
    CommentsPage.toogleItemAt(0)
    expect(CommentsPage.footerTitle).toHaveText(
      'No tens comentaris sense llegir'
    )
  })

  it('can_delete_a_comment', () => {
    CommentsPage.open()
    CommentsPage.addListItem('Comprar pa', 'Comprar pa al supermercat')

    CommentsPage.deleteItemAt(0)

    CommentsPage.confirmDeleteItem()
    expect(CommentsPage.flash).toHaveText(
      "S'ha eliminat el comentari correctament"
    )
    expect(CommentsPage.list).not.toHaveText('Comprar pa')
  })

  it('can_edit_a_comment', () => {
    CommentsPage.open()
    CommentsPage.addListItem('Comprar pa', 'Comprar pa al supermercat')
    CommentsPage.editItemNameAt(0, 'Comprar llet')

    expect(CommentsPage.flash).toHaveText('Comentari editat correctament')
    expect(CommentsPage.list).not.toHaveText('Comprar pa')
    expect(CommentsPage.list).toHaveText(
      'Comprar llet Comprar pa al supermercat'
    )
  })

  it('can_filter_comments_by_read_and_notRead_and_all', () => {
    CommentsPage.open()
    CommentsPage.addListItems(sampleItems)
    CommentsPage.toogleItemAt(2)

    expect(CommentsPage.listItems[0]).toHaveText(
      sampleItems[0].name + ' ' + sampleItems[0].body
    )
    expect(CommentsPage.listItems[1]).toHaveText(
      sampleItems[1].name + ' ' + sampleItems[1].body
    )
    expect(CommentsPage.listItems[2]).toHaveText(
      sampleItems[2].name + ' ' + sampleItems[2].body
    )
    expect(CommentsPage.listSize).toEqual(3)

    CommentsPage.filterByRead()
    expect(CommentsPage.listSize).toEqual(1)
    expect(CommentsPage.list).not.toHaveText(
      sampleItems[0].name + ' ' + sampleItems[0].body
    )
    expect(CommentsPage.list).not.toHaveText(
      sampleItems[1].name + ' ' + sampleItems[1].body
    )
    expect(CommentsPage.list).toHaveText(
      sampleItems[2].name + ' ' + sampleItems[2].body
    )

    CommentsPage.filterByNoRead()
    expect(CommentsPage.listSize).toEqual(2)
    expect(CommentsPage.listItems[0]).toHaveText(
      sampleItems[0].name + ' ' + sampleItems[0].body
    )
    expect(CommentsPage.listItems[1]).toHaveText(
      sampleItems[1].name + ' ' + sampleItems[1].body
    )
    expect(CommentsPage.list).not.toHaveText(
      sampleItems[2].name + ' ' + sampleItems[2].body
    )

    CommentsPage.filterByAll()
    expect(CommentsPage.listSize).toEqual(3)
    expect(CommentsPage.listItems[0]).toHaveText(
      sampleItems[0].name + ' ' + sampleItems[0].body
    )
    expect(CommentsPage.listItems[1]).toHaveText(
      sampleItems[1].name + ' ' + sampleItems[1].body
    )
    expect(CommentsPage.listItems[2]).toHaveText(
      sampleItems[2].name + ' ' + sampleItems[2].body
    )
  })
})
