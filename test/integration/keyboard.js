/// <reference types='cypress' />

it("navigates on keypress", () => {
	cy.visit("/")
		.get("body")
		.type("n")
		.location()
		.should("have.property", "pathname", "/namava")
		.get("body")
		.type("h")
		.location()
		.should("have.property", "pathname", "/");
});
