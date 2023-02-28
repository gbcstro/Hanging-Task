import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const BACKEND_DOMAIN = 'http://127.0.0.1:8000/';

@Injectable({
  providedIn: 'root'
})
export class DataService {
    constructor(
      private http: HttpClient,
    ) { }

    createTask(task: any){
      return this.http.post(this.buildURL('/api/add'), task).subscribe({
        error: err => {
          console.log(err);
        }
      });
    }

    getTasks(){
      return this.http.get(this.buildURL('/api/tasks'));
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
