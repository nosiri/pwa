/// <reference types='cypress' />

context("Home", () => {
	before(() => {
		cy.visit("/");
	});
	it("shows USD price", () => {
		cy.contains("تومان")
			.wait(1000)
			.invoke("text")
			.should("not.equal", "۰ تومان")
			.should("match", /^[۰-۹]+/);
	});
	it("shows IP address and date", () => {
		cy.get("p")
			.should("exist")
			.within(p => {
				const date = p.text().split("\n")[2];
				expect(date).to.match(/\d+\/\d+\/\d+/);
				cy.get("b")
					.invoke("text")
					.should("match", /^(\d+\.){3}\d+$/);
			});
	});
});
