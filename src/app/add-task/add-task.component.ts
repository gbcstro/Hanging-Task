import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../services/data.service';
import { Task } from '../model/task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  user = JSON.parse(localStorage.getItem('user')!);

  addTask = new FormGroup({
    title: new FormControl('',[Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(
    private dialogRef: MatDialogRef<AddTaskComponent>,
    private db: DataService,
  ) { }

  ngOnInit(): void {
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  get title() {
    return this.addTask.get('title');
  }

  get description() {
    return this.addTask.get('description');
  }
 
  submit(){
    const { title, description } = this.addTask.value;

    if(this.addTask.value.description != '' && this.addTask.value.title != ''){

      const taskObj = {
        title: title,
        description: description,
        status: 'todo',
        created_by: `${this.user.first_name} ${this.user.last_name}`,
        assign_to: 'unassign'
      }


      this.db.createTask(taskObj);
      this.dialogRef.close();
       
    }

  }


}
