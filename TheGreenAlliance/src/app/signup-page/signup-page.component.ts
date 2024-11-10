import { Component, Input, output } from '@angular/core';
import { DatabaseAPI } from '../DatabaseAPI';
import { loginResponse } from '../Schemas';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css'
})
export class SignupPageComponent {
  
  constructor(private databaseAPI: DatabaseAPI) { }
  
  @Input() username: string = '';
  password: string = '';
  error: string = '';
  usernameDisplay: string = '';

  loginData!: loginResponse;

  ngOnChanges(){
    this.username = this.databaseAPI.getUsername();
    this.usernameDisplay = this.username;
    if(this.databaseAPI.getUserID() > 0){
      history.back()
    }
  }

  usernameLoggedIn = output<string>();

  onSubmit() {

    this.databaseAPI.createLogin(this.username, this.password).subscribe(response => {
        if (response.status.error) {
          console.log('Error:', response.status.error_desc);
          this.error = response.status.error_desc;
        } else {
          this.loginData = response;
          this.databaseAPI.setUserID(this.loginData.data.userid);
          this.databaseAPI.setUsername(this.loginData.data.username);
          this.usernameDisplay = this.databaseAPI.getUsername();
  
          this.usernameLoggedIn.emit(this.usernameDisplay);
          console.log(this.usernameDisplay + " logged in");
          history.go(-2);
        }
    });
    
  }
}
