import { Component, OnInit } from '@angular/core';
import {CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import { Task } from '../model/task';
import { DataService } from '../services/data.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Database } from '@angular/fire/database';
import { EditTaskComponent } from '../edit-task/edit-task.component';

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
   
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      const d = event.container.data[event.currentIndex];
      
      if (this.todo.find(task => task['id'] === d['id'])){
        this.db.recreateTask(d);
        this.db.delDoneTask(d);
        this.db.delOnGoingTask(d);
      }

      if (this.ongoing.find(task => task['id'] === d['id'])){
        this.db.ongoingTask(d);
        this.db.delCreateTask(d);
        this.db.delDoneTask(d);
      }

      if (this.done.find(task => task['id'] === d['id'])){
        this.db.doneTask(d);
        this.db.delCreateTask(d);
        this.db.delOnGoingTask(d);
      }
  
    }
  }

  addDialog(){
    return this.dialog.open(AddTaskComponent,{
      width: '600px',
    });
  }

  editDialog(task: Task, text: string){
    var modal = this.dialog.open(EditTaskComponent, {
      width: '600px',
      data: {
        task: task,
        selector: text
      }
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

  clearList(){
    this.todo = [];
    this.ongoing = [];
    this.done = [];
  }
  

  signout(){
    this.auth.SignOut()
  }

}
