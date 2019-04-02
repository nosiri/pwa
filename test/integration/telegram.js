/// <reference types='cypress' />

context("Telegram MTProxy provider", () => {
	before(() => {
		cy.visit("/")
			.contains("تلگرام")
			.click();
	});
	it("waits for server response", () => {
		cy.get("#mtp-modal p").should("contain", "صبر کنید");
	});
	it("handles server response", () => {
		cy.get("#mtp-modal a.button")
			.should("exist")
			.invoke("attr", "href")
			.should("match", /^tg:\/\//);
	});
});
