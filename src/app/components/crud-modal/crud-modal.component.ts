import { Component, OnInit, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee } from 'src/app/model/employee';
@Component({
  selector: 'app-crud-modal',
  templateUrl: './crud-modal.component.html',
  styleUrls: ['./crud-modal.component.css']
})
export class CrudModalComponent implements OnInit {
  reportee: Employee;
  
  constructor(public dialogRef: MatDialogRef<CrudModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    //console.log(data);
    this.reportee = data.reportee;  //hand off data locally
  }
  ngOnInit() {}
  // editCompensation sends this event to the employee component and closes the dialog or modal.
  // isEdited vital for this function
  editCompensation(employee: Employee, compensation: Number, isEdited: string){
    console.log("inside edit compensation")
    this.dialogRef.close({...employee, compensation: compensation, isEdited});
  } 
  // deleteEmployee sends this event to the employee component and closes the dialog or modal.
  // isDeleted is vital for this function
  deleteEmployee(employee: Employee, isDeleted: string) {
    this.dialogRef.close({ ...employee, isDeleted });
  }   
}