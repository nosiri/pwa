/// <reference types='cypress' />

context("Telegram MTProxy provider", () => {
	before(() => {
		cy.visit("/")
			.contains("تلگرام")
			.click();
	});
	it("waits for server response", () => {
		cy.get("#mtp p").should("contain", "صبر کنید");
	});
	it("handles server response", () => {
		cy.get("#mtp a.button")
			.should("exist")
			.invoke("attr", "href")
			.should("match", /^tg:\/\//)
			.get("#mtp button.button")
			.click();
	});
});
