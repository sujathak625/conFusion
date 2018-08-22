import { TestBed, inject } from '@angular/core/testing';

import { PromtionService } from './promtion.service';

describe('PromtionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PromtionService]
    });
  });

  it('should be created', inject([PromtionService], (service: PromtionService) => {
    expect(service).toBeTruthy();
  }));
});
