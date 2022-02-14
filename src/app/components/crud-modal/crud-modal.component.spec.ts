import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudModalComponent } from './crud-modal.component';
import { EmployeeComponent } from '../employee/employee.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee.service';
import { MatListModule } from '@angular/material/list';
import { MatCard } from '@angular/material/card';
import { HttpClient, HttpHandler } from '@angular/common/http';

@Component({ selector: "mat-dialog-actions", template: "" })
class DialogActions {}

describe('crud-modal component', () => {
  let component: EmployeeComponent;
  let fixture: ComponentFixture<EmployeeComponent>;
  let matModalSpy: any;
  let matDialogSpy: jasmine.Spy;
  let matDialogClosedSpy: jasmine.Spy;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CrudModalComponent,
        MatCard
      ],
      imports: [
        MatDialogModule,
        MatListModule,
      ],
      providers: [
        { provide: CrudModalComponent },
        { provide: EmployeeService},
        { provide: MAT_DIALOG_DATA, useValue: {} },
        HttpClient, HttpHandler
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(EmployeeComponent);
    component = fixture.componentInstance;
  }));

  it('should create the crud-modal component', async(() => {
    fixture = TestBed.createComponent(EmployeeComponent);
    expect(component).toBeTruthy();
  }));
  it('should edit the compensation for an employee on submission', async(() => {
  }));
  it('should delete a reportee for an employee on submission', async(() => {
  }));
});