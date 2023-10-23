import {device, expect} from 'detox';

describe('ProductApp', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have product list screen', async () => {
    await expect(element(by.id('product-list-container'))).toBeVisible();
  });
});
