import { FileParameterModule } from './file-parameter.module';

describe('FileParameterModule', () => {
  let fileParameterModule: FileParameterModule;

  beforeEach(() => {
    fileParameterModule = new FileParameterModule();
  });

  it('should create an instance', () => {
    expect(fileParameterModule).toBeTruthy();
  });
});
