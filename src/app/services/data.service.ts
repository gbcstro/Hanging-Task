import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private afs: AngularFirestore,
  ) { }

  createTask(task: Task){
    task.id = this.afs.createId();
    return this.afs.collection('to-do').add(task);
  }

  ongoingTask(task: Task){
    return this.afs.collection('ongoing').add(task);
  }

  doneTask(task: Task){
    return this.afs.collection('done').add(task);
  }

  readCreateTask(){
    return this.afs.collection('todo').snapshotChanges();
  }

  readOnGoingTask(){
    return this.afs.collection('ongoing').snapshotChanges();
  }

  readDoneTask(){
    return this.afs.collection('done').snapshotChanges();
  }

  delCreateTask(task: Task){
    return this.afs.doc('to-do' + '/' + task.id).delete();
  }

  delOnGoingTask(task: Task){
    return this.afs.doc('ongoing' + '/' + task.id).delete();
  }

  delDoneTask(task: Task){
    return this.afs.doc('done' + '/' + task.id).delete();
  }

}
