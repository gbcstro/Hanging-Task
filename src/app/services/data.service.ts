import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';

const BACKEND_DOMAIN = 'http://127.0.0.1:8000/';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private refresh = new Subject<void>();

  constructor(
    private http: HttpClient,
    private toast: NgToastService
  ) { }

  get pushRefresh(){
    return this.refresh;
  } 

  createTask(task: any){
    this.http.post(this.buildURL('/api/add'), task).subscribe({
      next: (res: any) => {
        const success: boolean = res.success;
        if(success){
          this.toast.success({detail:'Task: '+task.title, summary:res.message, duration:2500});
          this.refresh.next();
        }
      }
    });
  }

  getTasks(params: any){
    return this.http.post(this.buildURL('/api/tasks'), params);
  }

  getSpecificTask(id: any){
    return this.http.get(this.buildURL(`/api/task/${id}`));
  }

  editTask(id: any, task: any){
    return this.http.put(this.buildURL(`/api/update/${id}`), task).subscribe({
      next: (res: any) => {
        const success: boolean = res.success;
        if(success){
          this.toast.info({detail:'Task: '+ task.title, summary:res.message, duration:2500});
          this.refresh.next();
        }
      }
    });
  }

  deleteTask(id: any){
    return this.http.delete(this.buildURL(`/api/delete/${id}`)).subscribe({
      next: (res: any) => {
        const success: boolean = res.success;
        if(success){
          this.toast.warning({detail:'DELETE ', summary:res.message, duration:2500});
          this.refresh.next();
        }
      },
    });
  }
  
  buildURL(path: any){
    return BACKEND_DOMAIN + path;
  }


}
