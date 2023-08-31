import UserInfoView from './UserInfoView';

describe('UserInfoView class', () => {
  const instance = new UserInfoView();

  it('must be defined', () => {
    expect(UserInfoView).toBeDefined();
  });

  it('an instance must have a buildView method', () => {
    expect(instance.buildView).toBeDefined();
  });

  it('an instance must have a enterEditMode method', () => {
    expect(instance.enterEditMode).toBeDefined();
  });

  it('an instance must have a exitEditMode method', () => {
    expect(instance.exitEditMode).toBeDefined();
  });

  it('an instance must have a collectCredentials method', () => {
    expect(instance.collectCredentials).toBeDefined();
  });

  it('an instance must have a updateInfo method', () => {
    expect(instance.updateInfo).toBeDefined();
  });
});
