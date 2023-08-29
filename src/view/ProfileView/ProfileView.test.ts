import ProfileView from './ProfileView';

describe('ProfileView class', () => {
  const instance = new ProfileView();

  it('must be defined', () => {
    expect(ProfileView).toBeDefined();
  });

  it('an instance must have a draw method', () => {
    expect(instance.draw).toBeDefined();
  });
});
