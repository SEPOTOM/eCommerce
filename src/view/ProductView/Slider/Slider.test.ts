import Slider from './Slider';

describe('Class "Slider"', (): void => {
  const slider = new Slider();

  it('Should be defined', (): void => {
    expect(Slider).toBeDefined();
  });

  it('Should be possible to create an instance', (): void => {
    expect(slider).toBeDefined();
  });

  it('Should have "getSlider" method', () => {
    expect(slider.getSlider).toBeDefined();
  });
});
