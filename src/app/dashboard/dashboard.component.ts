import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import { Task } from '../model/task';
import { DataService } from '../services/data.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Database } from '@angular/fire/database';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteTaskComponent } from '../delete-task/delete-task.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{ 

  todo: Task[] = [];
  ongoing: Task[] = [];
  done: Task[] = [];
  test: any = []

  constructor(
    private dialog: MatDialog,
    public auth: AuthService,
    public db: DataService,
  ) { 
    
  }


  ngOnInit(): void {
    this.getTask();
  }

  drop(event: CdkDragDrop<any[]>, selector: string) {
   
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

      if (selector == 'todo'){
        const taskObj = {
          title: d.title,
          description: d.description,
          status: 'todo',
          created_by: d.created_by,
          assign_to: d.assign_to
        }

        this.db.editTask(d.id, taskObj);
      }
      
      if (selector == 'ongoing'){
        const taskObj = {
          title: d.title,
          description: d.description,
          status: 'ongoing',
          created_by: d.created_by,
          assign_to: d.assign_to
        }

        this.db.editTask(d.id, taskObj);
      }

      if (selector == 'done'){
        const taskObj = {
          title: d.title,
          description: d.description,
          status: 'done',
          created_by: d.created_by,
          assign_to: d.assign_to
        }

        this.db.editTask(d.id, taskObj);
      }
  
    }
  }

  addDialog(){
    return this.dialog.open(AddTaskComponent,{
      width: '600px',
    }).afterClosed().subscribe((res: any) => {
        if(localStorage.getItem('id') != null){
          let id = localStorage.getItem('id');
          this.db.getSpecificTask(id).subscribe((res: any) => {
            let taskObj: Task = {
              id: res.id,
              title: res.title,
              description: res.description,
              status: res.status,
              created_by: res.created_by,
              assign_to: res.assign_to
            }
            this.todo.push(taskObj);
          });
          localStorage.removeItem('id');
        }
    });
  }

  editDialog(task: Task){
    var modal = this.dialog.open(EditTaskComponent, {
      width: '600px',
      data: {
        task: task,
      }
    }).afterClosed().subscribe(response => {
      this.db.getSpecificTask(task.id).subscribe((res:any) =>{

        let taskObj: Task = {
          id: res.id,
          title: res.title,
          description: res.description,
          status: res.status,
          created_by: res.created_by,
          assign_to: res.assign_to
        }

        if (res.status === 'todo') {
          this.todo.forEach((value,index)=>{
            if(value.id==res.id) {
              this.todo[index] = taskObj;
            };
          });
        }
        else if (res.status === 'ongoing') {
          this.ongoing.forEach((value,index)=>{
            if(value.id==res.id) {
              this.ongoing[index] = taskObj;
            };
          });
        }
        else if (res.status === 'done') {
          this.done.forEach((value,index)=>{
            if(value.id==res.id){
              this.done[index] = taskObj;
            };
          });
        }
      
      });

    });

  }

  delete(task: any){
    return this.dialog.open(DeleteTaskComponent,{
      width: '400px',
      data: {
        task: task,
      }
    }).afterClosed().subscribe(res => {
        try {
          let id = res.data.id

          if (task.status === 'todo') {
            this.todo.forEach((value,index)=>{
              if(value.id==id) this.todo.splice(index,1);
            });
          }
          else if (task.status === 'ongoing') {
            this.ongoing.forEach((value,index)=>{
              if(value.id==id) this.ongoing.splice(index,1);
            });
          }
          else if (task.status === 'done') {
            this.done.forEach((value,index)=>{
              if(value.id==id) this.done.splice(index,1);
            });
          }
        } catch (error) {
          return
        }
    });
  }

  getTask(){
    this.db.getTasks().subscribe((res: any) => {
      this.test = res;
      res.forEach((task: any) => {
        if (task.status == 'todo'){
          this.todo.push(task);
        }
        else if (task.status == 'ongoing'){
          this.ongoing.push(task);
        }
        else if (task.status == 'done'){
          this.done.push(task);
        }
      });
    });
  }

  logout(){
    this.auth.logout();
  }

}
