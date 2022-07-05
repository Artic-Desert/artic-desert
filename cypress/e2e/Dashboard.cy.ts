describe('Dashboard', () => {
  beforeEach(() => {
    sessionStorage.setItem('token', 'test token');
  });
  afterEach(() => {
    sessionStorage.removeItem('token');
  });
  it('should open and close new repo form', () => {
    cy.visit('http://localhost:3000/dashboard');
  });
});
