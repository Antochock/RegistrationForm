import { DatePipe } from '@angular/common';
import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {AbstractControl} from '@angular/forms';
import { MAT_DATE_FORMATS} from '@angular/material/core';
import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';



export const MY_FORMATS = {
  parse: {
    dateInput: 'DD - MM - YYYY',
  },
  display: {
    dateInput: 'DD - MM - YYYY',
  },
};

interface Version {
  [key: string]: string[],
 }[]


@Component({
  selector: 'qstn-form',
  templateUrl: './qstn-form.component.html',
  styleUrls: ['./qstn-form.component.scss'],
  providers: [{provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}, ],
})


export class QstnFormComponent implements OnInit {

  selectedFramework: string = '';
  showData: boolean = false;

  jobForm: FormGroup = this.formBuild.group({
    firstName: ['', 
    [Validators.required]],
    lastName: ['', 
    [Validators.required]], 
    dateOfBirth: [this.datePipe.transform(''), 
    [Validators.required]], 
    framework: ['', 
    [Validators.required]], 
    frameworkVersion: ['', 
    [Validators.required]], 
    email: ['',{ 
      validators: [Validators.required, Validators.email,],
      asyncValidators: [this.serverResponse()],
      updateOn : 'blur',
      }
      ], 
    hobby: this.formBuild.array([],) 
  });

  frameworks: string[] = ['angular', 'react', 'vue']
  version: Version = ({
    "angular": ['1.1.1', '1.2.1', '1.3.3'], 

    "react": ['2.1.2', '3.2.4', '4.3.1'], 

    "vue": ['3.3.1', '5.2.1', '5.1.3'], 
})


  constructor(private formBuild: FormBuilder, private datePipe : DatePipe) { }
  ngOnInit(): void {
    this.addHobby();
    this.jobForm.valueChanges.subscribe(() =>{
      this.jobForm.value.dateOfBirth = this.datePipe.transform(this.jobForm.value.dateOfBirth, 'dd-MM-yyyy')
    })
  }
  get hobbyForm(){
    return this.jobForm.get('hobby') as FormArray;
  }
  get email(){
    return this.jobForm.get('email');
  }
  get firstName(){
    return this.jobForm.get('firstName');
  }
  get lastName(){
    return this.jobForm.get('lastName');
  }
  get dateOfBirth(){
    return this.jobForm.get('dateOfBirth');
  }
  get framework(){
    return this.jobForm.get('framework');
  }
  get frameworkVersion(){
    return this.jobForm.get('frameworkVersion');
  }

  addHobby(){
    const hobby = this.formBuild.group({
      name: [[],[Validators.required]],
      duration: [[],[Validators.required]],
    }, )
    this.hobbyForm.push(hobby)
  }

  deleteHobby(i:number){
    this.hobbyForm.removeAt(i)
  }

  serverResponse(): AsyncValidatorFn {  
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return of ( control.value?.toLowerCase() == 'test@test.test'? {name : {msg: 'This email already in our database'}}: null).pipe(delay(2000))
    }
    }

}
