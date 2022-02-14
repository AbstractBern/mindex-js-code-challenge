import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Component, Input} from '@angular/core';

import {EmployeeListComponent} from './employee-list.component';
import {EmployeeService} from 'src/app/service/employee.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CrudModalComponent } from '../crud-modal/crud-modal.component';
import { AppComponent } from 'src/app/app.component';
import { of } from 'rxjs';
import { MatCard } from '@angular/material/card';

@Component({selector: 'app-employee', template: ''})
class EmployeeComponent {
  @Input('employee') employee: any;
}

@Component({selector: 'app-mat-grid-list', template: ''})
class GridListComponent {
}

@Component({selector: 'app-mat-grid-tile', template: ''})
class GridTileComponent {
}
const employees = [
  {
    id: 1,
    firstName: "Brian",
    lastName: "McGee",
    position: "CEO",
    directReports: [2, 3],
    compensation: 67000
  },
  {
    id: 2,
    firstName: "Homer",
    lastName: "Thompson",
    position: "Dev Manager",
    directReports: [4],
    compensation: 67000
  },
  {
    id: 3,
    firstName: "Rock",
    lastName: "Strongo",
    position: "Lead Tester",
    directReports: [],
    compensation: 67000
  },
  {
    id: 4,
    firstName: "Max",
    lastName: "Power",
    position: "Junior Software Engineer",
    directReports: [],
    compensation: 67000
  }
];

const matDialogSpy = jasmine.createSpyObj("MatDialog", ["open","close","afterClosed"]);
const employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['getAll', 'get', 'save', 'remove']);
describe('EmployeeListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        EmployeeListComponent,
        EmployeeComponent,
        MatCard
      ],
      providers: [
        {provide: EmployeeService, useValue: employeeServiceSpy}
      ],
      imports: [MatDialogModule],
    }).compileComponents();
  }));

  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(EmployeeListComponent);
    const comp = fixture.debugElement.componentInstance;
    expect(comp).toBeTruthy();
  }));
  it('should get employees by mocking employee service', async(() => {
    const fixture = TestBed.createComponent(EmployeeListComponent);
    const getAllAttempt = employeeServiceSpy.getAll.and.returnValue(of(employees));
    fixture.detectChanges();
    console.log(employees);
    expect(getAllAttempt.calls.any()).toBe(true, "function to get employees did not get called");
  }));
});