import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: any;

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  ongoing: any[] = [];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  constructor(
    private dialog: MatDialog,
    public auth: AuthService,
  ) { 
    
  }

  ngOnInit(): void {
    this.user = localStorage.getItem('user-uid');
    console.log(this.user);
  }

  drop(event: CdkDragDrop<string[]>) {
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

  signout(){
    this.auth.SignOut()
  }

}
