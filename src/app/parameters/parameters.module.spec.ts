import { ParametersModule } from './parameters.module';

fdescribe('ParametersModule', () => {
  let parametersModule: ParametersModule;

  beforeEach(() => {
    parametersModule = new ParametersModule();
  });

  it('should create an instance', () => {
    expect(parametersModule).toBeTruthy();
  });
});
