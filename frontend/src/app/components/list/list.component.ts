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

  ngOnInit(){
    this.crudService.fetchData().subscribe( (response) => {
      console.log(response);
      this.users = response;
    },
    (error)=>{
      console.log(error);
    }
    );
  }
}
