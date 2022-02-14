import { TestBed } from '@angular/core/testing';

import { EmployeeService } from '../service/employee.service'
import { HttpClient, HttpHandler } from '@angular/common/http';
describe('EmployeeService', () => {
  let service: EmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeeService, HttpClient, HttpHandler]
    }).compileComponents();
    service = TestBed.inject(EmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});