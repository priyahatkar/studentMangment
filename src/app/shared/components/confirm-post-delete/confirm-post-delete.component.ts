import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-post-delete',
  templateUrl: './confirm-post-delete.component.html',
  styleUrls: ['./confirm-post-delete.component.scss']
})
export class ConfirmPostDeleteComponent implements OnInit {

  constructor(private _dialogRef : MatDialogRef<ConfirmPostDeleteComponent>) { }

  ngOnInit(): void {
  }

  onCancel(){
    this._dialogRef.close(false)
  }

  onConfirmDelete(){
    this._dialogRef.close(true)
  }
}
