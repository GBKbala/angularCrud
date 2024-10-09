import { Component , OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CrudService } from '../../services/crud.service';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {
  cities:any[] = [];

  constructor(public crudService : CrudService){

  }
  loadCities(){
    this.crudService.getCities().subscribe( (result:any) => {
      console.log(result);
      this.cities = result
    });
  }

  ngOnInit(){
    this.loadCities()
  }

  inputForm :FormGroup = new FormGroup({
    name : new FormControl(),
    email : new FormControl(),
    password : new FormControl(),
    dob: new FormControl(),
    gender : new FormControl(),
    languages : new FormControl(),
    city : new FormControl(),
    image : new FormControl(),
    info : new FormControl()
  });

  handleSubmit(){
    // console.log('form submitted');
    // console.log(this.inputForm.value);

    this.crudService.storeUser(this.inputForm.value).subscribe( (response)=>{
      console.log(response);
    },
    (error)=>{
      console.log(error.error.errors);
      this.populateErrorMessages(error.error.errors);
    }
    );
  }

  populateErrorMessages(errors: any) {
    Object.keys(errors).forEach(field => {
      const control = this.inputForm.get(field);
      if (control) {
        control.setErrors({ serverError: errors[field] });
      }
    });
  }
}
