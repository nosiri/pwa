/// <reference types='cypress' />

context("Soundcloud downloader", () => {
	before(() => {
		cy.visit("/")
			.contains("ساندکلود")
			.click();
	});
	it("works", () => {
		cy.get("#sc-modal")
			.should("have.class", "is-active")
			.within(() => {
				cy.get("button.button")
					.eq(0)
					.as("submit");

				cy.get("input")
					.type("invalid")
					.get("@submit")
					.should("be.disabled")
					.get("input")
					.clear()
					.type("soundcloud.com/divarrecords/marg")
					.get("@submit")
					.should("be.enabled")
					.click()
					.should("have.class", "is-loading")
					.get("a.button")
					.should("exist");
			});
	});
	it("handles errors", () => {
		cy.get("#sc-modal").within(() => {
			cy.get("input")
				.clear()
				.type("soundcloud.com/lolololol/foobarbaz")
				.get("button")
				.eq(0)
				.click()
				.get(".has-text-danger b")
				.should("exist");
		});
	});
});
