import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(
    private afs: AngularFirestore,

  ) { }
  
  uid = localStorage.getItem('user-uid');

  createTask(task: Task){
    task.id = this.afs.createId();
    return this.afs.collection(this.uid + '-todo').add(task);
  }

  ongoingTask(task: Task){
    return this.afs.collection(this.uid + '-ongoing').add(task);
  }

  doneTask(task: Task){
    return this.afs.collection(this.uid + '-done').add(task);
  }

  readCreateTask(){
    console.log('read')
    return this.afs.collection(this.uid +'-todo').snapshotChanges();
  }

  readOnGoingTask(){
    return this.afs.collection(this.uid + '-ongoing').snapshotChanges();
  }

  readDoneTask(){
    return this.afs.collection(this.uid + '-done').snapshotChanges();
  }

  delCreateTask(task: Task){
    return this.afs.doc(this.uid + '-todo' + '/' + task.id).delete();
  }

  delOnGoingTask(task: Task){
    return this.afs.doc(this.uid + '-ongoing' + '/' + task.id).delete();
  }

  delDoneTask(task: Task){
    return this.afs.doc(this.uid + '-done' + '/' + task.id).delete();
  }
}
