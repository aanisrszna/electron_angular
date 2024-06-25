import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PouchDbService } from '../services/pouch-db.service'; // Adjust the path as needed

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private pouchDbService: PouchDbService
  ) {}

  ngOnInit() {
    this.signInForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.signInForm.invalid) {
      this.errorMessage = 'Please fill in all fields correctly.';
      return;
    }

    const { username, password } = this.signInForm.value;
    try {
      const response: any = await this.http.post('http://test-demo.aemenersol.com/api/account/login', { username, password }).toPromise();
      localStorage.setItem('token', response.token);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Login failed, checking PouchDB', error);
      const user = await this.pouchDbService.validateUser(username, password);
      if (user) {
        console.log('Login successful using PouchDB');
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'Invalid credentials';
        console.error('Invalid credentials');
      }
    }
  }
}
