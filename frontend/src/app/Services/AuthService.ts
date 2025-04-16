import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
  })
  export class AuthService {
    constructor() {}
  
    public getToken(): string | null{
        return localStorage.getItem('jwtToken');
      }

      public getRoles(): [] {
        const rolesString = localStorage.getItem('roles');
    
        if (rolesString !== null) {
            return JSON.parse(rolesString);
        } else {
            // Handle the case where 'rolesString' is null, e.g., return an empty array
            return [];
        }
      }
  }