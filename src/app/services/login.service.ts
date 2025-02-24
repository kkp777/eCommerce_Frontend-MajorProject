import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Login } from '../common/login';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserRoleService } from './user-role.service';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8082/api/customer/loginHandle';

  // private apiUrl = 'http://localhost:3333/api/customer/loginHandle';

  session: any = null;
  adminEmail: string = 'admin@gmail.com';
  adminPassword: string = 'admin123';
  private tokenKey = 'authToken';
  private userKey = 'authUser';

  // BehaviorSubject to hold the role dynamically
  private userRoleSubject = new BehaviorSubject<string | null>(null);
  userRole$ = this.userRoleSubject.asObservable();
  

  constructor(private httpClient: HttpClient, 
    private router: Router, 
    @Inject(PLATFORM_ID) private platformId: Object,
    private userRoleService: UserRoleService) {
      this.restoreSession(); // Restore session on service initialization
    }

    

    login(userData: any) {
      console.log('Login method called with:', userData); // Debugging
      // Save token and user details to localStorage after login
      sessionStorage.setItem(this.tokenKey, userData.token);
      sessionStorage.setItem(this.userKey, JSON.stringify(userData.user));
      this.setUserRole(userData.user.role);  // If role-based logic exists
      console.log('Login successful. Token and user data saved to localStorage.'); // Debugging
    }

    isLoggedIn() {
      // Check if token exists in localStorage
      return !!localStorage.getItem(this.tokenKey);
    }

    // restoreSession() {
    //   const token = localStorage.getItem(this.tokenKey);
    //   const user = localStorage.getItem(this.userKey);
    //   console.log('Restoring session - Token:', token, 'User:', user); // Debugging
    //   if (token && user) {
    //     this.setUserRole(JSON.parse(user).role); // Restore user role if applicable
    //   }else {
    //     console.log('No session found, logging out.'); // Debugging
    //     this.logout(); 
    //   }
    // }
  setUserRole(role: any) {
   // Update the current role and notify all subscribers (components, etc.)
   this.userRoleSubject.next(role);
  }

  getUserRole(): string | null {
    // Directly return the current role value
    return this.userRoleSubject.value;
  }

  checkIfAdmin(user: Login): boolean {
    return user.email === this.adminEmail && user.password === this.adminPassword;
  }
  
  checkIfValid(login: Login): Observable<any> {
    console.log('Inside email check', login.email, login.password);
    return this.httpClient.post<Login>(this.apiUrl, login); // Use lowercase 'login'
  }
  
  logout() {
    this.session = null;
    this.userRoleService.setUserRole('normalUser'); 
    sessionStorage.removeItem('role');
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.userKey);
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.setUserRole(null);
    this.router.navigate(['/']);
  }
    

  restoreSession() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem(this.tokenKey);
      const user = localStorage.getItem(this.userKey);
      if (token && user) {
        const parsedUser = JSON.parse(user);
        this.setUserRole(parsedUser.role);
      }
    }
  }
  

  saveSession(data: any) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('session', JSON.stringify(data));
    }
  }

  clearSession() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('session');
    }
  }
  
}