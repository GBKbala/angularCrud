import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CrudService } from '../../services/crud.service';
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  users:any = [];
  constructor(public crudService:CrudService){

  }

  fetchData(){
    this.crudService.fetchData().subscribe( (response) => {
      console.log(response);
      this.users = response;
    },
    (error)=>{
      console.log(error);
    }
    );
  }

  ngOnInit(){
   this.fetchData();
  }

  handleDelete(id:any){
    const confirmed = confirm('Are you sure you want to delete this user?');
    if(confirmed){
      console.log(id);
      this.crudService.deleteUser(id).subscribe( (response) => {
        console.log(response);
        this.fetchData();
      },
      (error)=>{
        console.log(error);
      }
      );
    }
  }
}
