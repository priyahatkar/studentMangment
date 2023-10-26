import { Component, OnInit } from '@angular/core';
import { StudentInfoService } from '../../service/student-info.service';
import { Istudent } from '../../models/studentInterface';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { StudentFormComponent } from '../student-form/student-form.component';
import { SnackBarService } from '../../service/snack-bar.service';

@Component({
  selector: 'app-dashboared',
  templateUrl: './dashboared.component.html',
  styleUrls: ['./dashboared.component.scss']
})
export class DashboaredComponent implements OnInit {
  public studentArray : Array<Istudent> = [];
  constructor(private _matDialogRef : MatDialog,
    private _studentService : StudentInfoService,
    private _snackBar : SnackBarService) { }

  ngOnInit(): void {
    this._studentService.getAllStudentList()
        .subscribe(res =>{
          // console.log(res)
          this.studentArray = res
        })

      this._studentService.stdData$
        .subscribe(res =>{
          this.studentArray.push(res)
          this._snackBar.openSnackBar(`this student is successfully added ${res.fName}`,'close')
        })
        
        this._studentService.getStudentInfo$
          .subscribe(res =>{
            this.studentArray.forEach(stds =>{
                if(stds.id === res.id){
                  stds.fName = res.fName,
                  stds.contact = res.contact,
                  stds.email = res.email,
                  stds.gender = res.gender,
                  stds.lName = res.lName,
                  stds.rollNo = res.rollNo
                }
            })
          })
  }

  onStdForm(){
    const dialogConf = new MatDialogConfig();
    dialogConf.disableClose = true;
    const dialogRef = this._matDialogRef.open(StudentFormComponent, dialogConf)
  }

  onStudentEdit(std : Istudent){
    // console.log(std);
    const dialogConf = new MatDialogConfig();
    dialogConf.disableClose = true;
    dialogConf.autoFocus = true;
    dialogConf.data = std;
    const dialogRef = this._matDialogRef.open(StudentFormComponent,dialogConf)
  }

  onEmitStdDelete(id : any) {
    let getIndex = this.studentArray.findIndex(std => std.id === id)

    console.log(getIndex);
    this.studentArray.splice(getIndex, 1);
  }

}
