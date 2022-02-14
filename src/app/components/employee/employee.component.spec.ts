import {async, TestBed, ComponentFixture, fakeAsync, tick} from '@angular/core/testing';
import {Component} from '@angular/core';

import {EmployeeComponent} from './employee.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CrudModalComponent } from '../crud-modal/crud-modal.component';
import { Employee } from 'src/app/model/employee';
import { MatListModule } from '@angular/material/list';
import { EmployeeService } from 'src/app/service/employee.service';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { MatCard } from '@angular/material/card';

@Component({selector: 'app-mat-card', template: ''})
class CardComponent {}

@Component({selector: 'app-mat-card-header', template: ''})
class CardHeaderComponent {}

@Component({selector: 'app-mat-card-title', template: ''})
class CardTitleComponent {}

@Component({selector: 'app-mat-card-subtitle', template: ''})
class CardSubtitleComponent {}

@Component({selector: 'app-mat-card-content', template: ''})
class CardContentComponent {}

const employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['getAll', 'get', 'save', 'remove']);
const employeeListSpy = jasmine.createSpyObj("EmployeeListComponent", [
  "employees",
  "getEmployees",
  "deleteEmployeeRecord",
  "editCompensation"
]);
const employees: Employee[] = [
  {
    id: 1,
    firstName: 'Brian',
    lastName: 'McGee',
    position: 'CEO',
    directReports: [2, 3],
    compensation: 0        
  },
  {
    id: 2,
    firstName: 'Homer',
    lastName: 'Thompson',
    position: 'Dev Manager',
    directReports: [4],
    compensation: 0
  },
  {
    id: 3,
    firstName: 'Rock',
    lastName: 'Strongo',
    position: 'Lead Tester',
    directReports: [],
    compensation: 0
  },
  {
    id: 4,
    firstName: 'Max',
    lastName: 'Power',
    position: 'Junior Software Engineer',
    directReports: [],
    compensation: 0
  }
];

describe('EmployeeComponent', () => {
  let component: EmployeeComponent;
  let fixture: ComponentFixture<EmployeeComponent>;
  let matModalSpy: any;
  let matDialogSpy: jasmine.Spy;
  let matDialogClosedSpy: jasmine.Spy;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EmployeeComponent,
        CardComponent,
        CardHeaderComponent,
        CardTitleComponent,
        CardSubtitleComponent,
        CardContentComponent,
        MatCard,
      ],
      imports: [
        MatDialogModule,
        MatListModule,
      ],
      providers: [
        { provide: EmployeeListComponent, useValue: employeeListSpy },
        { provide: EmployeeService, useValue: employeeServiceSpy },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(EmployeeComponent);
    component = fixture.componentInstance;

  }));

  it('should create the component', async(() => {
    fixture = TestBed.createComponent(EmployeeComponent);
    expect(component).toBeTruthy();
  }));
  
  it("should call assignReports function on init", async(() => {
    spyOn(component, "assignReports");
    //fixture.detectChanges();
  }));
  it("should call getTotalReports function on init", async(() => {
    spyOn(component, "getTotalReports");
    //fixture.detectChanges();
  }));
  it("should mock a click on openDialog for Edit", async(() => {
  }));
  it("should mock a click on openDialog for Delete", async(() => {
  }));

});