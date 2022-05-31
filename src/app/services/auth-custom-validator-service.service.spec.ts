import { TestBed } from '@angular/core/testing';

import { AuthCustomValidatorServiceService } from './auth-custom-validator-service.service';

describe('AuthCustomValidatorServiceService', () => {
  let service: AuthCustomValidatorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthCustomValidatorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
