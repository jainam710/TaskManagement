import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { PageService } from '../page.service';
import { response } from './model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  AddTaskForm: FormGroup;
  constructor(private pageService:PageService,private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.AddTaskForm = this.formBuilder.group({
      "title" : ["",[Validators.required]],
      "description" : ["",[Validators.required]],
    });
    this.GetData();
  }

  GetData(){
    this.pageService.getTask('').subscribe((res:response)=>{
      if(res.status){
        this.todo = res.data.filter(x=> x.status == 0);
        this.progress = res.data.filter(x=> x.status == 1);
        this.done = res.data.filter(x=> x.status == 2);
      }
    });
  }

  todo = [];
  progress = [];
  done = [];

  drop(event: CdkDragDrop<string[]>) {
    const transferredObject = event.item.data;
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if(event.container.id == "cdk-drop-list-0"){
        //moved to todo
        this.changeStatus(transferredObject['id'],0);
      }
      if(event.container.id == "cdk-drop-list-1"){
        //moved to progress
        this.changeStatus(transferredObject['id'],1);
      }
      if(event.container.id == "cdk-drop-list-2"){
        //moved to progress
        this.changeStatus(transferredObject['id'],2);
      }
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  changeStatus(taskId:number,status:number){
    var task = {
      "status": status,
      "id": taskId
    };
    this.pageService.ChangeStatus(task).subscribe((res:response)=>{
      if(res.status){
        alert(res.message);
      }else{
        alert(res.message);
      }
    })
  }

  AddTask(){
    if(this.AddTaskForm.valid){
      this.pageService.AddNewTask(this.AddTaskForm.value).subscribe((res:response)=>{
        if(res.status){
          alert(res.message);
          this.GetData();
        }else{
          alert(res.message);
        }
      });
    }
  }

}
