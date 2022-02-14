import { Component, Input, Output, EventEmitter} from '@angular/core';
import { Employee} from 'src/app/model/employee';
import { EmployeeService } from 'src/app/service/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { CrudModalComponent } from '../crud-modal/crud-modal.component';
import { from, Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {

  @Input() employee: Employee;
  @Output() editCompensation = new EventEmitter<number>();
  @Output() deleteEmployeeRecord = new EventEmitter<{
    employee: Employee;
    reportee: Employee;
  }>();
  reports = 0;
  reportees: Employee[] = [];
  employees: Employee[] = [];

  constructor(private dialog: MatDialog, private employeeService: EmployeeService) {}
  ngOnInit(){
    this.reportees = [];
    // assign any reports if we have any
    if (this.employee.directReports.length > 0) {
      this.assignReports();
    }
    // get total number of reports (indirect and direct reports)
    if(this.employee.directReports === undefined || this.employee.directReports.length === 0){
      this.reports = 0; 
    } else {
      this.getTotalReports(this.employee);
    }

  }
  /*
  assignReports: fills reportees array of the direct reports belonging to the employee.
  */
  assignReports() {
    for (var i=0; i < this.employee.directReports.length; i++) {
      this.employeeService.get(this.employee.directReports[i]).subscribe((data) => {
        this.reportees.push(data);
      })
    }
  }
  /*
  getTotalReports: counts the initial direct reports as part of the tally. Then, uses from to 
      make an iterable mock array, flatMap to map an id, and then we listen for 
      a callback for a reportee in the recursive func getTotalReports
  @param: Employee
  */
  getTotalReports(employee: Employee) {
    // lets check if the objects exist to save time
    if(this.employee && employee.directReports){
      this.reports += employee.directReports.length;
      from(employee.directReports).pipe(
      flatMap(id => <Observable<Employee>> this.employeeService.get(id)))
      .subscribe(nextReportee => this.getTotalReports(nextReportee));
    }
  }
  /*
  openDialog: function called for when user chooses to edit or delete a direct report
          It essentially opens the dialog modal and listens for the users to click on delete or edit
          and emits the appropriate event.
  */
  openDialog(employee: Employee, reportee: any, action: string): void{
    //console.log("opening dialog");
    // opens dalog with set of data
    const openModal = this.dialog.open(CrudModalComponent,{
      data: { ...reportee, modalAction: action}
    });
    
    openModal.afterClosed().subscribe(result => {
      if (result.isDeleted === "deleted") {
        delete result.isDeleted;
        delete result.modalAction;
        // delete variables here for ease of use
        setTimeout(() => this.dialog.closeAll(), 1000);
        this.deleteEmployeeRecord.emit({employee, reportee}); //emit event for delete direct report
        setTimeout(() => this.dialog.closeAll(), 1000);
        //console.log("chose deleted");
      }
      else if (result.isEdited === "edited") {
        delete result.isEdited;
        delete result.modalAction;
        // delete variables here for ease of use
        this.editCompensation.emit(result); //emit event for compensation
        setTimeout(() => this.dialog.closeAll(), 1000);
        //console.log("chose edited");
      }
    });
  }
}