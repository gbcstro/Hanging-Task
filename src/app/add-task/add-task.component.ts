import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  uid = localStorage.getItem('user-uid');

  addTask = new FormGroup({
    title: new FormControl('',[Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(
    private dialogRef: MatDialogRef<AddTaskComponent>,
  ) { }

  ngOnInit(): void {
    console.log(this.uid);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }



}
