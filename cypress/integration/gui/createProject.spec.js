const faker = require('faker')

describe('Create Project', () => {
  beforeEach(() => cy.gui_login())

  after(() => cy.api_getAllProjects()
  .then(response => response.body.forEach(project =>
    cy.api_deleteProject(project.id))))

  it('successfully', () => {
    const project = {
      name: faker.random.uuid(),
      description: faker.random.words(5)
    }

    cy.gui_createProject(project)

    cy.url().should('be.equal', `${Cypress.config().baseUrl}${Cypress.env('user_name')}/${project.name}`)
    cy.contains(project.name).should('be.visible')
    cy.contains(project.description).should('be.visible')
  })
})
