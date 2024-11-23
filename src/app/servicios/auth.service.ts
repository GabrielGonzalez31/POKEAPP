import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor() { }

  getAuthToken(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  iniciarSesion() {
    this.isAuthenticatedSubject.next(true); // Cambiar el estado a autenticado
  }
}
