import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import { Task } from '../model/task';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: any;

  todo: Task[] = [];

  ongoing: Task[] = [];

  done: Task[] = [];

  constructor(
    private dialog: MatDialog,
    public auth: AuthService,
    private data: DataService,
  ) { 
    
  }

  ngOnInit(): void {
    this.user = localStorage.getItem('user-uid');
    this.getTodo();
    this.getOnGoing();
    this.getDone();
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  addDialog(){
    return this.dialog.open(AddTaskComponent,{
      width: '600px',
    });
  }

  getTodo(){
    this.data.readCreateTask().subscribe(res => {
      this.todo = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      });
    });
  }

  getOnGoing(){
    this.data.readOnGoingTask().subscribe(res => {
      this.ongoing = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      });
    });
  }

  getDone(){
    this.data.readDoneTask().subscribe(res => {
      this.done = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      });
    });
  }

  signout(){
    this.auth.SignOut()
  }

}
