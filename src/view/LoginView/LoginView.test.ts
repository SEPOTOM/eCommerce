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

describe('addStyles and addAttributes method should work properly', () => {
  it('Method addStyles should assign styles', () => {
    const elem = document.createElement('div');
    const className = 'testclass';
    LoginView.addStyles(elem, [className]);
    expect(elem.classList.contains(className)).toBeTruthy();
  });
});
