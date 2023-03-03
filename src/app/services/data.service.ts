import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const BACKEND_DOMAIN = 'http://127.0.0.1:8000/';

@Injectable({
  providedIn: 'root'
})
export class DataService {

    id: any;

    constructor(
      private http: HttpClient,
    ) { }

    createTask(task: any){
      this.http.post(this.buildURL('/api/add'), task).subscribe({
        next: (res: any) => {
          let task = res.task;
          localStorage.setItem('id',task.id);
        },
        error: err => {
          console.log(err);
        }
      });
    }

    getTasks(){
      return this.http.get(this.buildURL('/api/tasks'));
    }

    getSpecificTask(id: any){
      return this.http.get(this.buildURL(`/api/task/${id}`));
    }

    editTask(id: any, task: any){
      return this.http.put(this.buildURL(`/api/update/${id}`), task).subscribe({
        error: err => {
          console.log(err);
        }
      });
    }

    assignTask(id: any, task: any){
      return this.http.put(this.buildURL(`/api/update/{id}/assign`), task).subscribe({
        error: err => {
          console.log(err);
        }
      });
    }

    deleteTask(id: any){
      return this.http.delete(this.buildURL(`/api/delete/${id}`)).subscribe({
        error: err => {
          console.log(err);
        }
      });
    }
    
    buildURL(path: any){
      return BACKEND_DOMAIN + path;
    }


}
