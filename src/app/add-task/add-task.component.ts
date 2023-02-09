import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  addTask = new FormGroup({
    title: new FormControl('',[Validators.required]),
    description: new FormControl('', [Validators.required])
  });

  constructor() { }

  ngOnInit(): void {
  }

}
