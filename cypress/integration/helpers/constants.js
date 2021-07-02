export const constants = {
  menuButton: 'button[aria-label="Menu"]',
  dismissCookies: function () { cy.wait(250); cy.findByText('Accept cookies').click() },
  searchInput: '#mobile-search',
  searchButtonDesktop: '#search + button[aria-label="Search now"]',
  searchButtonMobile: '#mobile-search + button[aria-label="Search now"]',
}
