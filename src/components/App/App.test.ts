import App from './App';

describe('App general test', (): void => {
  const newApp = new App();

  it('Class App should be defined', (): void => {
    expect(App).toBeDefined();
  });

  it('Class App should have "loadDefaultPage" method', (): void => {
    expect(newApp.loadDefaultPage).toBeDefined();
  });

  it('Class App should have "runRoute" method', (): void => {
    expect(newApp.runRoute).toBeDefined();
  });
});
