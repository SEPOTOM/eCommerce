import UserInfoView from './UserInfoView';

describe('UserInfoView class', () => {
  const instance = new UserInfoView();

  it('must be defined', () => {
    expect(UserInfoView).toBeDefined();
  });

  it('an instance must have a buildView method', () => {
    expect(instance.buildView).toBeDefined();
  });
});
