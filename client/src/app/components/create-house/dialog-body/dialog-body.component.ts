import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.css']
})
export class DialogBodyComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogBodyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

    ) { }

  ngOnInit(): void {
    this.waiter()
  }

  create:boolean=false;

  waiter(){
    console.log(this.data);
    setTimeout(() => {
      this.create =true
    }, 5500);
  }
  close() {
    this.dialogRef.close();
  }

}
