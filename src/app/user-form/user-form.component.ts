import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { User } from '../app.models';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  providers: [MessageService]
})
export class UserFormComponent implements OnInit {
  
  @Input() formType: string;

  public user: User;
  public genders: any[];
  public statuses: any[];
  public registerForm: FormGroup;
  public userId: string;
  
  constructor(public appService: AppService, public formBuilder: FormBuilder, public messageService: MessageService) {
    this.genders = [{name: 'Female', code: 'female'},
    {name: 'Male', code: 'male'}];
    this.statuses = [{name: 'Active', code: 'active'},
    {name: 'Inactive', code: 'inactive'}];
  }
  
  ngOnInit(): void {
    this.messageService.clear();
    this.initForm();
  }

  initForm(): void {
    this.registerForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      gender: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required)
    });
  }

  onRegisterFormSubmit(){
    this.messageService.clear();
    if(this.registerForm.valid){
      let user = this.registerForm.value;
      console.log(user)
      this.appService.registerUser(user).subscribe( data => {
        console.log(data);
        this.user = data;
        this.formType = "VIEW";
        this.registerForm.reset();
        this.messageService.add({severity:'success', summary: 'Success', detail: 'New user created!'});
      }, ret => {
        //se errore è unico, lo mostro con messageService
        if(!(ret.error[0].length>1)){
          if(ret.error[0].field){
            console.log(JSON.stringify(ret.error[0]));
            this.messageService.add({severity:'error', summary: ret.error[0].field, detail: ret.error[0].message});
            const element = document.getElementById(ret.error[0].field);
            setTimeout(() => element?.focus(), 0);
          }else{
            console.log(JSON.stringify(ret.error[0]));
            this.messageService.add({severity:'error', summary: 'Error', detail: ret.error[0].message});
          }
        }
        //se errore è multiplo, lo mostro con alert
        else{
          alert(JSON.stringify(ret));
        }
      })
    }else{
      alert("Compile all required fields!");
    }
  }

  resetRegister(){
    this.formType = "REGISTER";
    this.registerForm.reset();
  }

  onSearchId(){
    this.messageService.clear();
      this.appService.getUser(this.userId).subscribe( data => {
        console.log(data);
        this.user = data;
        this.formType = "VIEW";
      }, ret => {
        console.log(ret);
        //se errore è unico, lo mostro con messageService
        if(!(ret.error.length>1)){
          if(ret.error.field){
            console.log(JSON.stringify(ret.error));
            this.messageService.add({severity:'error', summary: ret.error.field, detail: ret.error.message});
            const element = document.getElementById(ret.error.field);
            setTimeout(() => element?.focus(), 0);
          }else{
            console.log(JSON.stringify(ret.error));
            this.messageService.add({severity:'error', summary: 'Error', detail: ret.error.message});
          }
        }
        //se errore è multiplo, lo mostro con alert
        else{
          alert(JSON.stringify(ret));
        }
      })
  }

}

