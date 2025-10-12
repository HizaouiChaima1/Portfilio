import { TestBed } from '@angular/core/testing';

import { AnimationService } from './animation';

describe('Animation', () => {
  let service: Animation;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Animation);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
