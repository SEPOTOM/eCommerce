import LoginView from './LoginView';

describe('Class elements existence check', () => {
  it('Class LoginView should be defined', () => {
    expect(LoginView).toBeDefined();
  });

  it('Method showLoginView should be defined', () => {
    expect(LoginView.showLoginView).toBeDefined();
  });

  it('Method addStyles should be defined', () => {
    expect(LoginView.addStyles).toBeDefined();
  });
});
