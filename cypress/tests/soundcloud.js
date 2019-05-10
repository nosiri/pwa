/// <reference types='cypress' />

context("Soundcloud downloader", () => {
	before(() => {
		cy.visit("/#/soundcloud");
	});
	it("works", () => {
		cy.get("input")
			.type("/AliSorena/kavir{enter}")
			.wait(1300)
			.get(".has-text-success")
			.should("exist")
			.get("p a")
			.should("have.attr", "href");
	});
	it("handles errors", () => {
		cy.get("input")
			.clear()
			.type("/someshitthatdoesntexist/idontknow{enter}")
			.wait(1300)
			.get(".has-text-danger")
			.should("exist");
	});
});
