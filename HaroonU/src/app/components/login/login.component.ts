import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/shared/user.service';
import {MessageService} from 'primeng/api';
=======
import { FormsModule } from '@angular/forms';


>>>>>>> 72d34dd970d89f29ef8b3c61a0c74b18072407e3

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  txtUserName = '';
  txtPassword = '';

  isLoginError : boolean = false;
  
  constructor(private userService : UserService, private router : Router, private messageService : MessageService) { }

  ngOnInit() {

  }
  OnSubmit(){
    
    // this.messageService.add({severity:'error', summary: 'Error Message', detail:'Incorrect Data'});
    // return false;

    if(this.txtUserName.trim().length == 0)
    {
      this.isLoginError = true;
      window.alert('User Name is Empty');return false;
    }
    else if(this.txtPassword.trim().length == 0)
    {
      window.alert('Password is Empty');return false;
    }
    else
    {
      this.userService.userAuthentication(this.txtUserName,this.txtPassword).subscribe((data : any) =>{
        localStorage.setItem('userToken',data.access_token);
        this.router.navigate(['/dashboard']);
      },
      (err : HttpErrorResponse) =>{
        this.messageService.add({severity:'error', summary: 'Error Message', detail:'User Name & Password is Incorrect'});
        //this.isLoginError = true;
      })
    }
  }
}
