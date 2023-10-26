import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Istudent } from '../../models/studentInterface';
import { StudentInfoService } from '../../service/student-info.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmPostDeleteComponent } from '../confirm-post-delete/confirm-post-delete.component';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.scss']
})
export class StudentTableComponent implements OnInit {
@Input() studentInfo : Array<Istudent> = []
@Output() emitStd : EventEmitter<Istudent> = new EventEmitter<Istudent>();
@Output() emitStdDelete : EventEmitter<Istudent> = new EventEmitter<Istudent>();
  constructor(private _studentService : StudentInfoService,
              private _matDialog : MatDialog) { }

  ngOnInit(): void {
  }
  onEditStdInfo(std: Istudent){
    this.emitStd.emit(std)
  }

  onDeleteStd(id : any){
    const dialogConf = this._matDialog.open(ConfirmPostDeleteComponent)
      
    dialogConf.afterClosed()
      .subscribe(getConformation =>{
        if(getConformation){
          this._studentService.onDeleteStudent(id)
            .subscribe(res =>{
                console.log(res);
                this.emitStdDelete.emit(id)
            })
        }
      })
  }
}
