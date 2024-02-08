describe('When: Use the search feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should be able to search books by title', () => {
    cy.get('input[type="search"]').type('javascript');

    cy.get('form').submit();

    cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 1);
  });

  it('Then: I should see search results as I am typing', () => {
    cy.get('input[type="search"]').type('java');

  // Wait for a moment to allow the search results to appear
  cy.wait(500); // Adjust the wait time as needed

  cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 1);

  });
});
