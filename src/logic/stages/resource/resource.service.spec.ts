import { ResourceService } from './resource.service';
import { ResourceEnum } from './resource.enum';
import { getResources } from './get-resources';

describe('resource.service.spec', () => {
  beforeEach(() => {
    ResourceService.resRepo = getResources();
  });

  describe('getPrice', () => {
    it('should be equal 8', () => {
      const received = ResourceService.getPrice(ResourceEnum.COAL, 3);
      expect(received).toEqual(8);
    });

    it('should be equal 2', () => {
      const received = ResourceService.getPrice(ResourceEnum.COAL, 1);
      expect(received).toEqual(2);
    });

    it('should be equal 4', () => {
      ResourceService.getPrice(ResourceEnum.COAL, 7);
      const received = ResourceService.getPrice(ResourceEnum.COAL, 1);
      expect(received).toEqual(5);
    });

    it('should throw an error', () => {
      expect(() => ResourceService.getPrice(ResourceEnum.COAL, 50)).toThrow();
      expect(() => ResourceService.getPrice(null, 5)).toThrow();
      expect(() => ResourceService.getPrice(ResourceEnum.COAL, null)).toThrow();
    });
  });
});
