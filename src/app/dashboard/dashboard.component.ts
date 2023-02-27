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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{ 

  task: Task[] = [];

  constructor(
    private dialog: MatDialog,
    public auth: AuthService,
    public db: DataService,
  ) { 
    
  }


  ngOnInit(): void {
   
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
 

}
