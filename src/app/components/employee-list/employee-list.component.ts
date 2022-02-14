import { Component, OnInit } from '@angular/core';
import { catchError, map, reduce} from 'rxjs/operators';
import { Employee } from 'src/app/model/employee';
import { EmployeeService} from 'src/app/service/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { CrudModalComponent } from '../crud-modal/crud-modal.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];
  errorMessage: string;

  constructor(private dialog: MatDialog, private employeeService: EmployeeService) {}
  ngOnInit(): void {
    this.getEmployees();
  }
  /* 
  getEmployees utilizes employeeservice function get all to return an array of employees from the db.
  reduce 
  map catchError
  subscribe
  */
  getEmployees() {
    this.employeeService.getAll().pipe(
      reduce( (emps, e: Employee ) => { return emps.concat(e);  }, []),
      map( emps => ( this.employees = emps )),
      catchError(this.handleError.bind(this))
    ).subscribe(() => {});
  }
  
  /*
  deleteReportee: declares an index of the reportee located in directreports and splices it from direct reports
                  and then call a overrideEmployee to overwrite the old employee data with the new one.
    @param: Employee obj (employee), Employee obj (a direct reportee)
  */
  deleteReportee(employee: Employee, reportee: Employee) {
    //get reportee index using employee direct reports indexof inserts reportee id
    const reporteeIndex = employee.directReports.indexOf(reportee.id);
    // remove reportee from direct reports
    employee.directReports.splice(reporteeIndex,1);
    // Mission does not state about where indirect reports should go
    // replace old employee info with new employee info
    this.overrideEmployee(this.employees, employee);
  }
  /*
  overrideEmployee: takes an employee with the new direct reports and overrides it in the employeees array
              when it matches the id.
    @params: Employee[], Employee
  */
  overrideEmployee(employees: Employee[], employee: Employee) {
    for (var i=0; i < employees.length; i++) {
      if ( employees[i].id == employee.id) {
        //console.log("removed " + employee.firstName + " from employees")
        employees[i] = employee;
        break;
      }
    }
  }
  /*
  editCompensation takes an reportee whose compensation we want to edit and then gets employees 
  @param: Employee
  */
  editCompensation(emp: Employee){
    this.employeeService.save(emp).pipe(catchError(this.handleError.bind(this)))
    .subscribe(() => {
      const edited = true;
      this.dialog.open(CrudModalComponent, {
        data: { ...emp, edited }
      });

      this.getEmployees();
    });
  }
  /* 
  deleteEmployeeRecord: @params: $event object containing employee and the reportee for that employee
  calls deleteReportee to remove the reportee from the employees direct reports then saves the data in employeeservice
  and refreshes the page.
  */
  deleteEmployeeRecord(info: { employee: Employee; reportee: Employee;}){
      this.deleteReportee(info.employee,info.reportee)
      this.employeeService.save(info.employee)
      .pipe(catchError(this.handleError.bind(this)))
      .subscribe(() => {
        const deleted = true;
        this.dialog.open(CrudModalComponent, {
          data: {...info.reportee,deleted}
        })
        //console.log("in delete record");
        this.getEmployees();
      });
  }

  private handleError(e: Error | any): string {
    console.error(e);
    return this.errorMessage = e.message || 'Unable to retrieve employees';
  }

}