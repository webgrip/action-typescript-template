jest.mock('@actions/core', () => ({
  info: jest.fn(),
  setFailed: jest.fn(),
}));

import * as core from '@actions/core';
import { ApplicationService } from '../src/services/ApplicationService';

describe('src/index.ts', () => {
  let runSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    runSpy = jest.spyOn(ApplicationService.prototype, 'run').mockResolvedValue(undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should run the application and log success', async () => {
    await jest.isolateModulesAsync(async () => {
      await import('../src/index');
      expect(runSpy).toHaveBeenCalled();
      expect(core.info).toHaveBeenCalledWith('Application ran successfully');
    });
  });

  it('should setFailed if an error is thrown', async () => {
    runSpy.mockRejectedValueOnce(new Error('fail'));
    await jest.isolateModulesAsync(async () => {
      await import('../src/index');
      expect(core.setFailed).toHaveBeenCalledWith('Error: fail');
    });
  });
});
