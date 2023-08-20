import Tokens from './Tokens';

describe('Class elements existence check', () => {
  it('Class Tokens should be defined', () => {
    expect(Tokens).toBeDefined();
  });

  it('Method setCustomerTokens should be defined', () => {
    expect(Tokens.setCustomerTokens).toBeDefined();
  });

  it('Method getCustomerTokens should be defined', () => {
    expect(Tokens.getCustomerTokens).toBeDefined();
  });

  it('Method deleteCustomerTokens should be defined', () => {
    expect(Tokens.deleteCustomerTokens).toBeDefined();
  });
});

describe('Verify that methods work as expected', () => {
  it('Method setCustomerTokens should set correct access token, refresh token and other properties', async () => {
    const testString = 'Jest_test';
    const testNumber = 911;
    Tokens.setCustomerTokens({
      access_token: testString,
      expires_in: testNumber,
      scope: testString,
      refresh_token: testString,
      token_type: testString,
    });
    const tokens = await Tokens.getCustomerTokens();
    expect(tokens).toHaveProperty('access_token');
    expect(tokens.access_token).toBe(testString);

    expect(tokens).toHaveProperty('expires_in');
    expect(tokens.expires_in).toBe(testNumber);

    expect(tokens).toHaveProperty('scope');
    expect(tokens.scope).toBe(testString);

    expect(tokens).toHaveProperty('refresh_token');
    expect(tokens.refresh_token).toBe(testString);

    expect(tokens).toHaveProperty('token_type');
    expect(tokens.token_type).toBe(testString);
  });

  it('Method deleteCustomerTokens should delete access token', async () => {
    Tokens.deleteCustomerTokens();
    const tokens = await Tokens.getCustomerTokens();
    expect(tokens.access_token).toBe('');

    expect(tokens.expires_in).toBe(0);

    expect(tokens.scope).toBe('');

    expect(tokens.refresh_token).toBe('');

    expect(tokens.token_type).toBe('');
  });
});
