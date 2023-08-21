import UserInfoView from './UserInfoView';

describe('UserInfoView class', () => {
  it('must be defined', () => {
    expect(UserInfoView).toBeDefined();
  });

  it('an instance must have a buildView method', () => {
    const instance = new UserInfoView();

    expect(instance.buildView).toBeDefined();
  });

  it('an instance must have a validateInputs method', () => {
    const instance = new UserInfoView();

    expect(instance.validateInputs).toBeDefined();
  });

  it('an instance must have a collectCredentials method', () => {
    const instance = new UserInfoView();

    expect(instance.collectCredentials).toBeDefined();
  });
});
