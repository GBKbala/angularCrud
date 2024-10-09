import { Component , OnInit } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../../services/crud.service';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {
  cities:any[] = [];
  id:string = '';
  isAddMode: boolean = true;
  formType:string = '';

  constructor(public crudService : CrudService, 
    private router: Router,
    private route: ActivatedRoute,
  )
  {

  }
  loadCities(){
    this.crudService.getCities().subscribe( (result:any) => {
      console.log(result);
      this.cities = result
    });
  }

  ngOnInit(){
    this.loadCities()
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    console.log(this.isAddMode);
    if(!this.isAddMode){
      this.formType = 'Update Form';
    }else{
      this.formType = 'Add Form';  
    }

    if (!this.isAddMode) {
      this.crudService.getById(this.id).subscribe(data => this.inputForm.patchValue(data));
    }
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
      this.router.navigate(['/']);
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
