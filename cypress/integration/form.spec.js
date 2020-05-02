describe("Testing Pizza Form", function() {
    beforeEach(function(){
        cy.visit("http://localhost:3000");
    })

    it("Adds text to fields" ,function(){
        cy.contains("Order Now")
        .click();
        cy.get('[data-cy="name"]')
        .type("Dr. Grey")
        .should("have.value","Dr. Grey");
        cy.get('#size')
        .select('Medium')
        .should("have.value","medium");
        cy.get('[data-cy="peppers"]')
        .check()
        .should("be.checked");
        cy.get('[data-cy="pepperoni"]')
        .check()
        .should("be.checked")
        cy.contains("Place Order")
        .click();
        cy.contains("Home")
        .click();
    });
});