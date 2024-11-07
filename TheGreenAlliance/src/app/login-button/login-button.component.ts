import { Component, inject, TemplateRef } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { subscribe } from 'diagnostics_channel';
import { response } from 'express';
import { loginResponse } from '../Schemas';
import { DatabaseAPI } from '../DatabaseAPI';

@Component({
  selector: 'app-login-button',
  standalone: true,
  imports: [NgbDatepickerModule, FormsModule],
  templateUrl: './login-button.component.html',
  styleUrl: './login-button.component.css'
})
export class LoginButtonComponent {

  constructor(private databaseAPI: DatabaseAPI) { }

  private modalService = inject(NgbModal);
  closeResult = '';
  loggedIn = false;

  username: string = '';
  password: string = '';
  error: string = '';

  usernameDisplay:string = ''; 

  loginData!: loginResponse;

  ngOnInit(){
    this.usernameDisplay = this.databaseAPI.getUsername();
  }

  onSubmit() {
    // Implement your login logic here
    // console.log('Username:', this.username);
    // console.log('Password:', this.password);
    // Add authentication logic and navigate to the next page upon successful login

    let url = `http://localhost:3000/?cmd=login&username=${this.username}&password=${this.password}`;

    this.databaseAPI.login(this.username, this.password).subscribe(response => {
      if (response.status.error) {
        console.log('Error:', response.status.error_desc);
        this.error = response.status.error_desc;
      } else {
        this.loggedIn = true;
        this.loginData = response;
        this.databaseAPI.setUserID(this.loginData.data.userid);
        this.databaseAPI.setUsername(this.loginData.data.username);
        this.usernameDisplay = this.databaseAPI.getUsername();
        this.modalService.dismissAll();
      }
    });
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }

  Reload() {
    // console.log(this.loginData);
    // console.log(this.loginData.data.password);
    // console.log(this.loginData.data.userid);
    // console.log(this.loginData.data);
  }
}
