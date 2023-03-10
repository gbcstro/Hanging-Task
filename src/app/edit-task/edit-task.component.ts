import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  task = this.data.task;
  selector = this.data.selector;

  editForm = new FormGroup({
    title: new FormControl(this.task.title, [Validators.required]),
    description: new FormControl(this.task.description, [Validators.required])
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private db: DataService,
    private dialog: MatDialogRef<EditTaskComponent>
  ) { }

  ngOnInit(): void {
  
  }

  submit(){
    const { title, description } = this.editForm.value

    if ( title != '' && description != ''){
      this.db.editTask(this.task, this.selector, title, description);
      this.dialog.close();
      
    }

    
  }

}
