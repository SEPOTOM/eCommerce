import Authorization from './Authorization';

describe('Class elements existence check', () => {
  it('Class Authorization should be defined', () => {
    expect(Authorization).toBeDefined();
  });

  it('Method loginClient should be defined', () => {
    expect(Authorization.loginClient).toBeDefined();
  });

  it('Class loginBasicAuth should be defined', () => {
    expect(Authorization.loginBasicAuth).toBeDefined();
  });
});

describe('Verify that methods work as expected', () => {
  it('Method loginBasicAuth should not return access token on random credentials', async () => {
    const randomLogin = String(Math.random());
    const randomPassword = String(Math.random());
    const tokens = await Authorization.loginBasicAuth(randomLogin, randomPassword);
    expect(tokens).not.toHaveProperty('access_token');
  });

  it('Method refreshCustomerToken should not refresh access token on random refresh token', async () => {
    const randomRefreshToken = String(Math.random());
    const tokens = await Authorization.refreshCustomerToken(randomRefreshToken);
    expect(tokens).not.toHaveProperty('access_token');
  });
});
