import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class DashboardComponent implements OnInit {
  errorMessage: string | null = null;
  userList = [
    { firstName: 'John', lastName: 'Doe', username: 'johndoe' },
    { firstName: 'Jane', lastName: 'Smith', username: 'janesmith' },
    { firstName: 'Bob', lastName: 'Johnson', username: 'bobjohnson' }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  signOut(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/sign-in']);
  }
}
