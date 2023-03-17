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

  user =  JSON.parse(localStorage.getItem('user')!);
  token = JSON.stringify(localStorage.getItem('token'));

  public userList: any = [];
  public selectedUser: string = '';

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

    this.isTokenExpired(this.token);

    this.getTask();
    this.db.pushRefresh.subscribe(() => {
      this.getTask();
    });
    
    this.auth.getUser().subscribe(res => {
      this.userList = res;
    });

  }

  private isTokenExpired(token: string){
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    if ((Math.floor((new Date).getTime() / 1000)) >= expiry ){
      this.logout();
    } 
  }

  select(first: string, last: string){
    this.selectedUser = `${first} ${last}`;
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
          assign_to: 'unassign'
        }

        this.db.editTask(d.id, taskObj);
      }
      
      if (selector == 'ongoing'){

        let name = this.user.first_name + ' ' + this.user.last_name;
        let assign;
        
        if(d.assign_to == 'unassign'){
          assign = name;
        } else {
          assign = d.assign_to;
        }

        const taskOnObj = {
          title: d.title,
          description: d.description,
          status: 'ongoing',
          created_by: d.created_by,
          assign_to: assign
        }

        this.db.editTask(d.id, taskOnObj);

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
      position: {top:'15vh'},
    });
  }

  editDialog(task: Task){
    var modal = this.dialog.open(EditTaskComponent, {
      width: '600px',
      data: {
        task: task,
      },
      position: {top:'15vh'},
    });

  }

  delete(task: any){
    return this.dialog.open(DeleteTaskComponent,{
      width: '400px',
      data: {
        task: task,
      }
    });
  }

  getTask(){
    this.db.getTasks().subscribe((res: any) => {
      this.todo = res.filter((task: any) => task.status === 'todo');
      this.ongoing = res.filter((task: any) => task.status === 'ongoing');
      this.done = res.filter((task: any) => task.status === 'done');
    });
  }

  logout(){
    this.auth.logout();
  }

}
