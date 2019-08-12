import { TestBed } from '@angular/core/testing';

import { ParametersModule } from './parameters.module';

describe('ParametersModule', () => {
  let parametersModule: ParametersModule;

  beforeEach(() => {
    parametersModule = new ParametersModule();
  });

  it('should create an instance', () => {
    expect(parametersModule).toBeTruthy();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
