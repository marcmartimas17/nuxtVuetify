const TasksPage = require('../pageObjects/tasks.page')

const sampleItems = ['Comprar pa', 'Comprar llet', 'Fer les pràctiques de Tur']

// const sampleItemsObject = [
//   {
//     id: 1,
//     title: 'Comprar pa',
//     completed: false,
//   },
//   {
//     id: 2,
//     title: 'Comprar llet',
//     completed: false,
//   },
//   {
//     id: 3,
//     title: 'Fer les pràctiques de Tur',
//     completed: false,
//   },
// ]

describe('Tasks tests', () => {
  it('should add items to the list correctly using enter', () => {
    TasksPage.open()
    TasksPage.addListItems(sampleItems)
    expect(TasksPage.listSize).toEqual(3)
    expect(TasksPage.footerTitle).toHaveText('Tens 3 tasques pendents')
  })

  it('shows flash message when user task is added', () => {
    TasksPage.open()
    TasksPage.addListItem('Comprar pa')
    expect(TasksPage.listSize).toEqual(1)
    expect(TasksPage.flash).toHaveText("S'ha afegit la tasca correctament")
    expect(TasksPage.list).toHaveText('Comprar pa')
  })

  it('should add items to the list correctly clicking on submit button', () => {
    TasksPage.open()
    TasksPage.addListItemsByClick(sampleItems)
    expect(TasksPage.listSize).toEqual(3)
  })

  it('should toogle complete items correctly', () => {
    TasksPage.open()
    TasksPage.addListItems(sampleItems)
    expect(TasksPage.footerTitle).toHaveText('Tens 3 tasques pendents')
    expect(TasksPage.isItemCompletedAt(2)).toBeFalsy()
    TasksPage.toogleItemAt(2)
    expect(TasksPage.footerTitle).toHaveText('Tens 2 tasques pendents')
    expect(TasksPage.isItemCompletedAt(2)).toBeTruthy()
    TasksPage.toogleItemAt(2)
    expect(TasksPage.footerTitle).toHaveText('Tens 3 tasques pendents')
    expect(TasksPage.isItemCompletedAt(2)).toBeFalsy()
    TasksPage.toogleItemAt(2)
    TasksPage.toogleItemAt(1)
    expect(TasksPage.footerTitle).toHaveText('Tens 1 tasca pendent')
    TasksPage.toogleItemAt(0)
    expect(TasksPage.footerTitle).toHaveText(
      'Enhorabona, no tens tasques pendents!'
    )
  })

  it('can_delete_a_task', () => {
    TasksPage.open()
    TasksPage.addListItem('Comprar pa')

    TasksPage.deleteItemAt(0)

    TasksPage.confirmDeleteItem()
    expect(TasksPage.flash).toHaveText("S'ha eliminat la tasca correctament")
    expect(TasksPage.list).not.toHaveText('Comprar pa')
  })

  it('can_edit_a_task', () => {
    TasksPage.open()
    TasksPage.addListItem('Comprar pa')

    TasksPage.editItemAt(0, 'Comprar llet')

    expect(TasksPage.flash).toHaveText("S'ha editat la tasca correctament")
    expect(TasksPage.list).not.toHaveText('Comprar pa')
    expect(TasksPage.list).toHaveText('Comprar llet')
  })

  it('can_filter_tasks_by_completed_and_pending_and_all', () => {
    TasksPage.open()
    TasksPage.addListItems(sampleItems)
    TasksPage.toogleItemAt(2)

    expect(TasksPage.listItems[0]).toHaveText(sampleItems[0])
    expect(TasksPage.listItems[1]).toHaveText(sampleItems[1])
    expect(TasksPage.listItems[2]).toHaveText(sampleItems[2])
    expect(TasksPage.listSize).toEqual(3)

    TasksPage.filterByCompleted()
    expect(TasksPage.listSize).toEqual(1)
    expect(TasksPage.list).not.toHaveText(sampleItems[0])
    expect(TasksPage.list).not.toHaveText(sampleItems[1])
    expect(TasksPage.list).toHaveText(sampleItems[2])

    TasksPage.filterByPending()
    expect(TasksPage.listSize).toEqual(2)
    expect(TasksPage.listItems[0]).toHaveText(sampleItems[0])
    expect(TasksPage.listItems[1]).toHaveText(sampleItems[1])
    expect(TasksPage.list).not.toHaveText(sampleItems[2])

    TasksPage.filterByAll()
    expect(TasksPage.listSize).toEqual(3)
    expect(TasksPage.listItems[0]).toHaveText(sampleItems[0])
    expect(TasksPage.listItems[1]).toHaveText(sampleItems[1])
    expect(TasksPage.listItems[2]).toHaveText(sampleItems[2])
  })
})
