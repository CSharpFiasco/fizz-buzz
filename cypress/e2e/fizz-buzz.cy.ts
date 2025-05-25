describe('FizzBuzz Smoke Test', () => {
  it('should return status 200 and contain an h1 element', () => {
      // Check if the API is reachable and returns a 200 status code
      cy.request('https://fizz-buzz-api.carlosmartos.com').then((response) => {
          expect(response.status).to.eq(200);
      });

      cy.visit('https://fizz-buzz.carlosmartos.com');
      // This is just a smoke test to ensure the page loads.
      // The element it checks is arbitrary and can be changed.
      cy.get('h1').should('exist').should('contain', 'Fizz Buzz');
  });

  describe('Form Submission', () => {
    it('should submit the form and display the result', () => {
      cy.visit('https://fizz-buzz.carlosmartos.com');

      // Test the max number input
      cy.get('[data-testid=input-max-number]').clear();
      cy.get('[data-testid=input-max-number]').blur();

      // Test the error message for max number
      cy.get('[data-testid=max-number-error-required]').should('exist');
      cy.get('[data-testid=input-max-number]').type('124', {
        // We force typing because the input is covered by its label
        force: true
      });
      cy.get('[data-testid=max-number-error-required]').should('not.exist');

      // Test the first set of inputs
      cy.get('[data-testid=input-word-0').clear();
      cy.get('[data-testid=input-word-0]').blur();
      cy.get('[data-testid=word-error-required-0]').should('exist');

      cy.get('[data-testid=input-word-0]').type('Fizz', {
        force: true
      });
      cy.get('[data-testid=word-error-required-0]').should('not.exist');

      cy.get('[data-testid=input-multiple-0]').clear();
      cy.get('[data-testid=input-multiple-0]').blur();
      cy.get('[data-testid=multiple-error-required-0]').should('exist');
      cy.get('[data-testid=input-multiple-0]').type('3', {
        force: true
      });
      cy.get('[data-testid=multiple-error-required-0]').should('not.exist');

      // Test the second set of inputs
      cy.get('[data-testid=input-word-1').clear();
      cy.get('[data-testid=input-word-1]').blur();
      cy.get('[data-testid=word-error-required-1]').should('exist');
      cy.get('[data-testid=input-word-1]').type('Buzz', {
        force: true
      });
      cy.get('[data-testid=word-error-required-1]').should('not.exist');
      cy.get('[data-testid=input-multiple-1]').clear();
      cy.get('[data-testid=input-multiple-1]').blur();
      cy.get('[data-testid=multiple-error-required-1]').should('exist');
      cy.get('[data-testid=input-multiple-1]').type('5', {
        force: true
      });
      cy.get('[data-testid=multiple-error-required-1]').should('not.exist');

      // Add a new set of inputs
      cy.get('[data-testid=add-word-button]').click();

      cy.get('[data-testid=input-word-2]').clear();
      cy.get('[data-testid=input-word-2]').should('exist'); 
      cy.get('[data-testid=input-multiple-2]').should('exist');
      cy.get('[data-testid=input-word-2]').type('Bazz', {
        force: true
      });

      cy.get('[data-testid=input-multiple-2]').clear();
      cy.get('[data-testid=input-multiple-2]').type('8', {
        force: true
      });
      cy.get('[data-testid=word-error-required-2]').should('not.exist');
      cy.get('[data-testid=multiple-error-required-2]').should('not.exist');
      
      // Submit the form
      cy.get('[data-testid=submit-button]').click();

      cy.get('[data-testid=fizz-buzz-results]').should('exist');
      cy.get('[data-testid=fizz-buzz-result-item-3]').should('contain', '3').and('contain', 'Fizz');
      cy.get('[data-testid=fizz-buzz-result-item-5]').should('contain', '5').and('contain', 'Buzz');
      cy.get('[data-testid=fizz-buzz-result-item-15]').should('contain', '15').and('contain', 'FizzBuzz')
      cy.get('[data-testid=fizz-buzz-result-item-16]').should('contain', '16').and('contain', 'Bazz')
      cy.get('[data-testid=fizz-buzz-result-item-120]').should('contain', '120').and('contain', 'FizzBuzzBazz')
      ;
    });
  });
});