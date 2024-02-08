describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });

  it('Then: I should be able to finish a book', () => {

    // Type a search term and submit the search form
    cy.get('input[type="search"]').type('javascript');
    cy.get('form').submit();

    // Add a book to the reading list
    cy.get('[data-testing="book-item"]').first().contains('Want to Read').click();

    // Click the "Reading List" button to open the reading list
    cy.get('[data-testing="toggle-reading-list"]').click();

    // Click the "remove_circle" button for each book in the reading list
  cy.get('[data-testing="reading-list-container"]').within(() => {
    cy.get('button[aria-label^="Mark"]').should('be.visible').each(($button) => {
      cy.wrap($button).click();
    });
  });

  // Click the "Reading List" button to open the reading list
  cy.get('[data-testing="toggle-reading-list"]').click({force: true});

    cy.get('[data-testing="book-item"]').first().contains('Finished');
  });
});
