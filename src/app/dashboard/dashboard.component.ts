import { Component, OnInit } from '@angular/core';
import {CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import { Task } from '../model/task';
import { DataService } from '../services/data.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Database } from '@angular/fire/database';

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
    public db: DataService,
  ) { 
    
  }

  ngOnInit(): void {
    this.user = localStorage.getItem('user-uid');
    this.getTodo();
    this.getOnGoing();
    this.getDone();
  }

  drop(event: CdkDragDrop<any[]>) {
    var id;
    var title;
    var description;

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
    this.db.readCreateTask().subscribe(res => {
      this.todo = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      });
    });
  }

  transferTodo(task: Task){
    console.log('Todo: '+ task);
    this.db.recreateTask(task);
    this.db.delDoneTask(task);
  }

  getOnGoing(){
    this.db.readOnGoingTask().subscribe(res => {
      this.ongoing = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      });
    });
  }

  getDone(){
    this.db.readDoneTask().subscribe(res => {
      this.done = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      });
    });
  }

  transferDone(task: Task){
    console.log('Done: '+ task);
    this.db.doneTask(task);
    this.db.delCreateTask(task);
  }

  signout(){
    this.auth.SignOut()
  }

}
