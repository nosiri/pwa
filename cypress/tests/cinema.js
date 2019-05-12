/// <reference types='cypress' />

context("Cinema", () => {
	before(() => {
		cy.visit("/#/cinema");
	});
	it("works", () => {
		cy.get("input")
			.type("کتاب سبز")
			.get("button")
			.click()
			.wait(4000)
			.get("body")
			.contains("کتاب سبز")
			.click()
			.get(".spinner")
			.should("exist")
			.wait(2000)
			.get("h1.title")
			.should("exist")
			.and("have.text", "کتاب سبز");
	});
});
