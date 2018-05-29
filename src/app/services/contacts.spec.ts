import { TestBed, inject } from '@angular/core/testing';

import { ContactsServiceService } from './contacts-service.service';

describe('ContactsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContactsServiceService]
    });
  });

  it('should be created', inject([ContactsServiceService], (service: ContactsServiceService) => {
    expect(service).toBeTruthy();
  }));
});
