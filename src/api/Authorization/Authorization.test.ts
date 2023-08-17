import Authorization from "./Authorization";

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
  it('Method loginBasicAuth should should not return access token on random credentials', async () => {
    const randomLogin = String(Math.random());
    const randomPassword = String(Math.random());
    const tokens = await Authorization.loginBasicAuth(randomLogin, randomPassword);
    expect(tokens).not.toHaveProperty('access_token');
  });
});
