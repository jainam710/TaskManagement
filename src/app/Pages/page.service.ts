import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  public baseUrl:string=environment.baseUrl;

  constructor(private http: HttpClient) { }

  getTask(search:string){
    var searchString = {
      Search:search
    }
    return this.http.post(this.baseUrl + 'Task/Task',searchString)
    .pipe(catchError((err) => { return throwError(err); }))
  }
  
  ChangeStatus(task:any){
    return this.http.post(this.baseUrl + 'Task/ChangeStatus',task)
    .pipe(catchError((err) => { return throwError(err); }))
  }

  AddNewTask(task:any){
    var newTask = {
      id:null,
      title:task['title'],
      description:task['description'],
      status:0
    };

    return this.http.post(this.baseUrl + 'Task/AddOrUpdateTask',newTask)
    .pipe(catchError((err) => { return throwError(err); }))

  }
}
