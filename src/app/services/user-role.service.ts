import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UserRoleService {
  private userRoleSubject = new BehaviorSubject<string>(this.getInitialRole());
  userRole$ = this.userRoleSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  private getInitialRole(): string {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem('role') || 'normalUser';
    }
    return 'normalUser'; // Default value for SSR
  }

  getUserRole(): string {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem('role') || 'normalUser';
    }
    return this.userRoleSubject.value; // Return cached value if on the server
  }

  setUserRole(role: string) {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem('role', role);
    }
    this.userRoleSubject.next(role);
  }
}
