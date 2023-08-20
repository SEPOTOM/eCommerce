import App from './App';

describe('App general test', (): void => {
  const newApp = new App();

  it('Class App should be defined', (): void => {
    expect(App).toBeDefined();
  });

  it('Class App should have "build" method', (): void => {
    expect(newApp.build).toBeDefined();
  });
});
