import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UserRoleService {
  private userRoleSubject = new BehaviorSubject<string>('normalUser');
  userRole$ = this.userRoleSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    const role = this.getInitialRole();
    this.userRoleSubject.next(role);
  }

  private getInitialRole(): string {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem('role') || 'normalUser';
    }
    return 'normalUser';  // Default value when running on the server
  }

  getUserRole(): string {
    return this.userRoleSubject.value;
  }

  setUserRole(role: string) {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem('role', role);
    }
    this.userRoleSubject.next(role);
  }
}
