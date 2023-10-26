import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentInfoService } from '../../service/student-info.service';
import { Istudent } from '../../models/studentInterface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomRegex } from '../../const/validators';
import { SnackBarService } from '../../service/snack-bar.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  public studentForm !: FormGroup;
  public stdId !: Istudent;
  public inUpdateMode : boolean = false;
  public gender = ["Male", "Female"]

  constructor( @Inject(MAT_DIALOG_DATA)getStdData : Istudent,
    private _studentInfoService :StudentInfoService,
    private _snackBar : SnackBarService,
    private _dialogRef : MatDialogRef<StudentFormComponent>) {
    this.createForm();
  //   console.log('Get Data In Post Form', getPost);
    this.stdId = getStdData;
    if(getStdData){
      this.studentForm.patchValue(getStdData);
      this.inUpdateMode = true;
      this._studentInfoService.getUpdateData(getStdData)
    }
  }

  ngOnInit(): void {
    // this.f
    
  }
    
  createForm(){
      this.studentForm = new FormGroup({
        fName : new FormControl(null,[Validators.required, Validators.pattern(CustomRegex.onlyText)]),
        lName : new FormControl(null,[Validators.required, Validators.pattern(CustomRegex.onlyText)]),
        contact : new FormControl(null,[Validators.required, Validators.pattern(CustomRegex.contact)]),
        email : new FormControl(null,[Validators.required, Validators.pattern(CustomRegex.email)]),
        rollNo : new FormControl(null,[Validators.required]),
        gender : new FormControl(null,[Validators.required])
      })
  }

  get f(){
    return this.studentForm.controls;
  }

  onStudentInfo(){
    if(this.studentForm.valid){
      let stdData = this.studentForm.value;
        this._studentInfoService.createNewStdInfo(stdData)
        .subscribe(res =>{
          this._studentInfoService.sendData(stdData)
          this._dialogRef.close()
        })
        this.studentForm.reset()
    }
    
  }
  onCancelInfo(){
    this._dialogRef.close()
  }

  onUpdateStudent(){
    let updateId : Istudent = {...this.studentForm.value, id : this.stdId.id}
    // let updateId : Istudent = this.studentForm.value
    //     updateId.id = this.stdId.id

    this._studentInfoService.getUpdateData(updateId)
      .subscribe(res =>{
        this._studentInfoService.sendUpdateStudent(res)
        this._dialogRef.close()
        this._snackBar.openSnackBar(`This student Info was successfully updated ${res.fName}`, 'close')
      })
  }
}
