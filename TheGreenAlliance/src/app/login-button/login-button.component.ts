import { Component, inject, TemplateRef } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { subscribe } from 'diagnostics_channel';
import { response } from 'express';

interface loginResponse {
  status:{
    error: boolean,
    error_desc: string,
  }
  data:{
    userid: number,
    username: string,
    password: string,
  }
}

@Component({
  selector: 'app-login-button',
  standalone: true,
  imports: [NgbDatepickerModule, FormsModule],
  templateUrl: './login-button.component.html',
  styleUrl: './login-button.component.css'
})
export class LoginButtonComponent {

  constructor(private http: HttpClient) { }

  private modalService = inject(NgbModal);
  closeResult = '';
  loggedIn = false;

  username: string = '';
  password: string = '';
  error: string = '';

  loginData!: loginResponse;

  onSubmit() {
    // Implement your login logic here
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    // Add authentication logic and navigate to the next page upon successful login

    let url = `http://localhost:3000/?cmd=login&username=${this.username}&password=${this.password}`;

    this.http.get<loginResponse>(url).subscribe(response => {
      if(response.status.error){
        console.log('Error:', response.status.error_desc);
        this.error = response.status.error_desc;
      }else{
        this.loggedIn = true;
        this.loginData = response;
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
}
