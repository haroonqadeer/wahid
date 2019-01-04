import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/shared/user.service';
import {MessageService} from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';

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
  
  constructor(private route: ActivatedRoute, private userService : UserService, private router : Router, private messageService : MessageService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params =>{
      this.txtUserName = params['username'];
    });
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
        localStorage.setItem('userName',this.txtUserName);
        this.router.navigate(['/dashboard']);
      },
      (err : HttpErrorResponse) =>{
        this.messageService.add({severity:'error', summary: 'Error Message', detail:'User Name & Password is Incorrect'});
        //this.isLoginError = true;
      })
    }
  }
}
