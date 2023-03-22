import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.css']
})
export class DeleteTaskComponent implements OnInit {

  task = this.data.task;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private db: DataService,
    private dialog: MatDialogRef<DeleteTaskComponent>
  ) { }

  ngOnInit(): void {
    
  }

  onNoClick(): void {
    this.dialog.close({
      data: {
        id: false,
      }
    });
  }

  delete(){
    this.db.deleteTask(this.task.id);
    this.dialog.close({
      data: {
        id: this.task.id,
      }
    });
  }

  

}
