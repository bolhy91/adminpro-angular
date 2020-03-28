import { TestBed, async, inject } from '@angular/core/testing';

import { VerificaRenuevaGuard } from './verifica-renueva.guard';

describe('VerificaRenuevaGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VerificaRenuevaGuard]
    });
  });

  it('should ...', inject([VerificaRenuevaGuard], (guard: VerificaRenuevaGuard) => {
    expect(guard).toBeTruthy();
  }));
});
